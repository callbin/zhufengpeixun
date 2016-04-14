var http=require("http");
var fs=require("fs");
var url=require("url");

http.createServer(function(request,response){
	var objUrl=url.parse(request.url,true);
	
	response.writeHead(200,{"content-type":"text/html;charset=utf-8"});
	console.log(objUrl.pathname);
	if(objUrl.pathname=="/ajax"){
		var obj=objUrl.query;
		try{
			var strData=fs.readFileSync("data.txt").toString();
			var data=JSON.parse(strData);
			obj.id=data.length+1;
			data.push(obj);
			strData=JSON.stringify(data);
			fs.writeFile("data.txt",strData);
			response.end(JSON.stringify(obj));
			
		}catch(e){
			console.log(e);
			var data=[];
			obj.id=1;
			data.push(obj);
			var strData=JSON.stringify(data);
			fs.writeFile("data.txt",strData);
			response.end(JSON.stringify(obj));			
		}
		
		//response.end("我悄悄滴告诉你：你找不到我！");
		
	}else 	if(objUrl.pathname=="/"){
		if(typeof objUrl.query.btn == "undefined"){
			response.end(fs.readFileSync("index.html"));
		}else{
			var data=objUrl.query;
			//try-catch中是把提交数据保存到data.txt中
			try{
				//如果能找到此文件，则把文件中的内容读出来，并且将其转成数组对象，再往这个数组中增加一条记录
				var str=fs.readFileSync("data.txt").toString();
				var a=JSON.parse(str);
				data.id=a.length+1;
				a.push(data);
				//再把此数组转成JSON字符串
				var str=JSON.stringify(a);
				//再把整个字符串写回到data.txt文中
				fs.writeFile("data.txt",str);
	//每一次写文件的操作，都是完全重写	
			}catch(e){//如果读不出data.txt则会出错，说明是第一次操作此文件
			var a=[];//创建数组
			data.id=1;
			a.push(data);//把数据对象保存到数组中
			var str=JSON.stringify(a);//再把数组转成JSON字符串（不转成字符串无法写到文本文件中）
			fs.writeFile("data.txt",str);//写入文件
				
			}
			//以下是把所有提交过的数据显示在网页上
			var strHTML=fs.readFileSync("index.html").toString();
			var reg=/(<div +id="content">)[\W\w]*?(<\/div>)/i;
			//要求把数据填充到表格里，这样太丑
			str=""
			for(var i=0;i<a.length;i++){
				str+="<p>"+JSON.stringify(a[i])+"</p>"
			}
			
			response.end(strHTML.replace(reg,"$1"+str+"$2"));
			
		}
		
		
	}
	
	//前端程序员和后台程序员要配合：
	//后台不需要知道数据如何显示在网页上
	//前端不需要知道在后台数据是如何处理的
	
	//双方都需要约定好的事有：（request）
	//前端以什么格式（以什么形式）把数据提交给后台
	//是普通的查询字符串呢？还是JSON呢？还是XML？
	
	//后台传回来的数据包括什么？是什么格式的？
	//JSON,字符串，XML
	
	
	
	
}).listen(8081,function(){
	console.log("service start");
	});