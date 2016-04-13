var http=require("http");
var fs=require("fs");
var url=require("url");

http.createServer(function(request,response){
	//把客户来的路径拿到并且转化成对象
	console.log(request.url);
	response.writeHead(200,{"content-type":"text/html;charset=utf-8"});
	var objUrl=url.parse(request.url,true);
	
	//如果是根目录，没有写网页名，则直接把index.html写回到浏览端（即把index.html设为默认首页）
	
	if(objUrl.pathname==="/"){
		response.end(fs.readFileSync("index.html"));
	}else{
		try{
		response.end(fs.readFileSync(objUrl.pathname.slice(1)));
		}catch(e){
			response.end("404,文件未发现");	
		}
	}

}).listen(8080,function(){
	console.log("service start");
});
