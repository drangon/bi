/**
 * @fileOverview 回调callback日历
 * @time 2016/6/21
 * @author pyp
 * */

var events = require('event');
var slider = require('slider');
var dateVertify = require('calendar');
var errorBox = require('errorBox');

 module.exports = {
 	init(callback){
 		var _that = this;
 		events.on('span',function(){
            _that.showCalendar(this, '日期筛选',callback);
            $('canvas').parent().next().hide();
        },$('#js-date-change'));
 	},
 	showCalendar(o, title, callback){
 		var _this = this;
 		var parent = $(o).parent();
        var startEndDate = parent.attr('data-date');
        var start,end;
        if(!startEndDate) return;
        if(startEndDate.indexOf(',')){
            start = startEndDate.split(',')[0];
            end = startEndDate.split(',')[1];
        }else{
            start = startEndDate;
        }
        
        //初始化月份显示当月以及上下各一个月份
        var calendar = new dateVertify();
        calendar.popHtml(title, start);
        
        //改变时间格式
        if(start){
            calendar.clickFunc('', start, end);
        }
        //上下拖动月份显示
        if($('#pop-calendar-box').size()){
            var nowDate = new Date();
            var nowYear = nowDate.getFullYear();
            var nowMonth = (nowDate.getMonth() + 1) > 10 ? (nowDate.getMonth() + 1) : '0'+ (nowDate.getMonth() + 1);
            var nowDates = nowDate.getDate() > 10 ? nowDate.getDate() : '0'+nowDate.getDate();
            var dates = nowYear + '-' + nowMonth + '-' + nowDates;
            $('#pop-calendar-box li').each(function(i){
                if($(this).attr('data-date') ==  dates){
                    $(this).addClass('active');
                }
            })
            slider.slider.init('pop-calendar-box');
        }
        
        //初始日历日期选择
        events.on('.can-touch:not(".disabled")',function(){calendar.clickFunc(this)}, $('.months'));
        events.on('.btn',function(){ _this.getDates(this,callback)}, $('#pop-calendar-box'));
        events.on('.close',function(){$(this).parents('#pop-calendar-box').remove();$('body').css('overflow','visible');}, $('#pop-calendar-box'));
 	},
 	getDates(o,callbackFunc){
 		var self = $(o);
        var dateArea = {};
        var startDate = self.parent().find('.months').attr('data-date');
        if(!startDate) {
            errorBox('请选择日期');
            return;
        }
        dateArea.startdate = startDate;
        if(self.parent().find('.months').attr('data-date-end')){
            var endDate = self.parent().find('.months').attr('data-date-end');
            dateArea.enddate = endDate;
        }else{
        	dateArea.enddate = startDate;
        }
        $('#pop-calendar-box').remove();
        $('body').css('overflow','visible');
        callbackFunc(dateArea);
 	}
 }
