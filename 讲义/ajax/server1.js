var http=require("http");
var fs=require("fs");
//var mime=require("mime");//url
var url=require("url");

http.createServer(function(request,response){
	//把客户来的路径拿到并且转化成对象
	console.log(request.url);
	response.writeHead(200,{"content-type":"text/html;charset=utf-8"});
	var objUrl=url.parse(request.url,true);
	objUrl.pathname;//浏览器中输入的地址
	"/ab/cd/index.html"
	"/ab/cd"
	var regRouter=/^((?:\/\w+)+)(?:\/\w+\.html)?$/;
	//路由：路径判断
	if(regRouter.test(objUrl.pathname)){
		response.write(RegExp.$1);
	}
	
	response.write(JSON.stringify(objUrl));
	
	
	response.end("<h1>演出开始了！</h1>");
}).listen(8080,function(){
	console.log("service start");
});
