function bind(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else {
        //要根据事件类型来定义不同的自定义属性（数组）
        if (!ele["tempFn" + type]) {
            ele["tempFn" + type] = [];
        }
        var a = ele["tempFn" + type];
        for (var i = 0; i < a.length; i++) {
            if (a[i].photo == fn)return;
        }
        function tempFn() {
            fn.call(ele);
        }//经过改造之后的方法
        tempFn.photo = fn;//给每一个经过改造之后的方法都加识别属性

        a.push(tempFn);
        //this的问题 不能是run 重复绑定
        ele.attachEvent("on" + type, tempFn);
    }
}

function unbind(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
    } else {
        var a = ele["tempFn" + type];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                if (a[i].photo == fn) {

                    ele.detachEvent("on" + type, a[i]);
                    a.splice(i, 1);//不但在事件中将其移除，还要在数组里将其移除
                    break;//因为同一个方法只能被绑定一次，则：移除了这次绑定，则应该不再循环了
                }

            }
        }

    }

}


function on(ele, type, fn) {//伪事件绑定：把要绑定的方法放在一个数组里
    if(ele.addEventListener){
        ele.addEventListener(type,fn,false);
        return;
    }
    if (!ele["aEvent" + type]) {//如果没有这个数组，则创建一个数组，这样保证这个数组只创建一次
        ele["aEvent" + type] = [];	//把这个属性定义成数组
        //ele.aEventclick=[];
    }
    var a = ele["aEvent" + type];
    for (var i = 0; i < a.length; i++) {//避免重复绑定的判断
        if (a[i] == fn)return;
    }

    a.push(fn);

    bind(ele, type, run);//这才是真绑定呢

}

function run(e) {
    var e = e || window.event;

    var type = e.type;//事件类型
    if (!e.target) {
        e.target = e.srcElement;//如果你不支持target属性，则伪造一个，假装支持
        e.preventDefault = function () {
            e.returnValue = false;
        };
        e.stopPropagation = function () {
            e.cancelBubble = true
        };
        e.pageX = (document.documentElement.scrollLeft || document.body.scrollLeft) + e.clientX;
        e.pageY = (document.documentElement.scrollTop || document.body.scrollTop) + e.clientY;
    }
    var a = this["aEvent" + type];
    for (var i = 0; i < a.length; i++) {
        //a[i].call(this);
        if (typeof a[i] == "function") {
            a[i].call(this, e);
        } else {
            a.splice(i, 1);
            i--;
        }
    }
}
function off(ele, type, fn) {//解除绑定，就是在数组里把保存的方法删除
    if(ele.removeEventListener){
        ele.removeEventListener(type,fn,false);
        return;
    }
    var a = ele["aEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                //a.splice(i,1);
                a[i] = null;
                break;
            }
        }
    }
}
function processThis(obj, fn) {
    return function (e) {
        fn.call(obj, e)
    }
}
