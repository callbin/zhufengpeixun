//珠峰培训  2013年9月21号课堂示例
var zhufengEffect = {
	//当前时间*变化量/持续时间+初始值
	zfLinear: function(t,b,c,d){ return c*t/d + b; },
	Quad: {//二次方的缓动（t^2）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		}
	},
	Cubic: {//三次方的缓动（t^3）
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	},
	Quart: {//四次方的缓动（t^4）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		}
	},
	Quint: {//5次方的缓动（t^5）；
		easeIn: function(t,b,c,d){
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOut: function(t,b,c,d){
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		}
	},
	Sine: {//正弦曲线的缓动（sin(t)）
		easeIn: function(t,b,c,d){
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOut: function(t,b,c,d){
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		}
	},
	Expo: {//指数曲线的缓动（2^t）；
		easeIn: function(t,b,c,d){
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOut: function(t,b,c,d){
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOut: function(t,b,c,d){
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	},
	Circ: {//圆形曲线的缓动（sqrt(1-t^2)）；
		easeIn: function(t,b,c,d){
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOut: function(t,b,c,d){
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOut: function(t,b,c,d){
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		}
	},
	Elastic: {//指数衰减的正弦曲线缓动；
		easeIn: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
		},
		easeInOut: function(t,b,c,d,a,p){
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	},
	Back: {//超过范围的三次方缓动（(s+1)*t^3 - s*t^2）；
		easeIn: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		}
	},
	zfBounce: {//指数衰减的反弹缓动。
		easeIn: function(t,b,c,d){
			return c - zhufengEffect.zfBounce.easeOut(d-t, 0, c, d) + b;
		},
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOut: function(t,b,c,d){
			if (t < d/2) return zhufengEffect.zfBounce.easeIn(t*2, 0, c, d) * .5 + b;
			else return zhufengEffect.zfBounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	}
};
//zhufengEffect.zfBounce.easeInOut//反弹的 5
//zhufengEffect.Elastic.easeInOut//弹性的flex 4
//zhufengEffect.Back.easeInOut//返回的 3
//zhufengEffect.zfLinear//匀速的，线性的 1
//zhufengEffect.Quart.easeOut; 2
function move(ele,obj,duration,effect,callback){
	//如果用JS实现方法重载
	if(typeof duration =="undefined"){	duration =600;	}
	var fnEffect=zhufengEffect.Quart.easeOut;//默认的动画效果
	switch(effect){
		case 1:
			fnEffect=zhufengEffect.zfLinear;
			break;
		case 2://默认的动画效果
			break;
		case 3:
			fnEffect=zhufengEffect.Back.easeOut;
			break;
		case 4:
			fnEffect=zhufengEffect.Elastic.easeOut;
			break;
		case 5:
			fnEffect=zhufengEffect.zfBounce.easeOut;
			break;
		case undefined://不要加引号
			break;
		default:
			if(typeof effect=="function"){			
				callback=effect;
			}else if(effect instanceof Array){
				if(effect.length===1){				
					fnEffect=zhufengEffect[effect[0]];
				}else if(effect.length==2){
					fnEffect=zhufengEffect[effect[0]][effect[1]];					
				}			
			}	
		
	}
//------------------------------------------------------------------
	var interval=15;//默认的定时器间隔时间
	var step=0;//起始步长
	
	var oBegin={};//分别存不同方向的开始值（起始位置）
	var oChange={};//分别存不同方向的变化的距离
	var f=0;//标识变量
	for(var attr in obj){
		var target=obj[attr];//把每个方向的目标值取出来
		var begin=css(ele,attr);//得到每个方向的起始位置
		var change=target-begin;//得到每个方向的需要运动的距离
		if(change){
			f++;
			oBegin[attr]=begin;//把起始值保存在对象里
			oChange[attr]=change;//把需要运动的距离保存在对象里
		}
	}
	if(f===0){
		return;	
	}
	//这样，obj,oBegin,oChange就保存了不同方向的目标值，起始值和运动的距离
	//这三个对象用相同的属性来保持关联的
	
	clearTimeout(ele.timer);	
	_move();	
	function _move(){		
		step++;		
		var times=interval*step;//当前动画所用的实际时间		
		if(times>=duration){
			for(var attr in obj){
				var target=obj[attr];
				css(ele,attr,target);//时间已经到，就应该到达目的地了
			}
			ele.timer=null;
			if(typeof callback =="function")
				callback.call(ele);
		}else{	
			for(var attr in oChange){	
				val=fnEffect(times,oBegin[attr],oChange[attr],duration);
				//console.log(val)
				css(ele,attr,val);	
			}
			ele.timer=window.setTimeout(_move,interval);
		}
	}	
	
	function css(ele,attr,val){
		if(arguments.length==2){//取值
			if(attr=="opacity"){//如果是opacity则特殊处理一下，主要是应对IE
				var val=window.getComputedStyle?getComputedStyle(ele,null)[attr]:ele.currentStyle[attr];
				if(typeof val=="undefined"){
					return 1;
				}else{
					return parseFloat(val);	
				}
			}else
	return parseFloat(window.getComputedStyle?getComputedStyle(ele,null)[attr]:ele.currentStyle[attr]);
		}else if(arguments.length==3){//传三个参数就是赋值，
		if(attr=="opacity"){
			ele.style.opacity=val;
			ele.style.filter="alpha(opacity="+val*100+")";
		}else{
			ele.style[attr]=val+"px";
		}	
	}
	
}
	
}
