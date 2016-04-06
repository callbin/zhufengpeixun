陈旭.on(“abcd”,j.drink)
陈旭.on(“abcd”,g.drink)；
陈旭.on(“abcd”,f.drink);

//on方法里做什么呢？

"abcd","xyz","cdba";

10,
1000000万
约它的abcd事找一个秘书，叫on
记在清单 length==10万
区别对待不同的行为的约定
this["abcd"].length=10万


"abcd" 500
通知---run---就是当结婚这个行为发生的时候（代号abcd），去找和abcd对应的这个清单，逐一让这个清单里的行为来执行

这个执行的前提是：他自己的结婚要执行，然后这个“秘书”随之执行，也可以说：run的执行是结婚这个事执行的附加

chenxu.marry;//表示结婚的行为
chenxu.on("abcd",j.drink);

chenxu.on=function(type,fn){//type是某个行为的代号，比如用abcd表示marry这个行为。
//当on的时候，只是“约定”，就是保存到数组里(登记，统计的工作)
	this[type]=[];
	this.push(fn);
}


chenxu.run=function(type){//负责通知，或叫“发布”
	for(var i=0;i<this[type].length;i++){
		this[type]();
	}
}

chenxu.marry=function(新娘子){
	//这里省略代码一万行
	
	//下面要把他结婚这事通知出去
	this.run("abcd");//这个参数就是约定好的所谓的事件类型 
	
}

