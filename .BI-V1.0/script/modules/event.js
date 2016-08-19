/**
 * @fileOverview 事件绑定
 * @time 2016/6/16
 * @author liugang
 * */


module.exports={

    on: function(eventEle, eventFun, eleWrap, eventType){
        var eleWrap=eleWrap?eleWrap:$(document);
        var eventType=eventType?eventType:'click';
        eleWrap.off(eventType, eventEle);
        eleWrap.on(eventType, eventEle, eventFun);
    },
    attach: function(eventEle, eventFun, eventType){
        if(eventEle.addEventListener){
            eventEle.addEventListener(eventType, eventFun, false);
        }else{
            eventEle.attachEvent('on'+eventType, eventFun);
        };
    }

};