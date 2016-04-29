//->给我们的MATCH大盒子设置固定的高度
var $match = $(".match"),
    $matchTop = $match.children(".matchTop"),
    $matchInner = $matchTop.find(".inner"),
    $calendarList = null;

var $winH = document.documentElement.clientHeight || document.body.clientHeight;
$match.css("height", $winH - 40);

//->格式化时间字符串:把"2016-4-28"->"04-28"
function formatTime(time) {
    time = time.replace(/^(\d{4})-(\d{1,2})-(\d{1,2})$/g, function () {
        var month = arguments[2].length < 2 ? "0" + arguments[2] : arguments[2];
        var day = arguments[3].length < 2 ? "0" + arguments[3] : arguments[3];
        return month + "-" + day;
    });
    return time;
}

//->日期区域的数据绑定和相关操作效果的实现
$.ajax({
    url: "http://matchweb.sports.qq.com/kbs/calendar?columnId=100000&_=" + Math.random(),
    type: "get",
    dataType: "jsonp",
    success: function (data) {
        calendarBind(data);
        posToday(data);
        bindLink();
    }
});

//->日期区域数据绑定
function calendarBind(calendarData) {
    if (calendarData) {
        var data = calendarData["data"]["data"];
        var str = "";
        for (var i = 0, len = data.length; i < len; i++) {
            var curData = data[i];
            str += "<li date='" + curData["date"] + "'>";
            str += "<span class='week'>" + curData["weekday"] + "</span>";
            str += "<span class='date'>" + formatTime(curData["date"]) + "</span>";
            str += "</li>";
        }
        $matchInner.html(str).css("width", len * 105);
        $calendarList = $matchInner.children("li");
    }
}

//->开始的时候定位到指定的日期区域
function posToday(calendarData) {
    if (calendarData) {
        var today = calendarData["data"]["today"];
        $calendarList.each(function (index, item) {
            //$(item)<==>$(this) 每一次循环的时候当前的这一项LI元素标签
            $(this).attr("date") === today ? $(this).addClass("bg") : $(this).removeClass("bg");

            //->定位到具体的位置
            if ($(this).attr("date") === today) {
                $matchInner.css("left", 105 * (3 - index));
            }
        });
    }
}

//->绑定左右按钮的点击操作:事件委托来处理
function bindLink() {
    $matchTop.on("click", function (e) {
        var $tar = $(e.target), tar = e.target;
        var tarTagName = tar.tagName.toUpperCase();

        //->如果事件源是左右的A标签
        if (tarTagName === "A" && /^link(Left|Right)$/.test(tar.className)) {
            var oldLeft = parseFloat($matchInner.css("left")), curL = null;
            if ($tar.hasClass("linkLeft")) {
                //->向左的按钮
                curL = oldLeft + 735;
                curL = curL >= 0 ? 0 : curL;
            } else {
                //->向右的按钮
                curL = oldLeft - 735;
                var maxL = $matchInner.width() - (105 * 7);
                curL = Math.abs(curL) >= maxL ? -maxL : curL;
            }
            $matchInner.stop().animate({left: curL}, 300, function () {
                //->让当前切换这一区域的第一个选中:
                //当前$matchInner的LEFT值除以105获取到的结果其实就是当前区域第一个LI的索引
                $calendarList.eq(Math.abs(curL) / 105).addClass("bg").siblings().removeClass("bg");
            });

            return;
        }

        //->如果事件源是每一个LI或者是每一个LI下的SPAN
        if (/^(LI|SPAN)$/.test(tarTagName)) {
            var $curLi = $tar;
            if (tarTagName === "SPAN") {
                $curLi = $tar.parent();
            }
            $curLi.addClass("bg").siblings().removeClass("bg");
        }
    });
}
















































