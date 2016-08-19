/**
 * @fileOverview 影片
 * @time 2016/6/17
 * @author liugang
 * */

var ajax=require('ajax');
var chart=require('chart');
var chartData=require('chartData');
var chartTooltip=require('chartTooltip');
var dateChange=require('dateChange');
var getDate=require('getDate');
var movieDataList=require('movieDataList');
var bindEvent=require('bindEvent');
var ajaxError=require('ajaxError');
var chartAxisSet=require('chartAxisSet');
var ecllipseText=require('ecllipseText');
var reloadChart=require('reloadChart');
require('dataListFilter');
var yesterday;
var movie={

    init(){
        var option={
            data: {
                cinemaCode: localStorage.cinemaCode,
                dateString: yesterday
            }
        };
        $('#js-title').html(localStorage.cinemaName);
        $('title').html(localStorage.cinemaName);
        dateChange.init((requestDate) => {
            yesterday=requestDate[0];
            $('#js-movie-chart').html('');
            $('#js-data-list .msg').remove();
            this.ajaxFunc(option);

        });
        this.ajaxFunc(option);
        bindEvent.init(this.callbackFunc);
    },
    callbackFunc(option){
        yesterday = option.startdate;
        reloadChart.init(option);
        movie.ajaxFunc();
    },
    ajaxFunc(option){
        var self = this;
        ajax.jsonp({
            url: '/reportProxyService/movie/moviesRecords',
            data: {
                cinemaCode: localStorage.cinemaCode,
                dateString: yesterday
            },
            success(result){
                if(result.success){
                    if(!result.code){
                        ajaxError(1);
                        var jdc = $('#js-date-change');
                        jdc.attr('data-date',result.data.init_business_date);
                        jdc.find('span').html(result.data.init_business_date + '<em></em>');
                        yesterday = result.data.init_business_date;
                        self.chartSuccessFunc(result);
                        self.insertDateList(result);
                        ecllipseText();
                    }else{
                        ajaxError();
                    }
                }else{
                    ajaxError();
                }
            }
        });
    },
    insertDateList(result){
        movieDataList.init(result);
    },
    chartSuccessFunc(result){
        var movieNameArr=[];
        var smovieName=[];
        var data=result.data;
        var movieChart=chartData.init([1, 3, 11], data, 'movies', 0);
        movieChart.forEach((item, index) => {
            movieChart[index]=item.slice(0, 5)
        });
        data.movies.forEach((item, index) => {
            if(index>=5) return false;
            var newObj = {};
            newObj.value = item.movie_name.substring(0,2)+'.';
            newObj.textStyle = {
                fontSize: 10
            };
            smovieName.push(item.movie_name);
            movieNameArr.push(newObj);
        });
        chart.init($('#js-movie-chart')[0]).setOption({
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: (params) => {
                    params[0].titleNameArr = smovieName;
                    return chartTooltip(params);
                },
                textStyle: {
                    fontSize: 10
                }
            },
            animation: false,
            textStyle: { fontSize:10},
            color: ['#e52c3c','#f7b1ab','#a9d8fa'],
            legend: {
                selectedMode: false,
                top: '-2%',
                itemWidth: 12,
                itemHeight: 12,
                data:['票房占比','场次占比','排座占比']
            },
            grid: {
                left: '3%',
                right: '4%',
                top: '24%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : {
                    type : 'category',
                    data : movieNameArr,
                    splitLine: chartAxisSet.x.splitLine
                },
            yAxis :{
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %',
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    splitArea: chartAxisSet.y.splitArea
            },
            series : [
                {
                    name:'票房占比',
                    type:'bar',
                    stack: '票房占比',
                    data: movieChart[0]
                },
                {
                    name:'场次占比',
                    type:'bar',
                    stack: '场次占比',
                    data: movieChart[1]
                },
                {
                    name:'排座占比',
                    type:'bar',
                    stack: '排座占比',
                    data: movieChart[2]
                }
            ]
        })
    }
};
movie.init();
