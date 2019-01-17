export default isDateBetween;

function dateParse(dateString) {
    var SEPARATOR_BAR = "-";
    var SEPARATOR_SLASH = "/";
    var SEPARATOR_DOT = ".";
    var dateArray;
    if (dateString.indexOf(SEPARATOR_BAR) > -1) {
        dateArray = dateString.split(SEPARATOR_BAR);
    } else if (dateString.indexOf(SEPARATOR_SLASH) > -1) {
        dateArray = dateString.split(SEPARATOR_SLASH);
    } else {
        dateArray = dateString.split(SEPARATOR_DOT);
    }
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
};

function dateCompare(dateString, compareDateString) {
    var dateTime = dateParse(dateString).getTime();
    var compareDateTime = dateParse(compareDateString).getTime();

    if (compareDateTime > dateTime) {
        return 1;
    } else if (compareDateTime == dateTime) {
        return 0;
    } else {
        return -1;
    }
};


function isDateBetween(startDateString, endDateString) {

    var flag = false;
    var startFlag = (dateCompare(myDate(), startDateString) < 1);
    var endFlag = (dateCompare(myDate(), endDateString) > -1);
    if (startFlag && endFlag) {
        flag = true;
    }
    return flag;
};

function myDate() {

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
    Date.prototype.Format = function(fmt) { // author: meizz
        var o = {
            "M+": this.getMonth() + 1, // 月份
            "d+": this.getDate(), // 日
            "h+": this.getHours(), // 小时
            "m+": this.getMinutes(), // 分
            "s+": this.getSeconds(), // 秒
            "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
            "S": this.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    var nowDate = new Date().Format("yyyy-MM-dd");
    return nowDate;
};