var winW = document.documentElement.clientWidth || document.body.clientWidth, winH = document.documentElement.clientHeight || document.body.clientHeight;
var oDiv1 = document.getElementById("div1");

on(oDiv1, "mousedown", down);

function down(e) {
    this["strX"] = e.clientX;
    this["strY"] = e.clientY;
    this["strT"] = this.offsetTop;
    this["strL"] = this.offsetLeft;
    if (this.setCapture) {
        this.setCapture();
        on(this, "mousemove", move);
        on(this, "mouseup", up);
        return;
    }
    this.moveFn = processThis(this, move);
    this.upFn = processThis(this, up);
    on(document, "mousemove", this.moveFn);
    on(document, "mouseup", this.upFn);

    window.clearTimeout(this.flyTimer);
    window.clearTimeout(this.dropTimer);
}

function move(e) {
    var curL = this["strL"] + (e.clientX - this["strX"]);
    var curT = this["strT"] + (e.clientY - this["strY"]);
    //拖拽时候的边界判断
    if (curL >= (winW - this.offsetWidth)) {
        this.style.left = winW - this.offsetWidth + "px";
    } else if (curL <= 0) {
        this.style.left = 0;
    } else {
        this.style.left = curL + "px";
    }
    if (curT >= (winH - this.offsetHeight)) {
        this.style.top = winH - this.offsetHeight + "px";
    } else if (curT <= 0) {
        this.style.top = 0;
    } else {
        this.style.top = curT + "px";
    }

    //实现抛物线效果
    if (!this.pre) {
        this.pre = this.offsetLeft;
    } else {
        this.speed = this.offsetLeft - this.pre;
        this.pre = this.offsetLeft;
    }
}

function up(e) {
    if (this.releaseCapture) {
        this.releaseCapture();
        off(this, "mousemove", move);
        off(this, "mouseup", up);
        fly.call(this);
        drop.call(this);
        return;
    }
    off(document, "mousemove", this.moveFn);
    off(document, "mouseup", this.upFn);
    fly.call(this);
    drop.call(this);
}


function fly() {
    window.clearTimeout(this.flyTimer);
    this.speed *= 0.98;
    var curL = this.offsetLeft + this.speed;
    if (curL >= (winW - this.offsetWidth)) {
        this.style.left = winW - this.offsetWidth + "px";
        this.speed *= -1;
    } else if (curL <= 0) {
        this.style.left = 0;
        this.speed *= -1;
    } else {
        this.style.left = curL + "px";
    }
    if (Math.abs(this.speed) < 0.5) {
        return;
    }
    this.flyTimer = window.setTimeout(processThis(this, fly), 20);
}

var dropFlag = 0;
function drop() {
    window.clearTimeout(this.dropTimer);
    !this.dropSpeed ? this.dropSpeed = 9.18 : this.dropSpeed += 9.18;
    this.dropSpeed *= 0.98;
    var curT = this.offsetTop + this.dropSpeed;
    if (curT >= (winH - this.offsetHeight)) {
        this.style.top = winH - this.offsetHeight + "px";
        this.dropSpeed *= -1;
        dropFlag++;
    } else {
        this.style.top = curT + "px";
        dropFlag = 0;
    }

    if (dropFlag >= 2) {
        return;
    }
    this.dropTimer = window.setTimeout(processThis(this, drop), 20);
}


