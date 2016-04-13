var http=require("http");
var fs=require("fs");
var url=require("url");
//完成一个传统的动态网站：同步的动态网站
http.createServer(function(request,response){
	//把客户来的路径拿到并且转化成对象
	console.log(request.url);
	response.writeHead(200,{"content-type":"text/html;charset=utf-8"});
	var objUrl=url.parse(request.url,true);
	
	//如果是根目录，没有写网页名，则直接把index.html写回到浏览端（即把index.html设为默认首页）
	
	if(objUrl.pathname==="/"){
		//objUrl.query;//就是用来得到查询字符串的
		//response.end(JSON.stringify(objUrl.query));//
		//response.end(fs.readFileSync("index.html"));
		//如果访问的是根目录，没有带数据（就是没有查询字符串，比如第一次访问首页），则把首页写回到浏览器端
		
		//怎么知道这是第一次访问这个网址，怎么知道有没有数据提交呢？
		if(typeof objUrl.query.btn == "undefined"){
			response.end(fs.readFileSync("index.html"));
		}else{
			//把浏览器端传过来的查询字符串转成JSON字符串
			var strData=JSON.stringify(objUrl.query);
			//把首页文件读出来
			var strHTML=fs.readFileSync("index.html").toString();
			//把strData补充到strHTML中
			
			var regContent=/<div +id="content">[\W\w]*?<\/div>/i;
			console.log(regContent.test(strHTML));
			strHTML=strHTML.replace(regContent,'<div id="content">'+strData+"</div>");
			//还少一步保存
			
			//把带有数据的HTML输出到浏览器端
			response.end(strHTML);
			
		}
		
		
		//如果请求有数据，则把数据保存下来，并且连首页和数据一起，（并且以表格方式来显示数据）写回到浏览器端
		
		
	}else if(objUrl.pathname=="/abcd"){
		
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
