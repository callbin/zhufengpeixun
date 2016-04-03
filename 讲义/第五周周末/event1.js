// JavaScript Document
function bind(ele,type,fn){
		if(ele.addEventListener){
			ele.addEventListener(type,fn,false);
		}else if(ele.attachEvent){
			/*if(!ele.fnEvent)ele.fnEvent=[];
			ele.fnEventclick=[];
			//ele.click=[];//容易和原生的属性或方法冲突
			ele.fnEventmouseover=[];
			//ele.mouseover=[]*/
			
			
			
			//给不同的事件类型定义不同的数组，来有区别的保存方法
			if(!ele["fnEvent"+type])ele["fnEvent"+type]=[];
			
			var a=ele["fnEvent"+type];//把长属性名赋给短变量为了方便书写
			
			for(var i=0;i<a.length;i++){//避免重复绑定
				if(a[i].photo==fn)return;
			}
			function fnTemp(){fn.call(ele)};//改造fn方法，使之绑定后运行的时候this指向ele
			fnTemp.photo=fn;//增加识别属性，以便在unbind中能辨识出fnTemp是由某一个fn改造而来
			a.push(fnTemp);//保存到数组
			ele.attachEvent("on"+type,fnTemp);//把改造的方法绑定给事件
			
			
		}
}

function unbind(ele,type,fn){
	if(ele.removeEventListener){
		ele.removeEventListener(type,fn,false);	
	}else if(ele.detachEvent){
		var a=ele["fnEvent"+type];
		if(a&&a.length){//先判断是否存在这样的数组，因为可以不绑定先移除，不能报错，只是没有实际操作而已
			for(var i=0;i<a.length;i++){
				if(a[i].photo==fn){//通过这个判断，识别出数组的第某项是由fn改造而来的
				ele.detachEvent("on"+type,a[i]);//在事件上移除
				a.splice(i,1);//并且还要在数组移除，否则无法实现再次绑定
				return;//因为方法不会被重复的绑定在这个事件上（数组中也是唯一），所以一但把这个唯一的方法移除之外，就可以结束了
				}
			}
			
		}
	}
	
}