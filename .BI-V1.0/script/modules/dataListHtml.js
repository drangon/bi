/**
 * @fileOverview 生成数据列表html
 * @time 2016/6/21
 * @author liugang
 * */

module.exports=function(data, count, index, num='0', newAn=[1,2,3,4]){
    var html='';
    var newArray = [1,2,3,4];
    for(var i=0; i<count; i++){

        var n=i+1,className;
        if(newAn.indexOf(n)<0){
            className='dis-none';
        }else{
            className='c'+newArray[0];
            newArray.shift(newArray[0]);
        }
        function callB(o){
            if(o==1){//万
                if(data[i][index]!='-' && data[i][index] >= 10000){
                    html+=`<li class="${className}" data-type="${i+1}">${parseFloat(data[i][index]/10000).toFixed(2)}万</li>`;
                }else{
                    html+=`<li class="${className}" data-type="${i+1}">${data[i][index]}</li>`;
                }
            }else if(o==2){//%
                if(`${data[i][index]}` != '-'){
                    html+=`<li class="${className}" data-type="${i+1}">${data[i][index]}%</li>`;
                }else{
                    html+=`<li class="${className}" data-type="${i+1}">${data[i][index]}</li>`;
                }
            }else{
                if(`${data[i][index]}` != '-'){
                    html+=`<li class="${className}" data-type="${i+1}">${data[i][index]}</li>`;
                }else{
                    html+=`<li class="${className}" data-type="${i+1}">${data[i][index]}</li>`;
                }
            }
        }
        if(num==1){
            switch(n){
                case 1: 
                case 2: 
                case 3: 
                case 4: 
                    callB(1);
                    break;
                case 5:
                    callB(2);
                    break;
                case 6:
                case 7:
                    callB();
                    break;
            }
        }else{
            switch(n){
            	case 1: 
            	case 3: 
            	case 5: 
            	case 7: 
            		callB(1);
            		break;
            	case 2:
            	case 4:
            	case 6:
            	case 8:
            	case 10:
    	        	callB(2);
            		break;
                case 9:
                case 11: 
                case 12:
                case 13:
                    callB();
                    break;
            }
        }
    };

    return html;

};