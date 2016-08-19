/**
 * @fileOverview ajax跨域请求
 * @time 2016/6/16
 * @author liugang
 * */


module.exports={

    jsonp: function(option){
        var data=option.data || {};
        data.token=localStorage.token;
        $.ajax({
            // url: 'http://124.251.61.205/restful'+option.url,
            url: 'http://m.bi.yinghezhong.com/restful'+option.url,
            data: data,
            dataType: 'jsonp',
            jsonp: 'callbackName',
            success: option.success
        });
    }

};