//object oriented programming "以对象的数据类型以导向的编程方式"
function EventEmitter(){}//事件发射器类,这个只管自定义事件的发布，不管系统事件
EventEmitter.prototype.on=function(type,fn){
	if(!this["event"+type]){
		this["event"+type]=[];
	}
	var a=this["event"+type];
	a.push(fn);
}
EventEmitter.prototype.run=function(type,e){
	var a=this["event"+type];
	if(a)
	for(var i=0;i<a.length;i++){
		if(typeof a[i]=="function")
			a[i].call(this,e);
		
	}
	
}
EventEmitter.prototype.off=function(type,fn){
	var a=this["event"+type];
	if(a){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
					a.splice(i,1);
					break;
			}	
		}
	}
}

/*on(ele,"mousedown",down);
function fn(){
	on(ele,"mousedown",down);
}*/

function Drag(ele){
	this.ele=ele;//把要拖拽的DOM对象保存到当前实例上
	this.x=null;
	this.y=null;
	this.mx=null;
	this.my=null;

	this.DOWN=processThis(this,this.down);
	this.MOVE=processThis(this,this.move);
	this.UP=processThis(this,this.up);
	on(this.ele,"mousedown",this.DOWN);
	
	
}
Drag.prototype=new EventEmitter;//让这两个类组合在一起，就使Drag类具备了和其它行为能够有关联的功能了，就是使Drag类具备了和其它功能联系的通道
Drag.prototype.down=function(e){
	this.x=this.ele.offsetLeft;
	this.y=this.ele.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	if(this.ele.setCapture){
		this.ele.setCapture();
		on(this.ele,"mousemove",this.MOVE);
		on(this.ele,"mouseup",this.UP);
	}else{
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
	}
	e.preventDefault();
	//this;//drag，drag--"dragstart"--"drag"---"dragend"
	//this是我们自己创建的，完全我们自己掌控的对象，那我们基本上就可随意的定义属性。现在我们再给Drag的实例创建事件，就可以不必考虑是否会和DOM的原生事件冲突的问题了。
	//ele//DOM对象，DOM对象有很多的天生的属性或方法，那么我们再自定义一些属性的时候，就要考虑是不是会和原来属性冲突
	//在给DOM对象上创建自定义属性的时候会存在风险：冲突
	
	//ele.x,ele.y,ele.l,ele,t,ele.mx
	this.run("dragstart",e);//通知，发布事件。只有在这个方法里像这样执行的this.run方法，其它的行为（function)才可以绑定这个事件。
	//设计上原则和执行的顺序没有关系
}
Drag.prototype.move=function(e){
	this.ele.style.left=this.x+e.pageX-this.mx+"px";
	this.ele.style.top=this.y+e.pageY-this.my+"px";
	this.run("drag",e);
}
Drag.prototype.up=function(e){
	if(this.ele.releaseCapture){
		this.ele.releaseCapture();
		off(this.ele,"mousemove",this.MOVE);
		off(this.ele,"mouseup",this.UP);
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
	}
	this.run("dragend",e);
}
//一，实现基本的拖拽
//二、给指定的被拖拽元素加上特定的效果

//down,move,up如果这三个方法使用者不知道，则他们就不知道什么时候是拖拽开始，、进行、结束。如果把“事件”接口爆露出来，就可以和其它行为有联系
//v如果想给拖拽效果加再上其它特定的效果，可以有两种方式：事件的方式，原型扩展的方式
//用事件方式扩展其它行为特点是：其它的function和drag没有直接的关系
//如果是扩展在原型上，其实就相当于Drag类自带的行为了

Drag.prototype.limited=function(oRange){//限定拖拽
	this.oRange=oRange;
	this.on("drag",this.addLimited);
	//{l:0,r:400,t:200,b:500}
	//限定拖拽是发生在drag事件，也就是move方法里
}
Drag.prototype.addLimited=function(e){
	if(this.oRange){
		var obj=this.oRange;
		var x=this.x+(e.pageX-this.mx);
		var y=this.y+(e.pageY-this.my);
		if(x>=obj.r){//右边界
			this.ele.style.left=obj.r+"px";
		}else if(x<=obj.l){//左边界
			this.ele.style.left=obj.l+"px";
		}else{
			this.ele.style.left=x+"px";
		}
		
		if(y>=obj.b){
			this.ele.style.top=obj.b+"px";
		}else if(y<=obj.t){
			this.ele.style.top=obj.t+"px";
		}else{
			this.ele.style.top=y+"px";
		}
		
	}
}

Drag.prototype.border=function(){//增加边框
	this.on("dragstart",this.addBorder);
	this.on("dragend",this.removeBorder);
}
Drag.prototype.addBorder=function(){
	this.ele.style.border="2px green dashed";
}
Drag.prototype.removeBorder=function(){
		this.ele.style.border="";

}