//解决浏览器事件兼容问题的方案
function on(ele,type,fn){
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);
		return;	
	}
	
	if(!ele["aEvent"+type]){
		ele["aEvent"+type]=[];
		ele.attachEvent("on"+type,function(){run.call(ele)});
	}
	
	var a=ele["aEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;
	}
	a.push(fn);	
}

function run(){
	var e=window.event;//chrome也支持window.event;
	var type=e.type;
	
	var a=this["aEvent"+type];
	if(!a)return;//判断a是否存在,如果不存在此数组则直接退出
	if(!e.target){
		e.target=e.srcElement;
		e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
		e.preventDefault=function(){e.returnValue=false;}
		e.stopPropagation=function(){e.cancelBubblue=true;}
			
	}
	
	for(var i=0;i<a.length;i++){
		if(typeof a[i]=="function"){
			a[i].call(this,e);	
		}else{
			a.splice(i,1);
			i--;
		}
	}
}

function off(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
		return;	
	}
	
	var a=ele["aEvent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;//为什么要赋值为null，而不是直接splice(i,1);
				return;	
			}
		}
	}
	
}

//Function.prototype.bind

function processThis(fn,obj){
	return function(e){fn.call(obj,e);}	
}

