function down(e){
	
	
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

	selfRun.call(this,"selfdragstart",e);//这一行代码叫“发布”或“通知”
	
}

function move(e){
	//在drag里不应该实现任何具体的操作，只负责把当前的这个机会暴露出去
	//mousemove和drag的区别
	//drag之前一定要先down，mousemove不会有down
	//drag事件应该是mousedown事件和mousemove事件的组合
	
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
	

	selfRun.call(this,"selfdragend",e);
	
}