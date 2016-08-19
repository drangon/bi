/**
 * @fileOverview calendar.js日历
 * @time 2016/6/21
 * @author pyp
 * */

var date=require('date');
var errorBox = require('errorBox');
function dateVertify(){};

dateVertify.prototype = {
	constructor: dateVertify,
	validateDate: function(startDate,endDate){
		var startTime = (new Date(startDate)).getTime();
	    var endTime = (new Date(endDate)).getTime();
	    if(parseInt(Math.abs(startTime - endTime ) / 1000 / 60 / 60 /24)>=30){
	        return 1;
	    }
	    return 0;
	},
	validateYear: function(startYear, endYear){
		if(startYear == endYear){
			return 1;
		}
		return 0;
	},
	initDate: function(a){
		var de = date.CalendarHandler;
		if(a){
			de.currentYear = a.split('-')[0];
			de.currentMonth = a.split('-')[1].replace(/^0/,'');
		};
		de.initialize();
		if(de.currentMonth>10){
			de.currentMonth=12-de.currentMonth+1;
			de.currentYear+=1;
			de.CalculateNextMonthDays();
		}
		else{
			de.currentMonth+=1;
			de.CalculateNextMonthDays();
		};
		var ch = document.querySelectorAll('.month')[0].offsetHeight;
		document.querySelector('#pop-calendar-box').scrollTop = ch;
	},
	addCurClass: function(o){
		if(o.hasClass('active-current')){
			o.removeClass('active-end active-item').addClass('item');
		}
	},
	removeParams: function(parent){
		var siblings = parent.find('.item');
		siblings.removeClass().addClass('can-touch');
		parent.attr({'data-date':'','data-ym':'','data-date-end':''});
		parent.find('.day-list').attr({'data-index':'','data-date':''});
	},
		clickFunc: function(o, startDe, endDe){
		var _that = this;
		var curO,snum;
		var nowYear = new Date().getFullYear();
		var nowMonth = (new Date().getMonth() + 1) < 10 ? '0'+ (new Date().getMonth() + 1) : (new Date().getMonth() + 1);
		var nowDay = new Date().getDate() < 10 ? '0'+ new Date().getDate() : new Date().getDate();
		var newStrD = nowYear + '-' + nowMonth + '-' + nowDay;
		if(startDe){
			$('.month').each(function(i){
				var _this = $(this);
				_this.find('li').each(function(j){
					var _self = $(this);
					if(_self.attr('data-date') == startDe){
						_self.parent().attr('data-index', j);
						curO = _self;
						_self.parents('.months').attr({'data-date':startDe,'data-ym':_self.parent().attr('data-ym')});
					};
					if(endDe && newStrD >= endDe){
						if(_self.attr('data-date') == endDe){
							snum = j;
							curO = _self;
							if(_that.isGetStartEnd(startDe,endDe)){
								_self.parent().attr('data-index', j);
							}
							_self.parents('.months').attr('data-date-end',endDe);
						}
					}
				})
			})
		};

		var self = o ? $(o) : curO,
			parent = self.parent(),
			parentsMonths = self.parents('.months'),
			dix = parent.attr('data-index'),
			dataYm = parent.attr('data-ym'),
			curDate = self.attr('data-date'),
			parentDate = parentsMonths.attr('data-date'),
			parentYm = parentsMonths.attr('data-ym'),
			ix = o ? self.index() : snum;
		
		var flag = $('#js-date-change').attr('data-date').indexOf(',') >= 0 ? 1: 0;
		if(flag && newStrD >= dataYm){
			if(curDate && parentDate && _that.validateDate(parentDate, curDate)){
				errorBox('区间段不能大于30天')
				return ;
			}
			if(!parentYm || (parentYm && dataYm && _that.validateYear(parentYm, dataYm))){
				var isItem = self.hasClass('item');
				if(isItem && o){
					_that.removeParams(parentsMonths);
					return;
				};
				
				if(!isItem && ix < dix && dix) return;
				//时间只能往后选择
				if(ix > dix && dix){
					parent.find('li').each(function(i){
						var _this = $(this);
						if(i == dix){
							if((i+1)%7 != 0){
								_this.removeClass('active-right-circle active-end').addClass('active-start active-item');
							}
							_this.addClass('active-circle item');
						}
						_that.addCurClass(_this);
						if(i == ix){
							if((i+1)%7 != 1){
								if(!o){
									_this.addClass('active-end active-circle item');
								}else{

									_this.addClass('active-end item');
								}
							}else{
								if(!o){
									_this.addClass('active-circle item');
								}else{
									_this.addClass('item');
								}
							}
							_this.addClass('active-current');
						}
						if(i > dix && i < ix){
							_this.addClass('active-item item');
							if((i+1)%7 == 0){
								_this.addClass('active-right-circle active-end');
							}
							if((i+1)%7 == 1){
								_this.addClass('active-right-circle active-start');
							}
						}
					})
				};
			}
			else{
				if(parentYm > dataYm && !self.hasClass('item')){
					return;
				};
				var isItem = self.hasClass('item');
				if(isItem && o){
					_that.removeParams(parentsMonths);
					return;
				};
				//上月份选择天数添加效果
				var liList = parent.parents('.month').prev().find('li');

				liList.each(function(i){
					var _this = $(this);
					var parentIndex = _this.parent().attr('data-index');
					var curObj = parent.parents('.month').prev().find('li');

					if(i == parentIndex && (parseInt(parentIndex)+1) != liList.length){
						curObj.eq(i).addClass('active-start active-circle item');
					}
					if(i == parentIndex && (parseInt(parentIndex)+1)%7 == 0){
						curObj.eq(i).removeClass('active-start').addClass('active-circle');
					}
					if(i > parentIndex){
						_this.removeClass('active-circle active-end').addClass('active-item item');
						if((i+1)%7 == 0 || (parseInt(i)+1) == liList.length){
							curObj.eq(i).addClass('active-right-circle active-end');
						}
						if((i+1)%7 == 1){
							curObj.eq(i).addClass('active-right-circle active-start');
						}
					}
				});
				//点击本月选择天数添加效果
				parent.find('li').each(function(i){
					var that = $(this);

					if(i == ix && self.find('span').text() != 1){
						that.addClass('active-end item');
					};
					if(i == ix && self.find('span').text() != 1 && (ix+1)%7 == 1){
						that.removeClass('active-end').addClass('item');
					};
					if(i == ix && self.find('span').text() == 1){
						that.addClass('item');
					};
					_that.addCurClass(that);
					if(i < ix && that.hasClass('can-touch')){
						that.addClass('active-item item');
						if((i+1)%7 == 0){
							if(that.find('span').text() == 1){
								that.removeClass('active-item active-circle active-start').addClass('active-right-circle item');
							}else{
								that.addClass('active-right-circle active-end');
							}
						}
						if((i+1)%7 == 1){
							that.addClass('active-right-circle active-start');
						}
						parent.find('li.can-touch').eq(0).addClass('active-right-circle active-start');
					};
				});
				if(parent.find('li.can-touch').eq(0).find('span').text() == 1){
					if(parent.find('li.can-touch').eq(0).index() == 6){
						parent.find('li.can-touch').eq(0).removeClass('active-end active-start active-item');
					}
				}
			}
			if(!parent.attr('data-index')){
				parent.attr('data-index',ix);
			}
			if(!parentsMonths.attr('data-date')){
				parentsMonths.attr('data-date',curDate);
			}
			if(o){
				parentsMonths.attr('data-date-end',self.attr('data-date'));
			}
			if(!parentsMonths.attr('data-ym')){
				parentsMonths.attr('data-ym',dataYm);
			}
			parentsMonths.find('li').removeClass('active-current');
			self.addClass('active-current');
			if(!o){
				if(!self.hasClass('active-circle')){
					self.addClass('active-circle item');
				}
				else{
					self.removeClass('active-item');
				};
			}else{
				if(!self.hasClass('active-circle')){
					self.addClass('active-circle item');
				}
				else{
					self.removeClass('active-circle item');
				};
			}
		}else{
			parentsMonths.attr('data-date',curDate);
			if(!self.hasClass('active-circle')){
				self.addClass('active-circle item').siblings().removeClass('active-circle item')
				.parents('.month').siblings().find('li.item').removeClass('active-circle item');
			}
			else{
				if(o){
					self.removeClass('active-circle item');
					self.parents('.months').attr({'data-date':'','data-date-end':''});
				}
			};
		};
	},

	isGetStartEnd: function(startD,endD){
		var a=startD, b=endD;
		if(b>a){
			var cs = a.split('-'),
			ds = b.split('-'),
			c = cs[0]+cs[1],
			d = ds[0]+ds[1];
			if(d > c){//跨月
				return 1;
			}
			return 0;
		}else{
			return 0;
		}
	},
	setWeekDay: function(){
		var day = ['日','一','二','三','四','五','六'];
		var str ='<ul class="calendar-title">';
		for(var i = 0; i < day.length; i++){
			if(i==0){
				str += '<li class="d-weekday">'+ day[i] +'</li>';
			}else if(i==6){
				str += '<li class="d-weekday">'+ day[i] +'</li>';
			}
			else{
				str += '<li>'+ day[i] +'</li>';
			}
		}
		str += "</ul>";
		$('#calendar-box').prepend(str);
	},
	popHtml: function(txt, start){
		var shtml = '';
			shtml += '<div id="pop-calendar-box" class="pop-calendar"><header><a class="close"></a><span>'+ txt +'</span></header><div id="calendar-box" class="calendar-wrap"><div class="calendar"><div class="months"></div></div></div><div class="btn btn-c-white all-search"><a href="javascript:void(0);" id="sureBtn">确认</a></div>';
			shtml += '</div>';
			$('body').append(shtml);
			$('#pop-calendar-box').show();
			$('body').css('overflow','hidden');
			this.setWeekDay();
			this.initDate(start);
	}
}

module.exports = dateVertify;
