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
	clearTimeout(this.flyTimer);
	clearTimeout(this.dropTimer);
}
function move(e){
	this.style.left=this.x+(e.pageX-this.mx)+"px";
	this.style.top=this.y+(e.pageY-this.my)+"px";
	//通过上一个示例：知道了两次mousemove事件是大约相隔8ms发生一次，我们可以把这个固定的间隔时间设为一个单位时间，计算这个单位时间盒子产生的距离---速度
	//单位时间内产生的距离（速度）=上一次的位置-当前的位置
	
	if(this.prevPosi){
		this.speed=this.offsetLeft-this.prevPosi;
		this.prevPosi=this.offsetLeft;
	}else{
		this.prevPosi=this.offsetLeft;
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
	fly.call(this);
	drop.call(this);
}

function fly(){
	if(this.speed){
		this.speed*=.98;//
		var maxRight=(document.documentElement.clientWidth||document.body.clientWidth)-this.offsetWidth;
		var current=this.speed+this.offsetLeft;//正常运动时应该到达的位置
		if(current>=maxRight){
			this.style.left=maxRight+"px";
			this.speed*=-1;//让盒子往相反的方向运动
		}else if(current<=0){
			this.style.left=0;
			this.speed*=-1;
		}else{
			this.style.left=current+"px";
		}
		if(Math.abs(this.speed)>=0.5)//移动的距离大于等于0.5才有意义，所以是这个判断
			this.flyTimer=window.setTimeout(processThis(fly,this),30);

	}
	
}


function drop(){//自由落体的动画
	//先要指定一个“重力加速度”
	if(this.dropSpeed){
		this.dropSpeed+=9.8;	
	}else{
		this.dropSpeed=9.8;
	}
	
	this.dropSpeed*=.98;//摩擦系数
	
	var maxBottom=(document.documentElement.clientHeight||document.body.clientHeight)-this.offsetHeight;
	
	var current=this.offsetTop+this.dropSpeed;
	if(current>=maxBottom){//撞到地面上了
		this.style.top=maxBottom+"px";
		this.dropSpeed*=-1;//反弹
		this.flag++;//撞到边界上则累加，如果出现this.flag大于2，是什么情况？
		
	}else{
		this.style.top=current+"px";
		this.flag=0;//正常运动则归零
	}
	if(this.flag<2)
		this.dropTimer=window.setTimeout(processThis(drop,this),30);
	
}

//在新的动画执行之前，就要把原来的动画效果清除到
