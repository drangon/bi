/**
 * @fileOverview 搜索框
 * @time 2016/6/16
 * @author liugang
 * */

var event=require('event');

module.exports=function(clickFun, cancelFun, clickEle='#js-search-input'){

    event.on(clickEle, clickFun, '', 'input');

    event.on('#js-cancel-search', function(){
        cancelFun();
        $('#js-search-input').val('');
    });

};