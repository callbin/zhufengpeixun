function down(e){
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else{
		
		
		this.MOVE=processThis(this,move);
		
		this.UP=processThis(this,up);
		
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
		
	}
	e.preventDefault();//阻止事件的默认行为
	
	/*"selfdragstart";//这是事件类型
	//如果这个down方法执行了，表示可以通知约定这个行为的那些方法来执行了
	//以下代码开始“通知”
	var a=this["selfdragstart"]
	if(a){
		for(var i=0;i<a.length;i++){
			a[i].call(this,e);///后边的e是事件对象	
		}
	}*/
	selfRun.call(this,"selfdragstart",e);//这一行代码叫“发布”或“通知”
	
}

function move(e){
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";
	
	/*var a=this["selfdrag"];
	if(a){
		for(var i=0;i<a.length;i++){
			a[i].call(this,e);//通知：就是遍历执行约定了selfdrag事件的那些方法	
		}
		
	}*/
	selfRun.call(this,"selfdrag",e);
}

function up(e){
	if(this.releaseCapture){
		off(this,"mousemove",move);
		off(this,"mouseup",up);
		this.releaseCapture();
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
	}
	
	/*var a=this["selfdragend"];
	if(a){
		for(var i=0;i<a.length;i++){
			a[i].call(this,e);//通知：就是遍历执行约定了selfdrag事件的那些方法	
		}
		
	}*/
	selfRun.call(this,"selfdragend",e);
	
}