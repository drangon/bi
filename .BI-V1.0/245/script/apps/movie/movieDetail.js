/**
 * @fileOverview 影片详情
 * @time 2016/6/21
 * @author liugang
 * */

var ajax=require('ajax');
var chart=require('chart');
var dateChange=require('dateChange');
var getDate=require('getDate');
var movieDataList=require('movieDataList');
var chartData=require('chartData');
var chartTooltip=require('chartTooltip');
var bindEvent=require('bindEvent');
var ajaxError=require('ajaxError');
var chartAxisSet=require('chartAxisSet');
var ecllipseText=require('ecllipseText');
var reloadChart=require('reloadChart');
require('dataListFilter');
var weekStartEnd = getDate.weekStartEnd(new Date());
var startDate;
var endDate;
var toppos='25%';
var uap = navigator.userAgent.toLowerCase().indexOf('iphone');
if(uap >=0 && window.innerHeight <= 568){
    toppos='40%';
}
var movieDetail={

    init(){
        $('#js-title').html(localStorage.movieName);
        $('title').html(localStorage.movieName);
        dateChange.init((requestDate) => {
            $('#js-ticket-chart').html('');
            $('#js-data-list .msg').remove();
            startDate=requestDate[0];
            endDate=requestDate[1];
            this.ajaxFunc();
        }, true);
        this.ajaxFunc();
        bindEvent.init(this.callbackFunc);
    },
    callbackFunc(option){
        startDate = option.startdate;
        endDate = option.enddate;
        reloadChart.init(option, 1);
        movieDetail.ajaxFunc();
    },
    ajaxFunc(){
        var self = this;
        ajax.jsonp({
            url: '/reportProxyService/movie/daysmoviesRecords',
            data: {
                cinemaCode: localStorage.cinemaCode,
                movieCode: localStorage.movieCode,
                startdate: startDate,
                enddate: endDate
            },
            success(result){
                if(result.success){
                    if(!result.code){
                        ajaxError(1);
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
        var data=result.data;
        var movieArr=data.movies;

        var chartDataArr=chartData.init([0,2,4,6,7,8,9,13,10], data, 'movies', 0);
        var movieDetailChart=chart.init($('#js-movie-chart')[0]);
        var chartLegend=['票房收入',  '场次', '人次',  '场均人次', '上座率', '票房效能', '排片效率', '排座效率', '单座产值'];
        var chartSeries=[];
        var xAxis=[];
        movieArr.forEach((item) => {
            var newObj = {};
            newObj.value = item.business_date.replace(/\d{4}-/, '')+'  ';
            newObj.textStyle = {
                fontSize: 10
            };
            xAxis.push(newObj);
        });
        chartLegend.forEach((item, index) => {
            chartSeries.push({
                name: item,
                type: 'line',
                data: chartDataArr[index]
            })
        });

        movieDetailChart.setOption({
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    return chartTooltip(params);
                },
                textStyle: {
                    fontSize: 10
                }
            },
            animation: false,
            textStyle: { fontSize:10},
            legend: {
                left: '-1%',
                data: chartLegend
            },
            color:['#07bdbf','#638cf5','#ff78ab','#9674ce','#66ddb4','#ff8400','#c8e785','#68696a','#c5a702'],
            grid: {
                left: '3%',
                right: '4%',
                top: toppos,
                bottom: '0%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: chartAxisSet.x.splitLine,
                data: xAxis
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    textStyle: {
                        fontSize: 10
                    }
                },
                splitArea: chartAxisSet.y.splitArea
            },
            series: chartSeries
        })
    }

};
movieDetail.init();