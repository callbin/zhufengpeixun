var http=require("http");
var url=require("url");
http.createServer(function(request,response){
	var objUrl=url.parse(request.url,true);
	
	var data='[{"id":"36","name": "王大胆" ,"gender":"1" ,"hobby":"睡觉,写代码,打豆豆" ,"age":"33" ,"skill":"CSS,javaScript,PHP,C " ,"class":"随到随学班" ,"remark":"没有备注" ,"date":"2012-11-25 17:13:43"},{"id":"36","name": "王大胆" ,"gender":"1" ,"hobby":"睡觉,写代码,打豆豆" ,"age":"33" ,"skill":"CSS,javaScript,PHP,C " ,"class":"随到随学班" ,"remark":"没有备注" ,"date":"2012-11-25 17:13:43"},{"id":"36","name": "王大胆" ,"gender":"1" ,"hobby":"睡觉,写代码,打豆豆" ,"age":"33" ,"skill":"CSS,javaScript,PHP,C " ,"class":"随到随学班" ,"remark":"没有备注" ,"date":"2012-11-25 17:13:43"}]';
	
	//不但可以把以上数据response给客户端，客户端就要解析这些数据，那就需要解析这些数据的方法
	//要在下载这些数据之前，就得把解析这些数据方法指定好
	//比如：客户端用fnn这个方法来解析这些数据，也就是说到客户端生成的JS表达式应该是：fnn(data)这样的，如果应该是这样的，则在服务器端，就应该生成这样的字符串
	//上边的fnn是可以由客户端指定的
	//问题是：如何把客户端指定的方法名告诉服务器，然后再拼成一个完整JS表达式呢？
	//则查询字符串中指定一个字段（key）来接收客户端的方法名即可，比如说这个字段（key）叫fnCallback
	//则最终服务器端生成的结果如下：
	
	response.end(objUrl.query.fnCallback+"("+data+")")
	
	
}).listen(8088,function(){
	console.log("start")
});