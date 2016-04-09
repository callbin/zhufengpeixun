//存方法组，解决顺序错乱的问题
function on(ele, type, fn) {
    if(ele.addEventListener){//处理标准浏览器
        ele.addEventListener(type,fn,false);
        return;//return或者下面写个else都可以
    }
    if (!ele["aEvent" + type]) {
        ele["aEvent" + type] = [];
        //用来保证run方法不会重复的被绑定
        ele.attachEvent("on" + type, function() {run.call(ele);});
    }
    var a = ele['aEvent' + type];
    for (var i = 0; i < a.length; i++) {
        if (a[i] === fn) {
            return;
        }
    }
    a.push(fn);

    //ele.attachEvent("on" + type,  function() {run.call(ele);});


    // bind(ele,type,run);//原来绑定的方式
}

function run() {
    var e = window.event;
    if(!e.target){//表示肯定是IE，不支持下面的这些
        e.target= e.srcElement;
        e.preventDefault=function(){e.returnValue=false;};
        e.stopPropagation=function(){e.cancelable=true;};
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
    }
    var a = this["aEvent" + e.type];
    for (var i = 0; i < a.length; i++) {
        if (typeof a[i] == "function") {
            a[i].call(this, e);//因为标准浏览器不会执行这个run方法，所以这个e不会污染到标准浏览器的e
        } else {
            a.splice(i, 1);
            i--;
        }
    }
}

function off(ele,type,fn) {
    if(ele.removeEventListener){
        ele.removeListener(type,fn,false);
        return;
    }
    var a = ele["aEvent" + type];
    if (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == fn) {
                a[i] = null;
                return;
            }
        }
    }
}


/*
//bind方法解决IE中被绑定的事件上的方法，在运行的时候，this不指向ele的问题
function bind(ele, type, fn) {

    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else if (ele.attachEvent) {
        //有一个避免重复绑定，写一个for循环，用自定义photo这个属性来解决

        function fnTemp(e) {
            fn.call(ele, e);
        }//核心代码
        ele.attachEvent("on" + type, fnTemp);
    }
}
//解除绑定
function unbind(ele, type, fn) {

}*/
