/**
 * @fileOverview 图表提示框单位
 * @time 2016/6/30
 * @author liugang
 * */
module.exports=function(data){
    if(data[0] && data[0].titleNameArr){
        var tooltipHtml=`${data[0].titleNameArr[data[0].dataIndex]}<br/>`;
    }else{
        var tooltipHtml=`${data[0].name}<br/>`;
    }
    function getValFixed(value){
        if(Math.abs(value)>=0.0001 && Math.abs(value)<0.01){
            value = parseFloat(value).toFixed(4);
        }else if(value==0){
            value = 0;
        }else{
            value = parseFloat(value).toFixed(2);
        }
    }
    data.forEach((item) => {

        var seriesName=item.seriesName;
        var value=item.value;
        var wVal = parseFloat(value/10000).toFixed(2);
        switch(seriesName){

            case '票房收入':
                value=value>=10000?(wVal+'万'):value+'元';
                break;
            case '人次':
                value=value>=10000?(wVal+'万人'):value+'人';
                break;
            case '场次':
                value=value>=10000?(wVal+'万场'):value+'场';
                break;
            case '场均人次':
                value+='人';
                break;
            case '平均票价':
                value+='元';
                break;
            case '场次占比':
            case '人次占比':
            case '排座占比':
            case '票房占比':
            case '上座率':
                value+='%';
                break;
            case '排座效率':
                value = parseFloat(value).toFixed(4);
                if(Math.abs(value).toFixed(4)==0){
                    value = 0;
                }
                break;
            case '票房效能':
            case '排片效率':
                getValFixed(value);
                break;
            case '单座产值':
                getValFixed(value);
                value+='元';
                break;
        }
        tooltipHtml+=`${seriesName}：${value}<br/>`;

    });
    return tooltipHtml;
    // console.log(tooltipHtml);
};