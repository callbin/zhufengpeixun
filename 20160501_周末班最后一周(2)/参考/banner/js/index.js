var winW = document.documentElement.clientWidth,
    banner = document.querySelector("#banner"),
    bannerInner = banner.firstElementChild,
    bannerTip = banner.querySelector(".tip"),
    tipList = null;

//->数据绑定
var ary = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg", "img/banner5.jpg"];
~function () {
    //->拼接数据
    var str = '';
    str += "<div><img src='' trueImg='" + ary[ary.length - 1] + "'/></div>";
    for (var i = 0, len = ary.length; i < len; i++) {
        str += "<div><img src='' trueImg='" + ary[i] + "'/></div>";
    }
    str += "<div><img src='' trueImg='" + ary[0] + "'/></div>";
    bannerInner.innerHTML = str;

    //->计算宽度
    bannerInner.style.width = winW * (len + 2) + "px";

    //->拼接LI
    str = '';
    for (i = 0, len = ary.length; i < len; i++) {
        i === 0 ? str += "<li class='bg'></li>" : str += "<li></li>";
    }
    bannerTip.innerHTML = str;
    tipList = bannerTip.querySelectorAll("li");
}();

//->延迟加载
var divList = bannerInner.querySelectorAll("div");
[].forEach.call(divList, function (curItem, curIndex) {
    curItem.style.width = winW + "px";
});
window.setTimeout(function () {
    var imgList = bannerInner.querySelectorAll("img");
    [].forEach.call(imgList, function (curImg) {
        var oImg = new Image;
        oImg.src = curImg.getAttribute("trueImg");
        oImg.onload = function () {
            curImg.src = this.src;
            curImg.className = "imgMove";
            oImg = null;
        }
    });
}, 1000);

//->焦点选中
function changeTip() {
    var temp = step;
    temp > ary.length ? temp = 1 : null;
    temp < 1 ? temp = ary.length : null;
    [].forEach.call(tipList, function (curTip, index) {
        temp === (index + 1) ? curTip.className = "bg" : curTip.className = null;
    });
}

//->自动轮播
var step = 1, interval = 3000, autoTimer = null, autoTimer2 = null;
autoTimer = window.setInterval(autoMove, interval);
function autoMove() {
    bannerInner.style.webkitTransitionDuration = "0.3s";
    step++;
    bannerInner.style.left = -step * winW + "px";
    if (step === (ary.length + 1)) {
        window.setTimeout(function () {
            bannerInner.style.webkitTransitionDuration = "0s";
            bannerInner.style.left = -winW + "px";
            step = 1;
        }, 300);
    }
    changeTip();
}

//->左右切换
document.addEventListener("touchmove", function (e) {
    e.preventDefault();
}, false);

["start", "move", "end"].forEach(function (item) {
    bannerInner.addEventListener("touch" + item, eval(item), false);
});

function start(e) {
    //->TouchEvent:changedTouches、targetTouches、touches(TouchList->包含了当前手的位置信息)

    //->滑动开始:禁止自动轮播,取消当前元素的过渡效果
    window.clearInterval(autoTimer);
    window.clearInterval(autoTimer2);
    this.style.webkitTransitionDuration = "0s";

    //->记录当前元素的开始的坐标和left值
    var touchPoint = e.touches[0];
    this["strX"] = touchPoint.pageX;
    this["strY"] = touchPoint.pageY;
    this["strL"] = parseFloat(this.style.left);
}

function move(e) {
    //->获取最新的坐标
    var touchPoint = e.touches[0];
    this["endX"] = touchPoint.pageX;
    this["endY"] = touchPoint.pageY;

    //->判断是否发生滑动，并且获取滑动的方向
    this["swipeFlag"] = isSwipe(this["strX"], this["endX"], this["strY"], this["endY"]);

    //->说明发生了滑动
    if (this["swipeFlag"]) {
        this["swipeDir"] = swipeDirection(this["strX"], this["endX"], this["strY"], this["endY"]);

        //->只有左右滑动才操作
        if (/^(Right|Left)$/.test(this["swipeDir"])) {
            //->计算滑动的距离,并且让当前的元素的left跟着改变
            this["changeX"] = this["endX"] - this["strX"];
            var curL = this["strL"] + this["changeX"];
            if (curL > 0) {
                curL = 0;
            } else if (curL < -(ary.length + 1) * winW) {
                curL = -(ary.length + 1) * winW;
            }
            this.style.left = curL + "px";
        }
    }
}

function end(e) {
    //->结束的时候判断是否发生滑动
    if (this["swipeFlag"]) {
        if (this["swipeDir"] === "Left") {
            if (Math.abs(this["changeX"]) >= (winW / 4)) {
                step++;
            }
        }
        if (this["swipeDir"] === "Right") {
            if (Math.abs(this["changeX"]) >= (winW / 4)) {
                step--;
            }
        }
    }
    this.style.webkitTransitionDuration = "0.5s";
    this.style.left = -step * winW + "px";
    changeTip();

    //->滑动的边界判断:当我们滑动到最后一张的时候(0.5s),我们让当前的inner立马回到step=1的时候的位置
    var _this = this;
    if (step > ary.length) {
        window.setTimeout(function () {
            _this.style.webkitTransitionDuration = "0s";
            _this.style.left = -winW + "px";
            step = 1;
        }, 500);
    }
    if (step < 1) {
        window.setTimeout(function () {
            _this.style.webkitTransitionDuration = "0s";
            _this.style.left = -ary.length * winW + "px";
            step = ary.length;
        }, 500);
    }

    //->开启自动轮播,并且把之前设置的那些自定义属性的值赋值为null
    autoTimer2 = window.setTimeout(function () {
        autoTimer = window.setInterval(autoMove, interval);
    }, interval);

    ["strX", "strY", "strL", "endX", "endY", "swipeDir", "swipeFlag", "changeX"].forEach(function (item) {
        _this[item] = null;
    });
}

function isSwipe(strX, endX, strY, endY) {
    return Math.abs(endX - strX) > 30 || Math.abs(endY - strY) > 30;
}

function swipeDirection(strX, endX, strY, endY) {
    var changeX = endX - strX;
    var changeY = endY - strY;
    return Math.abs(changeX) > Math.abs(changeY) ? (changeX > 0 ? "Right" : "Left") : (changeY > 0 ? "Down" : "Up");
}







