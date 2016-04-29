(function (pro) {
    //myTrim:Remove the string and space
    pro.myTrim = function myTrim() {
        return this.replace(/(^ +| +$)/g, "");
    };

    //mySub:Intercept string, this method is distinguished in English
    pro.mySub = function mySub() {
        var len = arguments[0] || 10, isD = arguments[1] || false, str = "", n = 0;
        for (var i = 0; i < this.length; i++) {
            var s = this.charAt(i);
            /[\u4e00-\u9fa5]/.test(s) ? n += 2 : n++;
            if (n > len) {
                isD ? str += "..." : void 0;
                break;
            }
            str += s;
        }
        return str;
    };

    //myFormatTime:Format time
    pro.myFormatTime = function myFormatTime() {
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

    //queryURLParameter:Gets the parameters in the URL address bar
    pro.queryURLParameter = function queryURLParameter() {
        var reg = /([^?&=]+)=([^?&=]+)/g, obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    };
})(String.prototype);


//->给我们的MATCH大盒子设置固定的高度
var $match = $(".match"),
    $matchTop = $match.children(".matchTop"),
    $matchInner = $matchTop.find(".inner"),
    $calendarList = null;
var $matchList = $match.children(".matchList");

var $winH = document.documentElement.clientHeight || document.body.clientHeight;
$match.css("height", $winH - 40);
$matchList.css("height", $winH - 40 - 80);
var matchScroll = new IScroll("#matchList", {
    scrollbars: true,
    mouseWheel: true,
    bounce: false
});

//->日期区域的数据绑定和相关操作效果的实现
var $calendarCallback = $.Callbacks();
$.ajax({
    url: "http://matchweb.sports.qq.com/kbs/calendar?columnId=100000&_=" + Math.random(),
    type: "get",
    dataType: "jsonp",
    success: $calendarCallback.fire
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
            str += "<span class='date'>" + curData["date"].myFormatTime("{1}-{2}") + "</span>";
            str += "</li>";
        }
        $matchInner.html(str).css("width", len * 105);
        $calendarList = $matchInner.children("li");
    }
}
$calendarCallback.add(calendarBind);

//->开始的时候定位到指定的日期区域
function posToday(calendarData) {
    if (calendarData) {
        var today = calendarData["data"]["today"];
        $calendarList.each(function (index, item) {
            $(this).attr("date") === today ? $(this).addClass("bg") : $(this).removeClass("bg");
            if ($(this).attr("date") === today) {
                $matchInner.css("left", 105 * (3 - index));
            }
        });
    }
    //->开始的时候绑定数据
    var strIndex = Math.abs(parseFloat($matchInner.css("left"))) / 105;
    var endIndex = strIndex + 6;
    bindMatch($calendarList.eq(strIndex).attr("date"), $calendarList.eq(endIndex).attr("date"));
}
$calendarCallback.add(posToday);

//->绑定左右按钮的点击操作:事件委托来处理
function bindLink() {
    $matchTop.on("click", function (e) {
        var $tar = $(e.target), tar = e.target;
        var tarTagName = tar.tagName.toUpperCase();

        //->如果事件源是左右的A标签
        if (tarTagName === "A" && /^link(Left|Right)$/.test(tar.className)) {
            var oldLeft = parseFloat($matchInner.css("left")), curL = null;
            if ($tar.hasClass("linkLeft")) {
                curL = oldLeft + 735;
                curL = curL >= 0 ? 0 : curL;
            } else {
                curL = oldLeft - 735;
                var maxL = $matchInner.width() - (105 * 7);
                curL = Math.abs(curL) >= maxL ? -maxL : curL;
            }
            $matchInner.stop().animate({left: curL}, 300, function () {
                $calendarList.eq(Math.abs(curL) / 105).addClass("bg").siblings().removeClass("bg");

                //->绑定对应的数据
                var strIndex = Math.abs(parseFloat($matchInner.css("left"))) / 105;
                var endIndex = strIndex + 6;
                bindMatch($calendarList.eq(strIndex).attr("date"), $calendarList.eq(endIndex).attr("date"));
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

            //->运动到指定的日期
            matchScroll.scrollToElement(document.getElementById("demoH2" + $curLi.attr("date")), 500);
        }
    });
}
$calendarCallback.add(bindLink);


/*数据列表区域的操作效果*/
function bindMatch(startTime, endTime) {
    $.ajax({
        url: "http://matchweb.sports.qq.com/kbs/list?columnId=100000&startTime=" + startTime + "&endTime=" + endTime + "&_=" + Math.random(),
        type: "get",
        dataType: "jsonp",
        success: callBack
    });
    function callBack(matchData) {
        var str = "";
        if (matchData) {
            matchData = matchData["data"];
            for (var key in matchData) {
                var curTime = key, curAry = matchData[key];
                str += "<li class='matchList-demo'>";
                str += "<h2 id='demoH2" + curTime + "'>" + curTime.myFormatTime("{1}月{2}日") + "</h2>";
                str += "<ul>";
                for (var i = 0; i < curAry.length; i++) {
                    var curData = curAry[i];
                    str += "<li>";
                    str += "<div class='demoLeft'><span class='startTime'>" + curData["startTime"].myFormatTime("{3}:{4}") + "</span><span class='matchTitle'>" + curData["matchDesc"] + "</span></div>";

                    str += "<div class='demoCenter'>";
                    str += "<div class='home'><img src='" + curData["leftBadge"] + "'/><span>" + curData["leftName"] + "</span></div>";
                    str += "<div class='score'>" + curData["leftGoal"] + "-" + curData["rightGoal"] + "</div>";
                    str += "<div class='away'><span>" + curData["rightName"] + "</span><img src='" + curData["rightBadge"] + "'/></div>";
                    str += "</div>";

                    str += "<div class='demoRight'>";
                    str += "<a href='' class='videoList'>视频集锦</a>";
                    str += "<a href='' class='matchVideo'>比赛回放</a>";
                    str += "</div>";
                    str += "</li>";
                }
                str += "</ul>";
                str += "</li>";
            }
        }
        $matchList.children("ul").html(str);
        matchScroll.refresh();
    }
}












































