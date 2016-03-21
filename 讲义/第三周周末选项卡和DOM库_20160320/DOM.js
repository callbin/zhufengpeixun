
//对以下方法进行归类。这些方法都是操作DOM，则应该定义一个叫DOM的对象类型的变量
var DOM={};
//把以下方法都定义在DOM的属性上


DOM.getIndex=function (ele){//表示计算ele这个元素的索引号
	var index=0;
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType===1){
			index++;	
		}
		p=p.previousSibling;
	}
	return index;
}

DOM.offset=function (ele){//计算任意元素距离文档顶部的绝对偏移量
	var l=ele.offsetLeft;
	var t=ele.offsetTop;
	var p=ele.offsetParent;
	while(p){
		if(window.navigator.userAgent.indexOf("MSIE 8")>=0){
			l+=p.offsetLeft;
			t+=p.offsetTop;
		}else{
			l+=p.offsetLeft+p.clientLeft;
			t+=p.offsetTop+p.clientTop;
		}
		p=p.offsetParent;
	}
	return {left:l,top:t}
}

DOM.listToArray=function (list){
	try{
		return [].slice.call(list,0);
	}catch(e){
		var a=[];
		for(var i=0;i<list.length;i++){
			//a[a.length]=list[i];
			a.push(list[i]);
		}
		return a;
	}
}

DOM.siblings=function siblings(ele){//获得ele的所有的元素兄弟节点
	/*var parent=ele.parentNode;
	var children=parent.children;//所有元素节点，IE中还会包括注释节点
	//var children=parent.childNodes;//所有节点
	var a=[];
	for(var i=0;i<children.length;i++){
		if(children[i].nodeType==1&&children[i]!=ele){
			a.push(children[i]);	
		}
	}
	return a;*/
	
	var a=[];
	
	var p=ele.previousSibling;
	while(p){
		if(p.nodeType==1){
			a.push(p);	
		}
		p=p.previousSibling;
	}
	//这个数组里元素的顺序是这样的a-->[3,2,1,0],需要让元素按正常的上下顺序排列成[0,1,2,3]的顺序，则：
	a.reverse();
	
	var next =ele.nextSibling;
	
	while(next){
		if(next.nodeType==1){
				a.push(next);
		}
		next=next.nextSibling;
	}
	return a;
	
}

DOM.next=function next(ele){//获得ele相邻的弟弟元素节点，返回值最多只有一个

//null用typeof 
//通用原则是一个属性或一个变量，如果是对象类型的，需要初始化的时候，赋一个null值，
//如果不是对象类型，比如字符串，str="";
	//if(ele.nextElementSibling)//直接这样判断，是不严谨的，下面的方式最好
	if(typeof ele.nextElementSibling=="object"){//新版浏览器支持的DOM属性
		return ele.nextElementSibling;
	}else{//如果不支持nextElementSibling这个属性
		var next=ele.nextSibling;
		while(next){
			if(next.nodeType==1){
				/*
				<li></li>
				文本
				<!--注释 -->
				文本
				<li>123</li>
				*/
				return next;	
			}
			next=next.nextSibling;
		}
		return null;//补人品的，防止上边的while循环进不去导致的没有返回值问题
	}
}

DOM.previous=function previous(ele){//获得ele相邻的哥哥元素节点，返回值最多只有一个元素
	
}
DOM.nextSiblings=function (ele){//获得ele相邻的弟弟们元素节点，返回的是集合
	
}
DOM.previousSiblings=function previousSiblings(ele){//获得ele相邻的哥哥们元素节点，返回的是集合
	
	
}


DOM.insertAfter=function (oldEle,newEle){//和insertBefore相对应，表示把newEle添加到oldEle的后边
	ele.insertBefore(a,b);//把a添加到b的前边
	//把newEle添加到oldEle的后边,是不是把newEle添加到oldEle弟弟的前边？
	/*
	根本就没有必要这样写
	if(oldEle.nextSibling){//如果oldEle的弟弟不是null
		oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);
	}else{
			oldEle.parentNode.appendChild(newEle)
	}*/
	oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);
	
}

DOM.prepend=function (parent,child){//此方法和appendChild相对应，把child元素添加成parent的第一个子元素
	//我们知道appendChild是在末尾的位置添加子节点
	parent.insertBefore(child,parent.firstChild);
	

	
}

DOM.children=function(parent,str){//获得parent的所有元素子节点
								//还可以获得指定标签名的子元素
	var a=[];
	var childNodes=parent.childNodes;
	
	if(typeof str=="string"){//判断一下第二个参数传的是否正确
		//标签名要和str指定的相同才行，还要是元素节点
		str=str.toUpperCase();//把str无条件转为大写
		for(var i=0;i<childNodes.length;i++){
			child=childNodes[i];
			if(child.tagName===str){//注意这个条件
				a.push(child);
			}
		}
	}else if(str===undefined){//没有指定标签名，则把所有的子元素都返回
		for(var i=0;i<childNodes.length;i++){
			var child=childNodes[i];
			if(child.nodeType===1){
				a.push(child);	
			}
		}
	}else{
		throw new Error("大哥，您第二个参数搞错了！！");	
	}
	return a;
	
}

DOM.getElesByClass=function (str,context){//第二个参数是当次筛选的上下文（找查的范围）
	context=context||document;//如果第二个参数content没有传，则以document为上下文
	/*
	if(document.getElementsByClassName){//如果浏览器支持此方法
		return context.getElementsByClassName(str);
	}
	*/
	var regTrim=/^ +| +$/g;
	str=str.replace(regTrim,"");
	var aClass=str.split(/ +/);
	//var eles=document.getElementsByTagName("*");
	
	var eles=context.getElementsByTagName("*");
	for(var i=0;i<aClass.length;i++){
		//eles=byClass(aClass[i],eles);	
		var reg=new RegExp("(^| )"+aClass[i]+"( |$)");
		var a=[];
		for(var j=0;j<eles.length;j++){
			var ele=eles[j];
			if(reg.test(ele.className)){
				a.push(ele);
			}
		}
		eles=a;//更新eles，以便下次筛选
		
	}
	return eles;
}

DOM.addClass=function(ele,strClass){
	//tab 
	var reg=new RegExp("(^| )"+strClass+"( |$)");
	if(!reg.test(ele.className))
		ele.className+=" "+strClass;
	
}

DOM.removeClass=function(ele,strClass){
	var reg=new RegExp("(^| )"+strClass+"( |$)","g");
	//ele.className="tab a a b c a";
   // "(已经匹配过了，不再匹配)a b c a";//第二个连续出现的a匹配不到
	//ele.className.replace(/ /g,"   ");//掺水（掺空格）
	//ele.className="tab  a b c a";
	
	var tempStr=ele.className.replace(/ /g,"   ");//掺水（掺空格）
	
	ele.className=tempStr.replace(reg," ");
}





