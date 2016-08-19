/**
 * @fileOverview 数据加载错误html
 * @time 2016/6/28
 * @author pyp
 * */

module.exports=function(flag){
    var html='';
    if(flag){
    	html += '<div class="error-wrap bg-f">';
    }else{
    	html += '<div class="error-wrap">';
    }
    html += '<i class="error-icon"></i><p>哎呀！数据未更新</p>';
    html += '</div>';
    return html;
};