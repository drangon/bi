/**
 * @fileOverview 错误提示框
 * @time 2016/6/27
 * @author liugang
 * */

module.exports=function(prompt="最多可选4项"){

    $('body').append(`<div class="error-msg" id="js-error">${prompt}</div>`);

    setTimeout(() => {
        $('#js-error').hide(1000).remove();
    }, 1500);

};