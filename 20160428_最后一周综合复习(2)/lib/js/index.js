//->给我们的MATCH大盒子设置固定的高度
var $match = $(".match");
var $winH = document.documentElement.clientHeight || document.body.clientHeight;
$match.css("height", $winH - 40);

//->给日期区域动态的绑定数据
function formatTime(time) {
    time = time.replace(/^(\d{4})-(\d{1,2})-(\d{1,2})$/g, function () {
        var month = arguments[2].length < 2 ? "0" + arguments[2] : arguments[2];
        var day = arguments[3].length < 2 ? "0" + arguments[3] : arguments[3];
        return month + "-" + day;
    });
    return time;
}

function bindWeekHTML(cbData) {
    var $matchInner = $(".matchTop .inner");
    if (cbData && cbData.code === 0) {
        var weekList = cbData["data"]["data"], today = cbData["data"]["today"];

        //->绑定数据
        var str = '';
        for (var i = 0, len = weekList.length; i < len; i++) {
            var curWeek = weekList[i];
            //->把当前LI对应的日期存储到自己的自定义属性上,后期我只需要获取当前的这个自定义属性值就知道自己代表哪一天
            str += '<li date="' + curWeek["date"] + '">';
            str += '<span class="week">' + curWeek["weekday"] + '</span>';
            str += '<span class="date">' + formatTime(curWeek["date"]) + '</span>';
            str += '</li>';
        }
        $matchInner.html(str).css("width", len * 105);

        //->定位到今天的日期
        $matchInner.children("li").each(function (index, item) {
            if ($(item).attr("date") === today) {
                $(item).addClass("bg").siblings().removeClass("bg");
                $matchInner.css("left", (-index + 3) * 105);
            }
        });
    }
}

$.ajax({
    url: "http://matchweb.sports.qq.com/kbs/calendar?columnId=100000&_=" + Math.random(),
    type: "get",
    dataType: "jsonp",
    //jsonp:"cb",//->把我们的callback改为cb
    //jsonpCallback: "week",//->把jQuery自动生成的那个随机的回调函数的名字修改为我们的week
    success: function (data) {
        bindWeekHTML(data);
    }
});


























