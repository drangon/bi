/**
 * @fileOverview 影院
 * @time 2016/6/21
 * @author liugang
 * */


module.exports=function(){
	var $bO = $('#js-data-list .msg li.c0 b');
	$bO.each(function(){
		var str = $(this).text();
		var len = str.length;
		if(len > 11){
			$(this).text(str.substr(0,11)+'...');
		}
	})
}

