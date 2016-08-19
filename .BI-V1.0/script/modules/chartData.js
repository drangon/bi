/**
 * @fileOverview 图表/列表数据计算生成
 * @time 2016/6/21
 * @author liugang
 * */

module.exports={

    init: function(getDataArr, data, dataArrName='movies', nullData='-'){

        if(!data) return;

        this.data=data;
        this.dataArr=dataArrName?data[dataArrName]:data;

        var returnDataArr=[];
        getDataArr.forEach((item, index) => {
            var dataTemp=[];
            this.dataArr.forEach((selfData) => {
                dataTemp.push(this.getData(selfData, item, nullData));
            });
            returnDataArr.push(dataTemp);
        });
        return returnDataArr;
    },

    //票房占比
    getData(data, type, nullData){

        // var totalData=this.data;
        var returnValue=0;

        switch(type){

            case 0:
                //票房收入
                returnValue=Number(data.ticket_income);
                break;
            case 1:
                //票房占比
                returnValue=Number(data.ticket_income/data.total_ticket_income);
                break;
            case 2:
                //场次
                returnValue=data.normal_show_num;
                break;
            case 3:
                //场次占比
                returnValue=Number(data.normal_show_num/data.total_normal_show_num);
                break;
            case 4:
                //人次
                returnValue=data.show_sold_num;
                break;
            case 5:
                //人次占比
                returnValue=Number(data.show_sold_num/data.total_show_sold_num);
                break;
            case 6:
                //场均人次
                returnValue=Math.round(data.show_sold_num/data.normal_show_num);
                break;
            case 7:
                //上座率
                returnValue=Number(data.show_sold_num/data.hall_seats_avl);
                break;
            case 8:
                //票房效能
                returnValue=Number((data.ticket_income/data.total_ticket_income)/(data.normal_show_num/data.total_normal_show_num));
                break;
            case 9:
                //排片效率
                returnValue=Number((data.show_sold_num/data.total_show_sold_num)/(data.normal_show_num/data.total_normal_show_num));
                break;
            case 10:
                //单座产值
                returnValue=Number(data.ticket_income/data.hall_seats_avl);
                break;
            case 11:
                //排座占比
                returnValue=Number(data.hall_seats_avl/data.total_hall_seats_avl);
                break;
            case 12:
                //平均票价
                returnValue=Number(data.ticket_income/data.show_sold_num);
                break;
            case 13:
                //排座效率
                returnValue=Number((data.show_sold_num/data.total_show_sold_num)-(data.hall_seats_avl/data.total_hall_seats_avl));
                break;
        };

        returnValue=isFinite(returnValue)?returnValue:0;
        returnValue=(returnValue.toFixed(4)==0?0:returnValue);
        returnValue=(returnValue==0?nullData:returnValue);

        if([1,3,5,7,11].indexOf(type)>=0 && returnValue!='-'){
            return (parseFloat(returnValue)*100).toFixed(2);
        }else{
            if(returnValue != '-'){
                if(returnValue>=10000){
                    return returnValue;
                }else{
                    if(Math.abs(Number(returnValue))>=0.0001 && Math.abs(Number(returnValue))<1 && [13].indexOf(type)<0){
                        return parseFloat(returnValue).toFixed(2);
                    }else{
                        if([10,12].indexOf(type)>=0 || [8,9,10].indexOf(type)>=0){
                            return parseFloat(returnValue).toFixed(2);
                        }
                        if([13].indexOf(type)>=0){
                            return parseFloat(returnValue).toFixed(4);
                        }
                        return parseFloat(returnValue);
                    }
                }
            }else{
                return returnValue;
            }
        }
    }

};