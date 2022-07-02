// ==UserScript==
// @name         X-plore browser enhance
// @namespace    https://github.com/nulla2011/my-js-scripts
// @version      0.1
// @description  some small changes in X-plore http browser
// @author       nulla
// @include      http://192.168.*.*
// @icon         https://www.lonelycatgames.com/wp-content/uploads/x-plore/x-plore-banner.png
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function () {
  'use strict';
  var coverU = document.querySelector('.cover');
  coverU.style.opacity = 0;

  var processRightClick_ = processRightClick;
  processRightClick = function (ev) {
    var marked = getMarkedLeInGrid();
    if (marked.length) return;

    var le = $(this).closest('.le');
    var fileName = getLeName(le);

    var pm = popupMenu.clone();
    pm.find('#title').text(fileName);
    var itmTempl = pm.find('#item');
    var itemsDiv = itmTempl.parent();
    itmTempl.remove();

    var dir = isDir(le);
    var isRoot = !getLeParent(le);
    var hidden = isLeHidden(le);
    function _isDir() {
      return dir;
    }

    function canHideUnhide() {
      return dir && !isRoot && fileName.charAt(0) !== '.';
    }

    // init items
    var items = [
      {
        text: 7,
        icon: 'img/op_new_folder.png',
        isEnabled: function () {
          return dir && !readOnly;
        },
        fn: opNewDir,
      },
      {
        text: 2,
        icon: 'img/op_delete.png',
        isEnabled: function () {
          return !readOnly && !isRoot;
        },
        fn: opDelete,
      },
      {
        text: 3,
        icon: 'img/op_rename.png',
        isEnabled: function () {
          return !readOnly && !isRoot;
        },
        fn: opRename,
      },
      { text: 30, icon: 'img/download_zip.png', fn: opDownloadAsZip },
      {
        text: 31,
        icon: 'img/download.png',
        isEnabled: function () {
          return !dir;
        },
        fn: opDownload,
      },
      {
        text: 32,
        icon: 'img/op_hide.png',
        isEnabled: function () {
          return canHideUnhide() && !hidden;
        },
        fn: function () {
          opHideUnhide(le, true);
        },
      },
      {
        text: 33,
        icon: 'img/op_unhide.png',
        isEnabled: function () {
          return canHideUnhide() && hidden;
        },
        fn: function () {
          opHideUnhide(le, false);
        },
      },
      {
        text: '复制链接',
        isEnabled: function () {
          return !dir;
        },
        fn: opLink,
      },
    ];

    var numItems = 0;
    for (var i = 0; i < items.length; i++) {
      var def = items[i];
      if (def.isEnabled && !def.isEnabled()) continue;
      var itm = itmTempl.clone();
      if (typeof def.text == 'string') {
        itm.find('#text').text(def.text);
      } else {
        itm.find('#text').text(localizedStrings[def.text]);
      }
      itm.find('img').attr('src', def.icon);
      itm.click(def.fn, function (e) {
        unCover();
        e.data(le);
      });
      itemsDiv.append(itm);
      ++numItems;
    }
    if (!numItems) {
      deb('No menu items');
      return;
    }

    var body = $('body');
    body.append(pm);

    var win = $(window);

    var pmW = pm.width(),
      pmH = pm.height();
    pm.css('left', Math.min(win.width() - pmW, Math.max(0, ev.clientX - pmW / 2)));

    var winH = win.height();
    var y = ev.clientY;
    if (y + pmH >= winH) {
      //      if(y<winH/2)
      //      y = y - pmH;
      y = winH - pmH;
    }
    pm.css('top', y);
    pm.show();
    coverShow(function () {
      pm.fadeOut('fast', function () {
        pm.remove();
      });
    });

    return false;
  };

  function opLink(le) {
    var uri =
      window.location.origin + getLeFileUri(le) + '&mime=application%2Foctet-stream';
    var cover = document.querySelector('.cover');
    var copyText = document.createElement('textarea');
    copyText.style =
      'position:absolute;left:-200px;opacity:0;width:fit-content;font-size:0px';
    copyText.value = uri;
    cover.after(copyText);
    copyText.select();
    document.execCommand('copy');
    copytext.remove();
  }
})();
