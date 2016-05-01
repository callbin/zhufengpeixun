String.prototype.myFormatTime = function myFormatTime() {
    var reg = /^(\d{4})(?:-|\/|\.|:)(\d{1,2})(?:-|\/|\.|:)(\d{1,2})(?: +)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?(?:-|\/|\.|:)?(\d{1,2})?$/g, ary = [];
    this.replace(reg, function () {
        ary = ([].slice.call(arguments)).slice(1, 7);
    });
    var format = arguments[0] || "{0}年{1}月{2}日{3}:{4}:{5}";
    return format.replace(/{(\d+)}/g, function () {
        var val = ary[arguments[1]];
        return val.length === 1 ? "0" + val : val;
    });
};


function callBack(data) {
    if (data) {
        data = data[1];

        //->把我们请求回来的数据存储在本地
        var obj = {
            time: new Date().getTime(),
            data: data
        };
        localStorage.setItem("supData", JSON.stringify(obj));

        //->实现数据绑定
        bindData(data);
    }
}

function bindData(data) {
    var matchInfo = data["matchInfo"];

    var str = '';
    str += '<div class="teamInfo">';
    str += '<div><img src="' + matchInfo["leftBadge"] + '"/><span>' + matchInfo["leftGoal"] + '</span></div>';
    str += '<div>' + matchInfo["startTime"].myFormatTime("{1}月{2}日 {3}:{4}") + '</div>';
    str += '<div><span>' + matchInfo["rightGoal"] + '</span><img src="' + matchInfo["rightBadge"] + '"/></div>';
    str += '</div>';

    str += '<div class="teamNum"><span></span></div>';

    str += '<div class="teamSup">';
    str += '<div><em></em>' + data["leftSupport"] + '</div>';
    str += '<div>' + matchInfo["matchDesc"] + '</div>';
    str += '<div>' + data["rightSupport"] + '<em></em></div>';
    str += '</div>';

    $(".team").html(str);
}

var supData = localStorage.getItem("supData");
if (supData) {//->有存储内容
    supData = JSON.parse(supData);
    var time = supData.time;
    if (new Date().getTime() - time >= 60000) {//->超过一分钟
        ajax();
    } else {
        bindData(supData.data);
    }
}else{
    ajax();
}

function ajax() {
    $.ajax({
        url: "http://matchweb.sports.qq.com/html/matchDetail?mid=100000:1468487&_=" + Math.random(),
        type: "get",
        dataType: "jsonp",
        success: callBack
    });
}





