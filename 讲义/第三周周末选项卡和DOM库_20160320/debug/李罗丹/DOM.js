
var DOM={};
DOM.getIndex=function getIndex(ele){//表示计算ele这个元素的索引号
    var index=0;
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType===1){
            index++;
        }
        p= p.previousSibling;
    }
    return index;
};
DOM.offset=function offset(ele){
    //计算任意元素距离文档顶部的绝对偏移量
    var l=ele.offsetLeft;
    var t=ele.offsetTop;
    var p=ele.offsetParent;
    while(p){
        if(window.navigator.userAgent.indexOf("MSIE 8")==-1){
            l+= p.offsetLeft+ p.clientLeft;
            t+= p.offsetTop+ p.clientTop;
        }
        else{
            l+= p.offsetLeft;
            t+= p.offsetTop

        }
        p= p.offsetParent;
    }
    return {left:l,top:t};
}
DOM.listToArray=function listToArray(likeArray){
    //将类数组转化为数组

    try{
        return [].slice.call(likeArray);
    }
    catch(e){
        var ary=[];
        for(var i=0;i<ary.length;i++){
            ary[ary.length]=likeArray[i];
        }
        return ary;
    }
}
DOM.siblings=function siblings(ele){
    //1.方法一
    //获得ele的所有的元素兄弟节点
//        var parent=ele.parentNode;
//        var children=parent.children;//所有元素节点，IE中还会包括注释节点
//        //var children=parent.childNodes;//所有节点
//        var ary=[];
//        for(var i=0;i<children.length;i++){
//            if(children[i].nodeType==1&&children[i]!=ele){
//                ary.push(children[i]);
//            }
//        }
//        return ary;

    //2.方法二
    //先找到所有哥哥元素节点，再找所有弟弟元素节点
    var ary=[];
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType===1){//和值类型比较用三个等号，和对象类型比较用两个等号
            ary.push(p);
        }
        p= p.previousSibling;
    }
    ary.reverse();//让其哥哥元素节点从大到小排好

    var next=ele.nextSibling;
    while(p){
        if(next.nodeType===1){
            ary.push(next);
        }
        next=next.nextSibling;
    }
    return ary;
};

//获得ele相邻的弟弟元素节点,返回值最多只有一个
DOM.next=function next(ele){
    //通用原则是一个属性或一个变量，如果是对象类型的，需要初始化的时候，赋值一个null值
    //如果不是对象类型，比如字符串：str="";
    //if(ele.nextElementSibling)直接判断是不严谨的
    if(typeof  ele.nextElementSibling=="object"){//nextElementSibling:新版浏览器支持的DOM属性
        return  ele.nextElementSibling;
    }else{//如果不支持nextElementSibling这个属性
        var next=ele.nextSibling;
        while(next){
            if(next.nodeType==1){
                return next;//返回的不是数组
            }
            next=next.nextSibling;
        }
        return null;//补人品的，防止上边的while循环进不去导致的没有返回值
    }
}
DOM.previous=function previous(ele){//获得ele相邻的哥哥元素节点,返回值最多只有一个

}
//获得ele相邻的弟弟元素节点,返回值最多只有一个
DOM.nextSiblings=function nextSiblings(ele){//获得ele相邻的弟弟们元素节点，返回的是集合

}
DOM.previousSiblings=function previousSiblings(ele){//获得ele相邻的哥哥们元素节点，返回的是集合

}


DOM.insertAfter=function insertAfter(oldEle,newEle){
    //表示把newEle添加到oldEle的后边
    //和insertBefore相对应

    ele.insertBefore(a,b);//把a（newEle）添加到b(oldEle)后边,就是把newEle添加到oldEle的弟弟前边
    if(oldEle.nextSibling){//如果oldEle的弟弟不是null
        oldEle.parentNode.insertBefore(newEle,oldEle.nextSibling);
    }else{
        oldEle.parentNode.appendChild(newEle);//第二个参数是null，就相当于给末尾增加一项
    }

};
DOM.prepend= function prepend(parent,child){
    //把child元素添加成parent一个子元素
    //和appendChild相对应
    parent.insertBefore(child,parent.firstChild);
};

DOM.children=function(parent,str){//获得parent的所有的元素子节点,还可以获得指定标签名的子元素
    var ary=[];
    var childNodes=parent.childNodes;
    str=str.toUpperCase();//把str无条件转为大写
    if(typeof str=="string"){//判断以下第二个参数传的是否正确
        //标签名要和str指定的相同才行，还要是元素节点
        for(var i=0;i<childNodes.length;i++){
            var child=childNodes[i];
            if(child.tagName===str){//tagName只是元素的属性，而nodeName则是所有节点的属性，如果是非元素节点，它将输出#text或者别的nodeName值
                ary.push(child);
            }
        }
    }else if(str===undefined){//没有指明标签名，则把所有的子元素都返回
        for(var i=0;i<childNodes.length;i++){
            var child=childNodes[i];
            if(child.nodeType===1){
                ary.push(child);
            }
        }
    }else{
        throw new Error("第二个参数传错了");
    }

    return ary;
};