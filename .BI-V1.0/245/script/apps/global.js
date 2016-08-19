/**
 * @fileOverview 页面全局
 * @time 2016/6/23
 * @author liugang
 * */

var ajax=require('ajax');
var event=require('event');
if (window.devicePixelRatio && devicePixelRatio >= 2) {
  var testElem = document.createElement('div');
  testElem.style.border = '.5px solid transparent';
  document.body.appendChild(testElem);
  if (testElem.offsetHeight == 1)
  {
    document.querySelector('html').classList.add('hairlines');
  }else{
    document.querySelector('html').classList.add('js-jr');
  }
  document.body.removeChild(testElem);
}
var footerClsArr=['/movie', '/cinema', '/user'];
var pathname=location.pathname.match(/\/\w+/g);
var footerClsIndex=footerClsArr.indexOf(pathname.length>1?pathname[1]:'');

var footerClsActive=footerClsIndex<0?0:(footerClsIndex+1);
$('footer a').removeClass().eq(footerClsActive).addClass('active');
Number.prototype.toFixed=function(len){
    var f_x = parseFloat(this);  
    if (isNaN(f_x)){  
        return '0';  
    }  
    var f_x = Math.round(f_x*Math.pow(10,len))/Math.pow(10,len);  
    var s_x = f_x.toString();  
    var p_d = s_x.indexOf('.');  
    if (p_d < 0){  
        p_d = s_x.length;  
        s_x += '.';  
    }  
    while (s_x.length <= p_d + len){  
        s_x += '0';  
    }  
    return s_x;  
}
ajax.jsonp({
    url: '/reportProxyService/user/validateToken',
    success(result){
        if(result.code=='000000'){
            location.href='/bi/user/login.html';
        }else{
            $('body').css('visibility', 'visible');
        };
    }
});

event.on('a', function(){
    localStorage.cinemaCode='';
    localStorage.cinemaName='全部影院';
}, $('#js-report'));

event.on('#js-sel-cinema', () => {
    location.href=`/bi/cinema/selCinema.html?url=${location.href}`;
});