/**
 * @fileOverview 影院票房
 * @time 2016/6/22
 * @author liugang
 * */

var ajax=require('ajax');
var event=require('event');
var chart=require('chart');
var chartData=require('chartData');
var chartTooltip=require('chartTooltip');
var getDate=require('getDate');
var dateChange=require('dateChange');
var dataListHtml=require('dataListHtml');
var bindEvent=require('bindEvent');
var ajaxError=require('ajaxError');
var chartAxisSet=require('chartAxisSet');
var ecllipseText=require('ecllipseText');
var reloadChart=require('reloadChart');
require('dataListFilter');
var weekStartEnd = getDate.weekStartEnd(new Date());
var startDate;
var endDate;


var cinemaTicket={

    init(){
        $('#js-title').html(localStorage.cinemaName);
        $('title').html(localStorage.cinemaName);

        dateChange.init((requestDate) => {
            $('#js-chart').html('');
            $('#js-data-list .msg').remove();
            startDate=requestDate[0];
            endDate=requestDate[1];
            this.insertDataList();
        }, true);
        this.insertDataList();
        bindEvent.init(this.callbackFunc);
        $('#js-filter-list .msg span:gt(1)').remove();
    },
    callbackFunc(option){
        startDate = option.startdate;
        endDate = option.enddate;
        reloadChart.init(option, 1);
         cinemaTicket.insertDataList();
    },
    chart(chartDataArr, xAxis){
        var chartLegend=['票房收入', '场次', '人次', '场均人次', '上座率', '平均票价'];
        var chartSeries=[];
        chartLegend.forEach((item, index) => {
            chartSeries.push({
                name: item,
                type: 'line',
                data: chartDataArr[index]
            })
        });

        var cinemaTicketChart=chart.init($('#js-chart')[0]);
        cinemaTicketChart.setOption({
            legend: {
                left: '-1%',
                data: chartLegend
            },
            animation: false,
            textStyle: {
                fontSize: 10
            },
            color: ['#07bdbf','#638cf5','#ff78ab','#9674ce','#66ddb4','#ffc64c'],
            tooltip: {
                trigger: 'axis',
                formatter: (params) => {
                    return chartTooltip(params);
                },
                textStyle: {
                    fontSize: 10
                }
            },
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
                splitLine: chartAxisSet.x.splitLine,
                splitArea: {
                    color: ['rgba(250,250,250,0.3)','rgba(200,200,200,0.3)']
                }
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
        });

    },

    insertDataList(){
        var self=this;
        ajax.jsonp({
            url: '/reportProxyService/cinema/daysSellRecords',
            data: {
                cinemaCode: localStorage.cinemaCode,
                startdate: startDate,
                enddate: endDate
            },
            success(result){
                if(result.success){
                    var jdl = $('#js-data-list');
                    var jc = $('#js-chart');
                    if(!result.code){
                        var data=result.data;
                        var cinemaArr=chartData.init([0, 2, 4, 6, 7, 12], data, 'cinemas');
                        var listHtml='';
                        var xAxis=[];
                        var nA = $('#js-filter-ok a:last').attr('data-checked').split(',');
                        var newAn=[];
                        var classN='';
                        nA.forEach((item, index)=>{
                            item = Number(item);
                            newAn.push(item);
                        });
                        data.cinemas.forEach((item, index) => {
                            xAxis.push(item.business_date.replace(/\d{4}-/, '')+'  ');
                            listHtml+=`
                                <ul class="msg" data-type="${index}">
                                    <li class="c0"><b>${item.business_date}</b></li>
                                    ${dataListHtml(cinemaArr, cinemaArr.length, index, 1, newAn)}
                                    <li><span>1</span><b>${item.business_date}</b></li>
                                  </ul>
                                  `;
                        });
                        ajaxError(1,'js-data-list','js-chart',listHtml);
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
                        self.chart(chartData.init([0, 2, 4, 6, 7, 12], data, 'cinemas', 0), xAxis);
                    }else{
                        ajaxError(0,'','js-chart');
                    }
                }else{
                    ajaxError(0,'','js-chart');   
                }
            }
        });
    }

};
cinemaTicket.init();