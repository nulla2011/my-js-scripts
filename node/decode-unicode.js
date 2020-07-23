var fs = require('fs');
 
var rs = fs.createReadStream("./haruka1-cp.json"),    data = "";
rs.setEncoding("utf8");
rs.on("data", function(chunk) {
	chunk = unescape(chunk.replace(/\\u/g, "%u"));
	data += chunk;
});
rs.on("end", function() {
	//console.log(data);
	fs.writeFile('./shiraishi_haruk_1_transcoded.json', data, function(err) {
   		if (err) 
       		return console.error(err);
	})
})

console.log(data);
console.log("END");