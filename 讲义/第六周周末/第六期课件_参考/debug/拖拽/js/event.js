var on = function (ele, type, fn) {//主要是解决顺序的问题
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    if (!ele["aEvent" + type]) {
        ele["aEvent" + type] = [];
        ele.attachEvent("on" + type, function () {
            run.call(ele)
        });
    }
    var a = ele["aEvent" + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] == fn) return;
    }
    a.push(fn);
    //blind(ele, type, run);
    //ele.attachEvent("on"+type,function(){run.call(ele)});
};

var run = function () {
    var e = window.event;
    if (!e.target) {
        e.target = e.srcElement;
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancleBubble = true;
        };
        e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
        e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
    }
    var a = this["aEvent" + e.type];
    for (var i = 0; i < a.length; i++) {
        if (typeof a[i] === "function") {
            a[i].call(this, e);
        } else {
            a.splice(i, 1);
            i--;
        }
    }
};
var off = function (ele, type, fn) {
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return;
    }
    var a = ele["aEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                a[i].call(this, e);
            } else {
                a[i] = null;
                break;
            }
        }
    }
};

var processThis=function(obj,fn){
    return function(e){
        fn.call(obj,e);
    };
};
