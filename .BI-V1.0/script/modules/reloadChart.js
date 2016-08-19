/**
 * @fileOverview 重载图标
 * @time 2016/6/17
 * @author liugang
 * */
var formatDate = require('formatDate');
 module.exports={
 	init(option, num){
	 	var c,d,step;
	 	if(num){
	 		c = option.startdate+','+ option.enddate;
	 		d = option.startdate+'-'+option.enddate;
	 		step=this.validateDate(option.enddate, new Date().getTime(), 7);
	 	}else{
	 		c = option.startdate;
	 		d = option.startdate;
	 		step=this.validateDate(option.startdate,new Date().getTime(), 1);
	 	}
	 	var yesterday = new Date().getTime()-86400000;
	 	var jdc = $('#js-date-change');
	    jdc.attr('data-date', c);
	    jdc.find('span').html(d + '<em></em>');
	    if(option.enddate != formatDate(yesterday)){
	    	if(step) {jdc.find('.next').removeClass('disabled');}
	    	else{
	    		jdc.find('.next').addClass('disabled');
	    	}
	    }else{
	    	jdc.find('.next').addClass('disabled');
	    }
	},
	validateDate(startDate,endDate, n){
        var startTime = (new Date(startDate)).getTime();
        var endTime = endDate;
        if(parseInt(Math.abs(startTime - endTime ) / 1000 / 60 / 60 /24)>=n){
            return 1;
        }
        return 0;
    }
}