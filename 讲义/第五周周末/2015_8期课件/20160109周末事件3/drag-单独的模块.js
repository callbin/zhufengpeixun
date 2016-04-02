//this原则：this指向当前被拖拽的元素
function down(e){//准备拖拽
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up);
	}else{
		this.MOVE=move.bind(this);//bind方法IE6/7/8不支持
		this.UP=up.bind(this);
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
		
	}
	e.preventDefault();//阻止鼠标按下的时候默认的选中行为
	selfRun.call(this,"selfdragstart",e);
}
function move(e){//开始拖拽
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";
	selfRun.call(this,"selfdrag",e);
}
function up(e){//结束拖拽
	if(this.releaseCapture){
		this.releaseCapture();	
		off(this,"mousemove",move);
		off(this,"mouseup",up);
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);	
	}
	selfRun.call(this,"selfdragend",e);//和on对应,on里面把“约定”拖拽结束行为的方法保存在"selfdragend"数组里了，这里selfRun就应该去这个数组里遍历
	
}

