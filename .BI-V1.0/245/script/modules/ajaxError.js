/**
 * @fileOverview 请求错误信息处理
 * @time 2016/6/17
 * @author liugang
 * */

var errorDataHtml=require('errorDataHtml');

module.exports=function(f, a, b, c){
	var jdl = a ? $('#'+a) : $('#js-data-list');
	var jmc = b ? $('#'+b) : $('#js-movie-chart');
	var d = a ? 1 : 0;
	if(f){
		if(jdl.size()){
			jdl.find('.msg').remove();
            jdl.find('.error-wrap').remove();
            if(d) jdl.append(c);
		}
		if(jmc.size()){
			jmc.html('');
		}
	}else{
		if(jdl.size()){
			jdl.find('.msg').remove();
			if(!jdl.find('.error-wrap').size()){
				jdl.append(errorDataHtml());
			}
		}
        if(jmc.size()){
	        jmc.html(errorDataHtml(1));
        }
	}
	
}