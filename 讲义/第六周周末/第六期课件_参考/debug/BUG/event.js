//on和run和off是解决顺序问题，做一个程序，让run执行
function on(ele,type,fn){
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
	}
	if(!ele["aEvent"+type]){//如果没有这个数组，则创建一个数组，这样保证这个数组只创建一次
		ele["aEvent"+type]=[];	//把这个属性定义成数组
		//ele.aEventclick=[];
	}
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){//避免重复绑定的判断
		if(a[i]==fn)return;
	}

	a.push(fn);

	//bind(ele,type,run);//这才是真绑定呢
	ele.attachEvent("on"+type,function(){run.call(ele)});
	//ele.addEventListener(type,fn,false);
}
function run(e){
	var e=window.event;//只针对IE
	if(!e.target){
		e.target=e.srcElement;//如果你不支持targe属性，则伪造一个，假装支持
		e.preventDefault=function(){e.returnValue=false;}  //组止默认行为
		e.stopPropagation=function(){e.cancelBubble=true}; //阻止冒泡传播
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	}
	var a=this["aEvent"+ e.type];

	for(var i=0;i< a.length;i++){
		if(typeof a[i]=="function"){
			a[i].call(this,e);
		}
		else{
			a.splice(i,1);
			i--;
		}
	}
}
function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
	}
	var a=ele["aEvent"+type];
	if(a){
		for(var i=0;i< a.length;i++){
			if(a[i]=fn){
				a[i]=null;
				break;
			}
		}
	}
}