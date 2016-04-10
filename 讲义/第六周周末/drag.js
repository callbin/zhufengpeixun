function EventEmitter(){}
EventEmitter.prototype.on=function(type,fn){
	if(!this["selfEvent"+type])this["selfEvent"+type]=[];
	var a=this["selfEvent"+type];
	for(var i=0;i<a.length;i++){
	    if(a[i]==fn){return}
	}
	a.push(fn);
	return this;
}

EventEmitter.prototype.run=function(type,e){
	var a=this["selfEvent"+type];
	if(a){
		for(var i=0;i<a.length;){
			if(typeof a[i]=="function"){
				a[i].call(this,e);
				i++;
				}else{
					a.splice(i,1);
				}
			}
	}
	
}

EventEmitter.prototype.off=function(type,fn){
	var a=this["selfEvent"+type];
	if(a&&a.length){
		for(var i=0;i<a.length;i++){
			if(a[i]==fn){
				a[i]=null;
				return;
			}
		}
	}
	return this;
}


function Drag(ele){
	this//
	this.ele=ele;//首先把要拖拽的对象保存到实例的ele属性上
	this.x=null;
	this.y=null;
	this.mx=null;
	this.my=null;//把保存盒子和鼠标初始的属性都定义在实例上，而非被拖拽的元素上
	/*on(this.ele,"mousedown",this.down);
	
	on(ele,"mousedown",this.down);//查找方法的定义的地址时，没有this的事。当方法执行的时候，才会有this的事
	down,this.down;
	var fn=this.down;
	on(ele,"mousedown",fn);*/
	
	this.DOWN=processThis(this.down,this);
	this.MOVE=processThis(this.move,this);
	this.UP=processThis(this.up,this);
	on(ele,"mousedown",this.DOWN);
	
}

Drag.prototype=new EventEmitter;//继承
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
	this.run("dragstart",e);
}
Drag.prototype.move=function(e){
	this.ele.style.left=e.pageX-this.mx+this.x+"px";
	this.ele.style.top=e.pageY-this.my+this.y+"px";
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

Drag.prototype.range=function(obj){
	// obj={left:0,right:900,top:0,bottom:500}
	var obj=this.objRange;
	 var current=this.ele.offsetLeft
	 if(current<=obj.left){
	 	this.ele.style.left=obj.left+"px";
	 }else if(current>=obj.right){
		 this.ele.style.left=obj.right+"px";
	 }
	 if(this.ele.offsetTop>=obj.bottom){
			this.ele.style.top=obj.bottom+"px"; 
	 }else if(this.ele.offsetTop<=obj.top){
			this.ele.style.top=obj.top+"px"; 
	 }	
}
Drag.prototype.addRange=function(obj){
	this.objRange=obj;
	this.on("drag",this.range);
}

Drag.prototype.addBorder=function(){
	this.ele.style.border="2px dashed blue";	
}
Drag.prototype.removeBorder=function(){
	this.ele.style.border="none";
}
Drag.prototype.border=function(){
		this.on("dragstart",this.addBorder);
		this.on("dragend",this.removeBorder);
	}