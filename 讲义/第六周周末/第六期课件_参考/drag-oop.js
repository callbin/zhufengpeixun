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

	for(var i=0;i<a.length;i++){
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
Drag.prototype.limited=function(obj){
	
}