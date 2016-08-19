/**
 * @fileOverview 数据列表展现
 * @time 2016/6/17
 * @author liugang
 * */

var ajax=require('ajax');
var event=require('event');
var chart=require('chart');
var chartData=require('chartData');
var dataListHtml=require('dataListHtml');
require('dataListFilter');

module.exports={

    init(result){

        this.insert(result);
        event.on('.msg', function(){
            if(location.href.indexOf('movieDetail')>=0) return false;
            var movieCode=$(this).attr('data-code');
            var movieName=$(this).attr('data-name');
            localStorage.movieCode=movieCode;
            localStorage.movieName=movieName;
            if(movieCode){
                location.href=`/bi/movie/movieDetail.html`;
            };
        }, $('#js-data-list'));
    },

    insert(result){

        var headerTitle=$('#js-title');
        if(/Detail/.test(location.pathname)){
            $('#js-data-list .header li:first').html('日期');
            headerTitle.html(localStorage.movieName);
        }else{
            if(localStorage.cinemaName == '全部影院'){
                headerTitle.html('影片');
            }
        };
        this.successFunc(result);
    },

    successFunc(result){
        var data=result.data;
        var movieArr=chartData.init([0, 1, 2, 3, 4, 5, 6, 7, 10, 11, 8, 9, 13], data);
        var listHtml='', classN='', nA='', newAn=[];
        data.movies.forEach((item, i) => {

            var index=(i+1);
            var movie_name=item.movie_name;
            var movie_code=item.movie_code;

            //如果是影片详情则重置变量
            if(/Detail/.test(location.pathname)){
                movie_name=item.business_date;
                movie_code='';
                index='';
            };
            nA = $('#js-filter-ok a:last').attr('data-checked').split(',');
            
            nA.forEach((item, index)=>{
                item = Number(item);
                newAn.push(item);
            }) 
            listHtml+=`
                <ul class="msg" data-name="${movie_name}" data-code="${movie_code}" data-type="${i}">
                    <li class="c0"><span>${index}</span><b>${movie_name}</b></li>
                    ${dataListHtml(movieArr, movieArr.length, i, '0' , newAn)}
                    <li><span>1</span><b>${movie_name}</b></li>
                  </ul>
                  `;
        });
        $('#js-data-list .msg').remove();
        $('#js-data-list').append(listHtml);
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
    }
};