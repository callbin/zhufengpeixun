bind(ele,"click",run);
bind(ele,"click",run);
function bind(ele,type,fn){//把fn方法绑定给ele的type这个事件
	if(ele.addEventListener){
		ele.addEventListener(type,fn,false);	
	}else{
		if(!ele["aEvent"+type]){
			ele["aEvent"+type]=[];
		}
		var a=ele["aEvent"+type];
		for(var i=0;i<a.length;i++){//避免重复绑定
			if(a[i].photo==fn)return;
		}
		var fnTemp=function (){fn.call(ele)}//这样做就可以使fn在执行的时候，让fn的this指向ele
		fnTemp.photo=fn;//加的这个photo属性，只是让fnTemp和fn有关联

		a.push(fnTemp);//仅仅是保存
		ele.attachEvent("on"+type,fnTemp);
	}
}

function unbind(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);
	}else{
		
		var a=ele["aEvent"+type];
		if(a){
			for(var i=0;i<a.length;i++){
				if(a[i].photo==fn){
					ele.detachEvent("on"+type,a[i]);
					a.splice(i,1);
					break;
				}
			}
		}
		
	}
}

function on(ele,type,fn){
	if(!ele["onEvent"+type]){
		ele["onEvent"+type]=[];//如果数据不存在，则定义数组。	
	}
	var a=ele["onEvent"+type];
	for(var i=0;i<a.length;i++){
		if(a[i]==fn)return;	
	}
	a.push(fn);//所谓的事件绑定，就是把方法保存到数组里
	bind(ele,type,run);
}
function run(e){
	e=e||window.event;
	var type=e.type;
	if(!e.target){
		e.target=e.srcElement;
		e.stopPropagation=function(){e.cancelBubble=true;}
		e.preventDefault=function(){e.returnValue=false;}
		e.pageX=(document.documentElement.srollLeft||document.body.scrollLeft)+e.clientX;
		e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+e.clientY;
	}
	var a=this["onEvent"+type];
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
	var a=ele["onEvent"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				//a.splice(i,1);//直接删除容易造成数组塌陷
				a[i]=null;
				break;	
			}
		}
	}
}
function processThis(obj,fn){
	return function(e){fn.call(obj,e)}
}