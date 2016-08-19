/**
 * @fileOverview 日期前后切换
 * @time 2016/6/17
 * @author liugang
 * */

var event=require('event');
var getDate=require('getDate');
var formatDate=require('formatDate');
module.exports={

    init(callback, weekBool=false){

        var self=this;
        var dateObj=$('#js-date-change');
        var returnDate;
        var weekStartEnd=getDate.weekStartEnd(new Date());

        var dateValue=weekBool?(`${weekStartEnd.startDate},${weekStartEnd.yesterday}`):(weekStartEnd.yesterday);
        dateObj.attr('data-date', dateValue).find('span').html(dateValue.replace(/,/g, '-')+'<em></em>');
        if(weekStartEnd.startDate > weekStartEnd.yesterday){
            changeDate(dateObj.find('a.prev')[0],1);
        }
        function changeDate(o,m){
            var self=$(o);
            var clickObj=self.parent().find('a');
            var dateArr=dateObj.attr('data-date').split(',');
            var startDate=new Date(dateArr[0].replace(/-/g,'/'));
            var week=dateArr.length>1?true:false;
            var dateStep=week?8:0;
            var showDate;
            var index=self.index();
            if(self.attr('class').indexOf('disabled')>0) return;
            if(index>0){
                if(week){
                    var startDates=new Date(dateArr[1].replace(/-/g, '/'));
                    if(startDates.getDay() == 6){
                        startDate=new Date(startDates.getTime()-86400000);
                    }else{
                        if(startDates.getDay() == 1 || startDates.getDay() == 2){
                            startDate=startDates;
                        }else{
                            startDate=new Date(startDates.getTime()-(6-startDates.getDay())*86400000);
                        }
                    }
                }
                returnDate=getDate.weekStartEnd(new Date(getDate.today(startDate.getTime()+(86400000*dateStep)).replace(/-/g, '/')));
                if(!returnDate.dateNext){
                    clickObj.last().addClass('disabled');
                };
                if(week){
                    showDate=`${returnDate.startDate},${returnDate.endDate}`;
                }else{
                    if(getDate.weekStartEnd(new Date()).yesterday>returnDate.tomorrow){
                        clickObj.last().removeClass('disabled');
                    };
                    showDate=`${returnDate.tomorrow}`;
                }
            }else{
                if(!m || !week){
                    clickObj.last().removeClass('disabled');
                }
                returnDate=getDate.weekStartEnd(new Date(getDate.today(startDate.getTime()-(86400000*dateStep)).replace(/-/g, '/')));
                if(week){
                    showDate=`${returnDate.startDate},${returnDate.endDate}`;
                }else{
                    showDate=`${returnDate.yesterday}`;
                }
            };
            dateObj.attr('data-date', showDate);
            if(week && returnDate.endDate == formatDate(new Date().getTime()-86400000)){
                clickObj.last().addClass('disabled');
            }
            
            dateObj.find('span').html(showDate.replace(/,/, '-')+'<em></em>');
            if(callback && !m){
                callback(showDate.split(','));
            };
        }
        event.on('a', function(){
            changeDate(this);
        }, dateObj);
    }
};