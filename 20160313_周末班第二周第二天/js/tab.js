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
function sort(n) {
    var _this = this;
    var ary = utils.listToArray(oRows);

    //->点击当前列,需要让其他的列的flag存储的值回归到初始值-1,这样在返回头点击其他的列,才是按照升序排列的
    for (var k = 0; k < oThs.length; k++) {
        if (oThs[k] !== this) {
            oThs[k].flag = -1;
        }
    }

    _this.flag *= -1;
    ary.sort(function (a, b) {
        var curInn = a.cells[n].innerHTML, nexInn = b.cells[n].innerHTML;
        var curInnNum = parseFloat(a.cells[n].innerHTML), nexInnNum = parseFloat(b.cells[n].innerHTML);
        if (isNaN(curInnNum) || isNaN(nexInnNum)) {
            return (curInn.localeCompare(nexInn)) * _this.flag;
        }
        return (curInnNum - nexInnNum) * _this.flag;
    });

    var frg = document.createDocumentFragment();
    for (var i = 0; i < ary.length; i++) {
        frg.appendChild(ary[i]);
    }
    tBody.appendChild(frg);
    frg = null;
    changeBg();
}

//5、点击排序:所有具有class="cursor"这个样式的列都可以实现点击排序
for (var i = 0; i < oThs.length; i++) {
    var curTh = oThs[i];
    if (curTh.className === "cursor") {
        curTh.index = i;
        curTh.flag = -1;
        curTh.onclick = function () {
            sort.call(this, this.index);
        }
    }
}