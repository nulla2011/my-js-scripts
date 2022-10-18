const http=require('http');
const fs=require('fs');
const url=require('url');
const path=require('path');
const headers={
	'Access-Control-Allow-Origin': 'https://shinycolors.enza.fun',
	'Content-Type': 'text/plain'
}
const mime={
	"png":"image/png",
	"json":"application/json",
	"csv":"text/csv; charset=utf-8",
	"woff2":"font/woff2",
	"svg":"image/svg+xml",
	"webp":"image/webp",
	"js":"application/javascript; charset=utf-8"
}

const httpServer=http.createServer((req,res)=>{
	processRequest(req,res)
});
httpServer.listen(3000);
console.log("server is on");

const processRequest=(request,response)=>{
	let pathName=url.parse(request.url).pathname;
	pathName=decodeURI(pathName);
	//console.log(pathName);
	let filePath=path.resolve((process.argv[2]??__dirname)+pathName);
	let ext=path.extname(pathName).slice(1);
	//console.log(ext);
	if(mime[ext]) headers['Content-Type']=mime[ext];
	fs.stat(filePath,(err,stats)=>{
		if(err){
			response.writeHead(404, headers);
      		response.end("<h1>404 Not Found</h1>");
		}
		if(!err&&stats.isFile()){
			fs.readFile(filePath,(err,data)=>{
				response.writeHead(200,headers);
				response.end(data);
				console.log(`${filePath} is requested`);
			});
		}
	});
}