/**
 * @fileOverview date日历
 * @time 2016/6/20
 * @author pyp
 * */


module.exports = {
		CalendarHandler: {
			currentYear: 0,
			currentMonth: 0,
			initialize: function() {
				var $calendarItem = this.CreateCalendar(this.currentYear, this.currentMonth, 0);
				$(".months").append($calendarItem);
				this.CalculateLastMonthDays();
			},
			IsRuiYear: function(aDate) {
				return 0 == aDate % 4 && (aDate % 100 != 0 || aDate % 400 == 0);
			},
			CalculateWeek: function(y, m, d) {
				var arr = "7123456".split("");
				var vYear = parseInt(y, 10);
				var vMonth = parseInt(m, 10);
				var vDay = parseInt(d, 10);
				var week = arr[new Date(y, m - 1, vDay).getDay()];
				return week;
			},
			CalculateMonthDays: function(m, y) {
				var mDay = 0;
				if (m == 0 || m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
					mDay = 31;
				} else {
					if (m == 2) {
						//判断是否为芮年
						var isRn = this.IsRuiYear(y);
						if (isRn == true) {
							mDay = 29;
						} else {
							mDay = 28;
						}
					} else {
						mDay = 30;
					}
				}
				return mDay;
			},
			CreateCalendar: function(y, m, d) {
				//获取当前月份的天数
				var nowDate = new Date();
				var nowYear = y == 0 ? nowDate.getFullYear() : y;
				this.currentYear = nowYear;
				var nowMonth = m == 0 ? nowDate.getMonth() + 1 : m ;
				this.currentMonth = nowMonth;
				var nowDay = d == 0 ? nowDate.getDate() : d;
				var nowDaysNub = this.CalculateMonthDays(nowMonth, nowYear);
				var nowWeek = parseInt(this.CalculateWeek(nowYear, nowMonth, 1));

				//获取上个月的天数
				var lastMonthDaysNub = this.CalculateMonthDays(nowMonth - 1, nowYear);
				var $monthDiv = $('<div class="month"></div>');
				var $monthBox = $('<div class="month-box"></div>');
				var s = nowMonth < 10 ? '0'+ nowMonth : nowMonth;
				var $curTime = $('<p class="curTime">' + nowYear + "年" + s + '月</p>');
				var $dayList = $('<ul data-ym="' + nowYear + '-' + s + '" class="day-list"></ul>');

				if (nowWeek != 0) {
					//生成上月剩下的日期
					for (var i = (lastMonthDaysNub - (nowWeek - 1)); i <= lastMonthDaysNub; i++) {
						$dayList.append('<li></li>');
					}
				}

				//生成当月的日期
				var dy='';
				for (var i = 0; i < nowDaysNub; i++) {
					dy= (i+1)<10 ? '0'+(i+1) : (i+1);
					if(nowMonth == (nowDate.getMonth()+1) && nowDay <= i && nowYear >= nowDate.getFullYear()){
						$dayList.append('<li data-date="' + nowYear + '-' + s + '-' + dy + '" class="can-touch disabled"><span>' + (i + 1) + '</span></li>');
					}
					else if((nowMonth > (nowDate.getMonth()+1) && nowYear >= nowDate.getFullYear()) || y<2016 || (y==2016 && m<5) || (y==2016 && m==5 && i<11)){
						$dayList.append('<li data-date="' + nowYear + '-' + s + '-' + dy + '" class="can-touch disabled"><span>' + (i + 1) + '</span></li>');
					}else{
						$dayList.append('<li data-date="' + nowYear + '-' + s + '-' + dy + '" class="can-touch"><span>' + (i + 1) + '</span></li>');
					}
				}

				$monthDiv.append($curTime);
				$monthDiv.append($monthBox);
				$monthDiv.find('.month-box').append($dayList);
				return $monthDiv;
			},
			CalculateNextMonthDays: function() {
				var m = this.currentMonth == 12 ? 1 : this.currentMonth + 1;
				var y = this.currentMonth == 12 ? this.currentYear + 1 : this.currentYear;
				var d = 0;
				var nowDate = new Date();
				if (y == nowDate.getFullYear() && m == nowDate.getMonth() + 1) d = nowDate.getDate();else d = 1;
				var $calendarItem = this.CreateCalendar(y, m, d);
				$(".months").append($calendarItem);
			},
			CalculateLastMonthDays: function() {
				var nowDate = new Date();
				var m = this.currentMonth == 1 ? 12 : this.currentMonth - 1;
				var y = this.currentMonth == 1 ? this.currentYear - 1 : this.currentYear;
				var d = 0;
				if (y == nowDate.getFullYear() && m == nowDate.getMonth() + 1) d = nowDate.getDate();else d = 1;
				var $calendarItem = this.CreateCalendar(y, m, d);
				$(".months").prepend($calendarItem);
			}
		}
	};