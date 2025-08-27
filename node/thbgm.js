const fs = require('fs');

const fmt = fs.readFileSync('C:/Programs/touhouSE/data/thbgm.fmt');

const splitBuffer = (buffer, chunksize = 52) => {
  const chunks = [];
  for (let index = 0; index < buffer.length; index += chunksize) {
    chunks.push(buffer.subarray(index, index + chunksize));
  }
  return chunks;
};

const songs = splitBuffer(fmt);
for (let i = 0; i < songs.length - 1; i++) {
  //last chunk is 00000
  const start = songs[i].readUInt32LE(16);
  const end = songs[i].readUInt32LE(20);
  const loopstart = songs[i].readUInt32LE(24);
  fs.appendFileSync(
    'C:/code/th.txt',
    `<bgm pos="${start},${loopstart},${end - loopstart}" artist="上海アリス幻樂団"></bgm>\n`
  );
}
