//->想要操作谁就先获取谁
var oTab = document.getElementById("tab");
var tHead = oTab.tHead;
var oThs = tHead.rows[0].cells;
var tBody = oTab.tBodies[0];
var oRows = tBody.rows;

var data = null;

//->1、首先获取后台(data.txt)中的数据->"JSON格式的字符串" ->Ajax(async javascript and xml)
//1)首先创建一个Ajax对象
var xhr = new XMLHttpRequest;

//2)打开我们需要请求数据的那个文件地址
xhr.open("get", "json/data.txt", false);

//3)监听请求的状态
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        var val = xhr.responseText;
        data = utils.jsonParse(val);
    }
};

//4)发送请求
xhr.send(null);

//->2、实现我们的数据绑定
function bind() {
    var frg = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
        var cur = data[i];
        var oTr = document.createElement("tr");//->每一次循环创建一个TR
        //每一个TR中还需要创建四个TD,因为每一个对象中有四组键值对
        for (var key in cur) {
            var oTd = document.createElement("td");

            //->对性别进行特殊的处理 0->男 1->女
            if (key === "sex") {
                oTd.innerHTML = cur[key] === 0 ? "男" : "女";
            } else {
                oTd.innerHTML = cur[key];
            }
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