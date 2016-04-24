var main = document.querySelector("#main");
var desW = 640;
var desH = 1008;
var winW = document.documentElement.clientWidth;
var winH = document.documentElement.clientHeight;
if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
var bell = document.querySelector("#bell");
var say = document.querySelector("#say");
var music = document.querySelector("#music");


function fnLoad() {
    var arr = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];
    var loading = document.querySelector("#loading");
    var process = document.querySelector(".process");
    var n = 0;
    //遍历arr看里面的每张图片是否加载成功
    arr.forEach(function () {
        var oImg = new Image();
        oImg.src = "images/" + arguments[0];
        oImg.onload = function () {
            //如果加载成功了一张图片,则让n++;
            n++;
            //加载一张图片,就得设置下进度条的宽度
            //加载了多少张图片(n)/arr.length = 设置的进度条的宽度/整个进度条的宽度
            process.style.width = n / arr.length * 100 + "%";
            process.addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
            }, false);
            if (n == arr.length && loading) {
                window.setTimeout(function () {
                    main.removeChild(loading);
                    bell.play();
                    fnPhone.init();/*phone部分方法执行*/
                }, 1000)
            }
        }
    })
}
fnLoad()

var phone = document.querySelector("#phone");
var speak = document.querySelector(".speak");
var fnPhone = {
    init: function () {
        phone.addEventListener("click", this.touch, false);
        //fastClick 解决click事件300ms
    },
    touch: function (e) {
        var target = e.target;
        if (target.className == "listenTouch") {/*进入到接听页面*/
            bell.pause();/*停止播放*/
            say.play();/*开始播放*/
            target.parentNode.style.display = "none";
            /*让接听页面隐藏*/
            speak.style.webkitTransform = "translate(0,0)";
            /*让说的页面显示*/
        } else if (target.className == "refuse") {
            say.pause();
            //phone界面往下phone的高度(desH)
            phone.style.webkitTransform = "translate(0," + desH + "px)";
            phone.style.webkitTransition = "1s";
            window.setTimeout(function () {
                main.removeChild(phone);
                music.play();
                fnMessage();
            }, 1000)
        }
    }
}

/*
 * 1.前三个li每隔1秒往上移动20px,回到原始位置
 * 2.出现的li超过3个之后,ul整体往上移动已经出现的li的之和
 * */
var msg = document.querySelector("#message");
var oLis = document.querySelectorAll("#message>ul>li");
var oUl = document.querySelector("#message>ul");
function fnMessage() {
    var n = 0;
    /*li的索引*/
    var h = null;
    /*保存已经出现的li的高度之和*/
    var timer = window.setInterval(function () {
        oLis[n].style.opacity = "1";
        oLis[n].style.webkitTransform = "translate(0,0)";
        /*回到原始位置*/
        h += oLis[n].offsetHeight - 30;
        /*累加已经出现的li的高度*/
        n++;
        if (n >= 3) {
            //这里加个定时器是为了停顿下
            window.setTimeout(function () {
                oUl.style.webkitTransform = "translate(0," + (-h) + "px)";
                oUl.style.webkitTransition = "1s";
            }, 1000);
            if (n == oLis.length) {
                window.clearInterval(timer);
                window.setTimeout(function () {
                    main.removeChild(msg);
                    music.pause();
                     fnCube()
                }, 1000)
            }
        }
    }, 1000)

}
var cubeBox = document.querySelector("#cubeBox");
function fnCube() {
    //一开始有个放大和旋转的效果
    cubeBox.style.webkitTransform = "scale(0.7) rotateX(-135deg) rotateY(-45deg)";
    var startX = -135;
    /*初始转动的角度*/
    var startY = -45;
    var x = null;
    /*滑动的距离*/
    var y = null;
    document.addEventListener("touchstart", start, false);
    document.addEventListener("touchmove", move, false);
    document.addEventListener("touchend", end, false);
    //滑动的距离就是转动的角度
    function start(e) {
        this.startTouch = {x: e.touches[0].pageX, y: e.touches[0].pageY}
    }

    function move(e) {
        this.flag = true;
        var moveTouch = {x: e.touches[0].pageX, y: e.touches[0].pageY}
        x = moveTouch.x - this.startTouch.x;
        y = moveTouch.y - this.startTouch.y;
        //startX+y(纵向移动的距离) = rotateX(新的转动的角度)
        cubeBox.style.webkitTransform = "scale(0.7) rotateX(" + (-(startX + y)) + "deg) rotateY(" + (-(startY+x)) + "deg)";

    }

    function end() {
        if(this.flag){
            /*更新起始值*/
            startX += y;
            startY += x;
            this.flag = false;
        }

    }


}


