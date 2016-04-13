var http=require("http");
var fs=require("fs");
var url=require("url");

http.createServer(function(request,response){
	var objUrl=url.parse(request.url,true);
	console.log(objUrl.pathname);
	console.log(objUrl.query);
	if(objUrl.pathname=="/"){
		if(typeof objUrl.query.btn == "undefined"){
			response.end(fs.readFileSync("index.html"));
		}else{
			var data=objUrl.query;
			var strData=JSON.stringify(data);
			var strHTML=fs.readFileSync("index.html").toString();
			var reg=/(<div +id="content">)[\W\w]*?(<\/div>)/i;
			strHTML=strHTML.replace(reg,"$1"+strData+"$2");
			response.end(strHTML);
			//{"name":"陈旭","gender":"其它","age":"24","hobby":["喝酒","学JS"],"course":["英语","语文","数学"],"degree":"脖子后","btn":"提交"}
			
		}
		
		
	}
	
	
	
	
}).listen(8080,function(){
	console.log("service start");
	});