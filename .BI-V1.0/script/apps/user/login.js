/**
 * @fileOverview 登录
 * @time 2016/6/15
 * @author liugang
 * */

var ajax=require('ajax');
var event=require('event');
var errorBox=require('errorBox');

var login={

    init: function(){

        if(localStorage.user){
            $('input[name="username"]').val(localStorage.user);
        }
        event.on('#js-login', this.submit);
        if(navigator.userAgent.indexOf('ndroid')>=0){
            var src = '../image/top-logo.png';
          $('body').addClass('android-login').prepend('<img src="" class="top-logo"/>');
          $('.top-logo').attr('src', src);
        }
    },

    submit: function(){
        //var param=$('form').serialize().replace(/[a-z]+=/g, '').split('&');
        var self = $(this);
        if(self.attr('data-get')) return;
        var errorHtml='';
        var authCode=$('input[name="username"]').val();
        //if(!param[0]){
        //    errorHtml='请输入邮箱、手机号'
        //}else if(!param[0]){
        //    errorHtml='请输入密码'
        //};
        errorHtml=!authCode?'请输入授权码':'';

        if(errorHtml){
            errorBox('请输入授权码');
        }else{
            self.addClass('disabled').attr('data-get', true);
            ajax.jsonp({
                url: '/reportProxyService/user/login',
                //data: {name: param[0], password: param[1]},
                data: {authCode: authCode},
                success: function(result){
                    if(result.success){
                        localStorage.user=authCode;
                        localStorage.token=result.data.token;
                        localStorage.cinemaCode='';
                        localStorage.cinemaName='全部影院';
                        location.href='/bi/index.html';
                    }else{
                        errorBox(result.msg);
                    };
                    self.removeAttr('data-get').removeClass('disabled');
                }
            });
        };
    }

};

login.init();


