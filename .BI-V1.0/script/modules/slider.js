/**
 * @fileOverview slider日历上下滑动添加日期
 * @time 2016/6/21
 * @author pyp
 * */

var date = require('date');
var calder =  date.CalendarHandler;
 module.exports = {
 	slider: {
		touch:('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
	    events:{
	        handleEvent:function(event){
	            var self = this;
	            this.slider = document.querySelector('#pop-calendar-box');
	            if(event.type == 'touchstart'){
	                self.start(event);
	            }else if(event.type == 'touchmove'){
	            	self.move(event);
	            }else if(event.type == 'touchend'){
	                self.end(event);
	            }
	        },
	        start:function(event){
	            var touch = event.targetTouches[0];   
	            this.slider.startPos = {x:touch.pageX,y:touch.pageY,time:+new Date()};
	            this.slider.isScrolling = 0; 
	            this.slider.addEventListener('touchmove',this.move,false);
	            this.slider.addEventListener('touchend',this.end,false);
	        },
	        move:function(event){
	            if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;
	            var touch = event.targetTouches[0];
	            this.endPos = {x:touch.pageX - this.startPos.x,y:touch.pageY - this.startPos.y};
	            this.isScrolling = Math.abs(this.endPos.x) < Math.abs(this.endPos.y) ? 1:0;    //isScrolling为1时，表示纵向滑动，0为横向滑动
	        },
	        end:function(event){
	            var duration = +new Date;
	            if(this.isScrolling === 1){    
	                if(Number(duration) > 10){   
	                    var year =  this.endPos.y > 0 ? document.querySelectorAll('.month')[0].querySelectorAll('ul')[0].getAttribute('data-ym') : document.querySelectorAll('.month')[document.querySelectorAll('.month').length-1].querySelectorAll('ul')[0].getAttribute('data-ym');
	                    var newArray = year.split('-');
	                    calder.currentYear = parseInt(newArray[0]);
	                    calder.currentMonth = parseInt(newArray[1]);
	                    if(this.endPos.y > 10 && this.scrollTop < document.querySelectorAll('.month')[0].offsetHeight){
	                        calder.CalculateLastMonthDays();
	                        var ch = document.querySelectorAll('.month')[0].offsetHeight;
							this.scrollTop += ch;
	                    }

	                    if(this.endPos.y < -10 && this.scrollTop + this.offsetHeight + document.querySelectorAll('.month')[0].offsetHeight > document.querySelectorAll('.months')[0].offsetHeight){
	                    	if(calder.currentYear < new Date().getFullYear()){
	                    		calder.CalculateNextMonthDays();
	                    	}

	                    	if(calder.currentYear == new Date().getFullYear() && calder.currentMonth < (new Date().getMonth()+2) ){
	                    		calder.CalculateNextMonthDays();
	                    	}
	                    }
	                }
	            }
	            this.removeEventListener('touchmove',this.move,false);
	            this.removeEventListener('touchend',this.end,false);
	        }
	    },
	    init:function(b){
	        var self = document.getElementById(b);
	        if(!!this.touch){
	        	self.addEventListener('touchstart',this.events,false); 
	        }
	    }
	}
 }