$(function() {

    function IsLeap(year) {
        return (year % 100 == 0) ? ((year % 400 == 0) ? 1 : 0) : ((year % 4 == 0) ? 1 : 0);
    };
    var date = new Date();
    var _year = date.getFullYear();
    var nowYear = date.getFullYear();
    var _mouth = date.getMonth();
    var _day = date.getDay();
    var date_ = date.getDate();
    console.log(date_);

    function dateFn(option) {
        // option.obj && option.obj = option.obj
        var myDate;
        option.data ? myDate = new Date(option.data[0], option.data[1], option.data[2]) : myDate = new Date();
        // var myDate = new Date(2017, -12, 1);
        // console.log(new Date(2017, -1, 1).getMonth() + 1)
        console.log(myDate);
        var now_day = myDate.getDay();
        console.log(now_day);
        var year = myDate.getFullYear();
        var dayMouth = [31, 28 + IsLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var mouth = myDate.getMonth();
        var mouthDays = dayMouth[mouth]; // 获取当月有多少天

        var date = new Date(year, mouth, 1); //获取当月第一天
        var date2 = new Date().getDate();
        var nowDay = date.getDay(); //获取当月第一天是星期几

        var trCount = Math.ceil((mouthDays + nowDay) / 7); //获取当月有多少行
        var tableContent = "";
        for (var i = 0; i < trCount; i++) {
            /*日历每行数据的开头*/
            tableContent += "<tr class='cb-attendanceCalendarTableTbodyTr'>";
            for (var j = 0; j < 7; j++) {
                var idx = i * 7 + j; //表单的自然序号
                var data = idx - nowDay + 1; //当前表格的日期数

                if (data <= 0 || data > mouthDays) { //当月不是从星期天开始或当月不是以星期六结束
                    tableContent += "<td class='otherMouth cb-attendanceCalendarTableTbodyTrTd'></td>";
                } else {
                    if (date_ == data && mouth == _mouth) {
                        tableContent += "<td class='nowMouth cb-attendanceCalendarTableTbodyTrTd " + year + "-" + (mouth + 1) + "-" + data + " now _now'>" + "<div>" + "<div class='cb-attendanceCalendarTableTbodyTrTdDate'>" + data + "</div>" + "<div class='cb-attendanceCalendarTableTbodyTrTdWork'>" + "班" + "</div>" + "<div class='cb-attendanceCalendarTableTbodyTrTdDot'></div>" + "</div>" + "</td>";
                    } else {
                        tableContent += "<td class='nowMouth cb-attendanceCalendarTableTbodyTrTd " + year + "-" + (mouth + 1) + "-" + data + "'> " + "<div>" + "<div class='cb-attendanceCalendarTableTbodyTrTdDate'>" + data + "</div>" + "<div class='cb-attendanceCalendarTableTbodyTrTdWork'>" + "班" + "</div>" + "<div class='cb-attendanceCalendarTableTbodyTrTdDot'></div>" + "</div>" + "</td>";
                    }

                }
            }
            tableContent += "</tr>";
        }
        var sDate = option.data;
        var result =
            `<table class="cb-attendanceCalendarTable">		    
			<tr class="cb-attendanceCalendarTableTheadTr">
				<th class="cb-attendanceCalendarTableTheadTrTh">日</th>
				<th class="cb-attendanceCalendarTableTheadTrTh">一</th>
				<th class="cb-attendanceCalendarTableTheadTrTh">二</th>
				<th class="cb-attendanceCalendarTableTheadTrTh">三</th>
				<th class="cb-attendanceCalendarTableTheadTrTh">四</th>
				<th class="cb-attendanceCalendarTableTheadTrTh">五</th>
				<th class="cb-attendanceCalendarTableTheadTrTh">六</th>
			</tr>
			${tableContent}
		</table>`;

        if (option.return) {
            return result
        }
        option.obj.append(result);
    }




    var datArr = [
        [_year, _mouth - 2, 1],
        [_year, _mouth - 1, 1],
        [_year, _mouth, _day],
        [_year, _mouth + 1, 1],
        [_year, _mouth + 2, 1]
    ];
    console.log(JSON.stringify(datArr));
    console.log($('.swiper-slide').length);
    for (var i = 0; i < $('.swiper-slide').length; i++) {
        dateFn({ 'obj': $('.swiper-slide').eq(i), 'data': datArr[i] });
    }
    var w = document.body.clientWidth;
    console.log("WWWWWWWWWWWWW"+w);
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: false,
        width: w,
        onSlidePrevEnd: function() {
            mySwiper.disableTouchControl();
            for (var i = 0; i < datArr.length; i++) {
                datArr[i][1]--
            }
            mySwiper.removeSlide(4);
            mySwiper.prependSlide("<div class='swiper-slide'>" + dateFn({ 'data': datArr[0], 'return': true }) + "</div>")
            var _date = new Date(datArr[0][0], datArr[0][1] + 2, datArr[0][2]);
            console.log(datArr[0][0], datArr[0][1]);
            var EnglishMonth=null;
            switch (_date.getMonth() + 1){
                case 1:
                    EnglishMonth="Jan";
                    break;
                case 2:
                    EnglishMonth="Feb";
                    break;
                case 3:
                    EnglishMonth="Mar";
                    break;
                case 4:
                    EnglishMonth="Apr";
                    break;
                case 5:
                    EnglishMonth="May";
                    break;
                case 6:
                    EnglishMonth="Jun";
                    break;
                case 7:
                    EnglishMonth="Jul";
                    break;
                case 8:
                    EnglishMonth="Aug";
                    break;
                case 9:
                    EnglishMonth="Sep";
                    break;
                case 10:
                    EnglishMonth="Oct";
                    break;
                case 11:
                    EnglishMonth="Nov";
                    break;
                case 12:
                    EnglishMonth="Dec";
                    break;
            };
            $('.cb-attendanceCalendarTopMonth').text(EnglishMonth + " • " + _date.getFullYear());
            $('.showDate span').eq(0).text(_date.getFullYear() + "年");
            $('.showDate span').eq(1).text((_date.getMonth() + 1) + "月");
            mySwiper.update();
            mySwiper.slideTo(2, 0, false);
            mySwiper.enableTouchControl();

            /*for (key in jsonObj) {
                console.log($('.' + key).children('.calendar-num'));
                if($('.' + key).children('.calendar-num').length){return}
                $('.' + key).append("<span class='calendar-num'>" + jsonObj[key] + "</span>")
            }*/
        },
        onSlideNextEnd: function() {
            mySwiper.disableTouchControl();
            for (var i = 0; i < datArr.length; i++) {
                datArr[i][1]++
            }
            mySwiper.removeSlide(0);
            mySwiper.appendSlide("<div class='swiper-slide'>" + dateFn({ 'data': datArr[4], 'return': true }) + "</div>");
            var _date = new Date(nowYear, datArr[4][1] - 2, datArr[4][2]);
            console.log(nowYear, datArr[4][1] - 2);
            console.log(datArr[4][0], datArr[4][1]);
            var EnglishMonth=null;
            switch (_date.getMonth() + 1){
                case 1:
                    EnglishMonth="Jan";
                    break;
                case 2:
                    EnglishMonth="Feb";
                    break;
                case 3:
                    EnglishMonth="Mar";
                    break;
                case 4:
                    EnglishMonth="Apr";
                    break;
                case 5:
                    EnglishMonth="May";
                    break;
                case 6:
                    EnglishMonth="Jun";
                    break;
                case 7:
                    EnglishMonth="Jul";
                    break;
                case 8:
                    EnglishMonth="Aug";
                    break;
                case 9:
                    EnglishMonth="Sep";
                    break;
                case 10:
                    EnglishMonth="Oct";
                    break;
                case 11:
                    EnglishMonth="Nov";
                    break;
                case 12:
                    EnglishMonth="Dec";
                    break;
            };
            $('.cb-attendanceCalendarTopMonth').text(EnglishMonth + " • " + _date.getFullYear());
            $('.showDate span').eq(0).text(_date.getFullYear() + "年");
            $('.showDate span').eq(1).text((_date.getMonth() + 1) + "月");
            mySwiper.update();
            mySwiper.slideTo(2, 0, false);
            mySwiper.enableTouchControl();
            /*console.log(jsonObj);
            for (key in jsonObj) {
            	if($('.' + key).children('.calendar-num').length){return}
                $('.' + key).append("<span class='calendar-num'>" + jsonObj[key] + "</span>")
            }*/
        }
    })
    var _date = new Date(datArr[2][0], datArr[2][1], datArr[2][2]);
    var EnglishMonth=null;
    switch (_date.getMonth() + 1){
        case 1:
            EnglishMonth="Jan";
            break;
        case 2:
            EnglishMonth="Feb";
            break;
        case 3:
            EnglishMonth="Mar";
            break;
        case 4:
            EnglishMonth="Apr";
            break;
        case 5:
            EnglishMonth="May";
            break;
        case 6:
            EnglishMonth="Jun";
            break;
        case 7:
            EnglishMonth="Jul";
            break;
        case 8:
            EnglishMonth="Aug";
            break;
        case 9:
            EnglishMonth="Sep";
            break;
        case 10:
            EnglishMonth="Oct";
            break;
        case 11:
            EnglishMonth="Nov";
            break;
        case 12:
            EnglishMonth="Dec";
            break;
    };
    $('.cb-attendanceCalendarTopMonth').text(EnglishMonth + " • " + _date.getFullYear());
    $('.showDate span').eq(1).text((_date.getMonth() + 1) + "月");
    mySwiper.slideTo(2, 0, false);
})