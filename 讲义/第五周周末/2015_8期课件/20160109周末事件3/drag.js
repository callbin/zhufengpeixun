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
	clearTimeout(this.dropTimer);
	clearTimeout(this.flyTimer);
}
function move(e){//开始拖拽
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";
	
	if(!this.prevPosi){
		this.prevPosi=e.pageX;
	}else{
		this.flySpeed=e.pageX-this.prevPosi;//7ms
		this.prevPosi=e.pageX;
		
	}
	
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
	drop.call(this,e);
	fly.call(this,e);
}

function drop(){//自由落体
	if(!this.dropSpeed){
		this.dropSpeed=7;	
		this.flag=0;
	}else{
		this.dropSpeed+=7;
	}
	this.dropSpeed*=.98;
	var posi=this.offsetTop+this.dropSpeed;
	var maxBottom=document.documentElement.clientHeight-this.offsetHeight;
	if(posi>=maxBottom){
		this.style.top=maxBottom+"px";
		this.dropSpeed*=-1;//调头
		
		//如果连续的执行这儿的代码，则说明运动已经是连续的到达了终点，就应该停止。
			this.flag++
	}else{
		this.style.top=posi+"px";
		this.flag=0;//正常运动，则让flag归0；
	}
	if(this.flag<2)
		this.dropTimer=window.setTimeout(processThis(this,drop),20);
	
}
function fly(){
	this.flySpeed*=.97;
	var posi=this.offsetLeft+this.flySpeed;//正常情况下盒子应该到的位置
	var maxRight=document.documentElement.clientWidth-this.offsetWidth;
	if(posi<=0){
		this.style.left=0;
		this.flySpeed*=-1;
	}else if(posi>=maxRight){
		this.style.left=maxRight+"px";
		this.flySpeed*=-1;
	}else{
		this.style.left=posi+"px";
	}
	
	if(Math.abs(this.flySpeed)>=0.5){
		this.flyTimer=window.setTimeout(processThis(this,fly),20);
	}
}