/**
 * @fileOverview 影院
 * @time 2016/6/21
 * @author liugang
 * */

var ajax=require('ajax');
var event=require('event');
var chartData=require('chartData');
var dateChange=require('dateChange');
var dataListHtml=require('dataListHtml');
var getDate=require('getDate');
var search=require('search');
var bindEvent=require('bindEvent');
var ajaxError=require('ajaxError');
var ecllipseText=require('ecllipseText');
var reloadChart=require('reloadChart');
require('dataListFilter');
var yesterday;
var cinemaListArr=[];
var cinema={

    init(){
        //if(localStorage.cinemaCode){
        //    location.href=location.href.replace(/index/, 'movie');
        //    return;
        //};
        $('#js-title').html(localStorage.cinemaName);
        $('title').html(localStorage.cinemaName);
        dateChange.init((requestDate) => {
            $('#js-data-list .msg').remove();
            yesterday=requestDate[0];
            this.insert();
        });
        this.insert();
        event.on('.msg', function(){
            localStorage.cinemaCode=$(this).attr('data-code');
            localStorage.cinemaName=$(this).attr('data-name');
            location.href=`/bi/cinema/movie.html`;
        }, $('#js-data-list'));
        search(this.search, function(){
            $('#js-data-list ul').show();
        });
        bindEvent.init(this.callbackFunc);
        $('#js-filter-list .msg span:gt(1)').remove();
    },
    search(){
        var self = $('#js-search-input');
        var searchVal=self.val();
        var cinemaListObj=$('#js-data-list .msg');
        cinemaListArr.forEach((item, index) => {
            var selfCinemaObj=cinemaListObj.eq(index);
            selfCinemaObj.show();
            if(item.indexOf(searchVal)<0){
                selfCinemaObj.hide();
            }
        });
    },
    callbackFunc(option){
        yesterday = option.startdate;
        reloadChart.init(option);
        cinema.insert();
    },
    insert(){
        ajax.jsonp({
            url: '/reportProxyService/cinema/cinemaRecords',
            data: {
                cinemaCode: localStorage.cinemaCode,
                dateString: yesterday
            },
            success(result){
                if(result.success){
                    if(!result.code){
                        var data=result.data;
                        var cinemaArr=chartData.init([0,2,4,6,7,12,10], data, 'cinemas');
                        var listHtml='';
                        var classN='';
                        if(cinemaListArr.length) cinemaListArr=[];
                        var nA = $('#js-filter-ok a:last').attr('data-checked').split(',');
                        var newAn=[];
                        nA.forEach((item, index)=>{
                            item = Number(item);
                            newAn.push(item);
                        });
                        data.cinemas.forEach((item, index) => {
                            cinemaListArr.push(item.cinema_name);
                            listHtml+=`
                                <ul class="msg" data-name="${item.cinema_name}" data-code="${item.cinema_code}" data-type="${index}">
                                    <li class="c0"><span>${index+1}</span><b>${item.cinema_name}</b></li>
                                    ${dataListHtml(cinemaArr, cinemaArr.length, index, 1, newAn)}
                                    <li><span>1</span><b>${item.cinema_name}</b></li>
                                  </ul>
                                  `;
                        });
                        ajaxError(1,'js-data-list','',listHtml);
                        if(nA){
                            if(nA.length==1){
                                classN='one';
                            }else if(nA.length==2){
                                classN='two';
                            }else if(nA.length==3){
                                classN='three';
                            }
                        }
                        $('#js-data-list .msg').addClass(classN);
                        ecllipseText();
                        var jdc = $('#js-date-change');
                        jdc.attr('data-date',data.init_business_date);
                        jdc.find('span').html(data.init_business_date + '<em></em>');
                        yesterday = data.init_business_date;
                        cinema.search();
                    }else{
                        ajaxError();
                    }
                    
                }else{
                    ajaxError();
                }
            }
        })
    }

};

cinema.init();
