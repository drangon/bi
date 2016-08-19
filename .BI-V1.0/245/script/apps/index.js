/**
 * @fileOverview 首页
 * @time 2016/6/16
 * @author liugang
 * */

var ajax=require('ajax');
var getDate=require('getDate');
var dateChange=require('dateChange');
var chart=require('chart');
var chartData=require('chartData');
var chartTooltip=require('chartTooltip');
var bindEvent=require('bindEvent');
var errorDataHtml=require('errorDataHtml');
var chartAxisSet=require('chartAxisSet');
var reloadChart=require('reloadChart');
var weekStartEnd = getDate.weekStartEnd(new Date());
var startDate;
var endDate;
var index= {

    init(){
        var _that = this;
        $('title').html(localStorage.cinemaName);
        $('#js-title').html(localStorage.cinemaName);
        dateChange.init((requestDate) => {
            $('#js-ticket-chart').html('');
            startDate=requestDate[0];
            endDate=requestDate[1];
            this.ticketChart();
        }, true);
        this.boxOffice();
        this.ticketChart();
        bindEvent.init(_that.callbackFunc);
    },
    callbackFunc(option){
        startDate = option.startdate;
        endDate = option.enddate;
        reloadChart.init(option, 1);
        index.ticketChart();
    },
    //票房收入
    boxOffice(){

        ajax.jsonp({
            url: '/reportProxyService/statist/sellRecords',
            data: {cinemaCode: localStorage.cinemaCode},
            success(result){
                var data=result.data;
                var seatRatio=parseFloat(data.show_sold_num/data.hall_seats_avl);
                $('#js-page-date em').html(data.business_date);
                if(result.code){
                    $('#js-income-msg').parent().html(errorDataHtml(1));
                    return;
                };
                
                $('#js-ticket').parent().html(`
                    <i id="js-ticket">${data.ticket_income >10000?(parseFloat(data.ticket_income/10000).toFixed(2)+'</i> <em>万') : data.ticket_income+'</i><em>'}元</em>
                `);
                $('#js-income-msg').html(`
                    <span><b>${data.normal_show_num >10000?(parseFloat(data.normal_show_num/10000).toFixed(2)+'</b>万'):data.normal_show_num+'</b>'} 场次</span>
                    <span><b>${data.show_sold_num >10000?(parseFloat(data.show_sold_num/10000).toFixed(2)+'</b>万'):data.show_sold_num+'</b>'} 人次</span>
                    <span><b>${(seatRatio*100).toFixed(2)}</b>% 上座率</span>
                `);
            }
        });
    },

    //票房走势
    ticketChart(){
        ajax.jsonp({
            url: '/reportProxyService/statist/daysellRecord',
            data: {
                startdate: startDate,
                cinemaCode: localStorage.cinemaCode,
                enddate: endDate
            },
            success(result){
                var jtc = $('#js-ticket-chart'); 
                if(result.success){
                    if(!result.code){
                        jtc.html('');
                        var data=result.data;
                        var ticketChart=chart.init($('#js-ticket-chart')[0]);
                        var xAxis=[];
                        var chartDataArr=chartData.init([0, 2, 4, 6, 7, 12, 10], data, null, 0);
                        data.forEach((item) => {
                            xAxis.push(item.business_date.replace(/\d{4}-/, '')+'  ');
                        });
                        ticketChart.setOption({
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
                            textStyle: {
                                fontSize: 10
                            },
                            legend: {
                                left: '-1%',
                                data: ['票房收入',  '场次', '人次', '场均人次', '上座率', '平均票价', '单座产值']
                            },
                            color: ['#07bdbf','#638cf5','#ff78ab','#9674ce','#66ddb4','#ffc64c','#68696a'],
                            grid: {
                                left: '3%',
                                right: '4%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                axisLabel: {
                                    textStyle: {
                                        fontSize: 10
                                    }
                                },
                                data: xAxis,
                                splitLine: chartAxisSet.x.splitLine
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
                            series: [
                                {
                                    name: '票房收入',
                                    type: 'line',
                                    data: chartDataArr[0]
                                },
                                {
                                    name: '场次',
                                    type: 'line',
                                    data: chartDataArr[1]
                                },
                                {
                                    name: '人次',
                                    type: 'line',
                                    data: chartDataArr[2]
                                },
                                {
                                    name: '场均人次',
                                    type: 'line',
                                    data: chartDataArr[3]
                                },
                                {
                                    name: '上座率',
                                    type: 'line',
                                    data: chartDataArr[4]
                                },
                                {
                                    name: '平均票价',
                                    type: 'line',
                                    data: chartDataArr[5]
                                },
                                {
                                    name: '单座产值',
                                    type: 'line',
                                    data: chartDataArr[6]
                                }
                            ]
                        })
                    }else{
                        jtc.html(errorDataHtml(1));
                    }
                    
                }else{
                    jtc.html(errorDataHtml(1));
                }
            }
        });
    }
}
index.init();