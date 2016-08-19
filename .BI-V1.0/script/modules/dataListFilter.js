/**
 * @fileOverview 数据列表指标筛选
 * @time 2016/6/21
 * @author liugang
 * */

var event=require('event');
var errorBox=require('errorBox');

module.exports=(function(){

    event.on('#js-more-filter', () => {
        $('#js-filter-list').show().prev().show();
        $('.footer').css('opacity',0);
    });

    event.on('span', function(){
        var self=$(this);
        var checked=[];
        var activeLength=self.parent().find('.active').length;
        if(!self.attr('class')){
            if(activeLength==4){
                errorBox();
                return;
            };
            self.addClass('active');
        }else{
            if(activeLength==1){
                errorBox('最少选择一项');
                return;
            };
            self.removeClass('active');
        };
        self.parent().find('span').each((index, item) => {
            if($(item).attr('class')){
                checked.push(index+1)
            }
        });
        self.parent().prev().find('a').last().attr('data-checked', checked);
    }, $('.data-item .list'));

    event.on('a', function(){
        if($(this).index()>0){
            var checkedArr=$(this).attr('data-checked').split(',');
            $('#js-data-list li').removeClass().hide();
            checkedArr.forEach((item, index) => {
                var ulObj=$('#js-data-list ul');
                ulObj.removeClass('one two three');
                ulObj.each(function(i){
                    var liObj=$(this).find('li');
                    var liFilterObj=liObj.filter('[data-type='+item+']');
                    switch(checkedArr.length){
                        case 1:
                            $(this).addClass('one');
                            break;
                        case 2:
                            $(this).addClass('two');
                            break;
                        case 3:
                            $(this).addClass('three');
                            break;
                    };
                    if(i>0){
                        liObj.last().show();
                    };
                    liObj.eq(0).addClass('c0').show();
                    liFilterObj.show().addClass('c'+(index+1));
                });
            });
        };
        $(this).parent().parent().hide().prev().hide();
        $('.footer').css('opacity',1);
    }, $('#js-filter-ok'));

})();

//module.exports=dataListFilter;