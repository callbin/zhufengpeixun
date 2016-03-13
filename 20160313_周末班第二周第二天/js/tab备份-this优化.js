//->想要操作谁就先获取谁
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;
var data = null;

//->1、首先获取后台中的数据
var xhr = new XMLHttpRequest;
xhr.open("get", "json/data.txt", false);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        data = utils.jsonParse(val);
    }
};
xhr.send(null);

//->2、实现我们的数据绑定
function bind() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        var oTr = document.createElement("tr");
        for (var key in cur) {
            var oTd = document.createElement("td");
            oTd.innerHTML = key === "sex" ? (cur[key] === 0 ? "男" : "女") : cur[key];
            oTr.appendChild(oTd);
        }
        frg.appendChild(oTr);
    }
    tBody.appendChild(frg);
    frg = null;
}
bind();

//->3、实现隔行变色
function changeBg() {
    for (var i = 0; i < oRows.length; i++) {
        oRows[i].className = i % 2 === 1 ? "bg" : null;
    }
}
changeBg();


//->4、编写表格排序的方法:实现按照年龄这一列进行排序
function sort() {
    //this->oThs[1]
    var _this = this;

    var ary = utils.listToArray(oRows);

    _this.flag *= -1;
    ary.sort(function (a, b) {
        //this->window
        return (parseFloat(a.cells[1].innerHTML) - parseFloat(b.cells[1].innerHTML)) * _this.flag;
    });

    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;
    changeBg();
}

//5、点击第二列实现排序
oThs[1].flag = -1;
oThs[1].onclick = function () {
    //this->oThs[1]
    //sort();//->sort中的this->window
    //sort.call(oThs[1]);
    sort.call(this);
};















