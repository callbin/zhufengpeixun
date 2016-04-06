function down(e){
	this.x=this.offsetLeft;
	this.y=this.offsetTop;
	this.mx=e.pageX;
	this.my=e.pageY;
	if(this.setCapture){
		this.setCapture();
		on(this,"mousemove",move);
		on(this,"mouseup",up)
	}else{
		
		this.MOVE=move.bind(this);//es5中原生的方法
		this.UP=up.bind(this);		
		
		on(document,"mousemove",this.MOVE);
		on(document,"mouseup",this.UP);
	}
	e.preventDefault();
}
function move(e){
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";
	/*
	//this.prevTime//记录上一次mousemove事件的发生时间
	//new Date;//本次mousemove事件发生的时间
	
	//new Date-this.prevTime//这就是两次mousemove事件发生的时间间隔
	//上一次，下一次 相对。只要把本次mousemove事件发生的时间记录下来，当到了下次mousemove事件发生的时候，
	*/
	if(this.prevTime){//如果为true表示已经有“上一次时间”
		var d=new Date
		console.log(d-this.prevTime);//这里输出是不断更新的两次mousemove事件的时间差
		this.prevTime=d;
	}else{
		this.prevTime=new Date;
	}
}

function up(e){
	if(this.releaseCapture){
		this.releaseCapture();
		off(this,"mousemove",move);
		off(this,"mouseup",up);	
	}else{
		off(document,"mousemove",this.MOVE);
		off(document,"mouseup",this.UP);
	}
}