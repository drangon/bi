/**
 * @fileOverview 日期前后切换
 * @time 2016/6/17
 * @author liugang
 * */

module.exports=function(time,d='yyyy-MM-dd'){
	var t = new Date(time); 
	var tf = function(i){return (i < 10 ? '0' : '') + i}; 
	return d.replace(/yyyy|MM|dd/g, function(a){ 
		switch(a){ 
			case 'yyyy': 
			return tf(t.getFullYear()); 
			break; 
			case 'MM': 
			return tf(t.getMonth() + 1); 
			break; 
			case 'dd': 
			return tf(t.getDate()); 
			break; 
		}; 
	}); 
}

