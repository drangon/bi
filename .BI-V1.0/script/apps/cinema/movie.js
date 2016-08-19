/**
 * @fileOverview 影院排片
 * @time 2016/6/22
 * @author liugang
 * */

var ajax=require('ajax');
var event=require('event');
var chartData=require('chartData');
var getDate=require('getDate');
var dateChange=require('dateChange');
var dataListHtml=require('dataListHtml');
var bindEvent=require('bindEvent');
var ajaxError=require('ajaxError');
var ecllipseText=require('ecllipseText');
var reloadChart=require('reloadChart');
require('dataListFilter');
var yesterday;
var nFlag=1;

var cinemaMovie={

    init(){
        $('#js-title').html(localStorage.cinemaName);
        $('title').html(localStorage.cinemaName);
        
        dateChange.init((requestDate) => {
            $('#js-data-list .msg').remove();
            yesterday=requestDate[0];
            this.insert();
        });
        this.insert();
        bindEvent.init(this.callbackFunc);
    },
    callbackFunc(option){
        yesterday = option.startdate;
        reloadChart.init(option);
        cinemaMovie.insert();
    },
    reshowHtml(){
        var spanOs=$('#js-filter-list .list span');
        var checkedArr=$('#js-filter-ok').find('a:last').attr('data-checked').split(',');
        spanOs.removeClass('active');
        checkedArr.forEach((k,index) =>{
            spanOs.eq(k-1).addClass('active');
        });
        $('#js-data-list li').removeClass().hide();
        checkedArr.forEach((item, index) => {
            var ulObj=$('#js-data-list ul');
            ulObj.removeClass('one two three');
            ulObj.each(function(i){
                var liObj=$(this).find('li');
                var liFilterObj=liObj.filter('[data-type='+item+']');
                switch(checkedArr.length){
                    case 1:
                        $(this).addClass('one');
                        break;
                    case 2:
                        $(this).addClass('two');
                        break;
                    case 3:
                        $(this).addClass('three');
                        break;
                };
                if(i>0){
                    liObj.last().show();
                };
                liObj.eq(0).addClass('c0').show();
                liFilterObj.show().addClass('c'+(index+1));
            });
        });
    },
    insert(){

        ajax.jsonp({
            url: '/reportProxyService/cinema/moviebymovie',
            data: {
                cinemaCode: localStorage.cinemaCode,
                dateString: yesterday
            },
            success(result){
                if(result.success){
                    if(!result.code){
                        var data=result.data;
                        var cinemaArr=chartData.init([0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 8, 9, 13], data, 'cinemas');
                        var listHtml='';
                        var nA=[];
                        var newAn=[];
                        if(nFlag){
                            nA=['2','4','6','8'];
                            $('#js-filter-ok a:last').attr('data-checked',nA.join(','));
                            nFlag=0;
                        }else{
                            nA = $('#js-filter-ok a:last').attr('data-checked').split(',');
                        }
                        nA.forEach((item, index)=>{
                            item = Number(item);
                            newAn.push(item);
                        });
                        data.cinemas.forEach((item, index) => {
                            listHtml+=`
                                <ul class="msg" data-type="${index}">
                                    <li class="c0"><span>${index+1}</span><b>${item.movie_name}</b></li>
                                    ${dataListHtml(cinemaArr, cinemaArr.length, index, '0', newAn)}
                                    <li><span>1</span><b>${item.movie_name}</b></li>
                                  </ul>
                                  `;
                        });
                        ajaxError(1,'js-data-list','',listHtml);
                        cinemaMovie.reshowHtml();
                        ecllipseText();
                        var jdc = $('#js-date-change');
                        jdc.attr('data-date',data.init_business_date);
                        jdc.find('span').html(data.init_business_date + '<em></em>');
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
cinemaMovie.init();
