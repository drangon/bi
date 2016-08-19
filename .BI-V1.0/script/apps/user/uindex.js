/**
 * @fileOverview 退出登录
 * @time 2016/6/20
 * @author liugang
 * */

var ajax=require('ajax');
var event=require('event');

var user={

    init(){
        event.on('#js-logout', this.logout);
    },

    logout(){
        ajax.jsonp({
            url: '/reportProxyService/user/logout',
            success(result){
                if(result.success){
                    var user=localStorage.user;
                    location.href='/bi/user/login.html';
                    localStorage.clear('token');
                    localStorage.user=user;
                };
            }
        });
    }

};

user.init();