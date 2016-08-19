/**
 * @fileOverview 选择影院
 * @time 2016/6/16
 * @author liugang
 * */

var ajax=require('ajax');
var event=require('event');
var search=require('search');
var cinemaListArr=[];

var selCinema={

    init: function(){

        if(location.search.indexOf('login')>0){
            $('#js-cinema-close').hide();
        };
        this.insertCinema();
        event.on('a[data-code]', function(){
            localStorage.cinemaCode=$(this).attr('data-code');
            localStorage.cinemaName=$(this).attr('data-name');
            location.href=location.search.split('=')[1];
            return false;
        });
        search(this.searchCinema, function(){
            $('#js-cinema dl').show().find('a').show();
        });
    },

    searchCinema(){
        var searchVal=$(this).val();
        var cinemaListObj=$('#js-cinema dl');
        cinemaListObj.show();
        cinemaListArr.forEach((item, index) => {
            var searchCinemaArr=[];
            var itemCinemaObj=cinemaListObj.eq(index).find('dd a');
            var showCinemaLen=0;
            item.forEach((itemName, itemIndex) => {
                searchCinemaArr.push();
                if(itemName.indexOf(searchVal)<0){
                    itemCinemaObj.eq(itemIndex).hide();
                }else{
                    itemCinemaObj.eq(itemIndex).show();
                    showCinemaLen++;
                };
            });
            if(showCinemaLen==0){
                cinemaListObj.eq(index).hide();
            };
        });

    },

    insertCinema: function(){

        ajax.jsonp({
            url: '/reportProxyService/user/cineDataByUser',
            success: function(result){
                var cinemaArr=result.data;
                var html='';
                var letter='';
                var index=0;
                for(var key in cinemaArr){
                    var cinemaItemArr=cinemaArr[key];
                    var cinemaNameHtml='';
                    var cinemaListTempArr=[];
                    cinemaItemArr.forEach((value) => {
                        var cinemaName=value.split('_');
                        cinemaListTempArr.push(cinemaName[0]);
                        cinemaNameHtml+=`<a data-code="${cinemaName[1]}" data-name="${cinemaName[0]}" href="/bi/index.html?code=${cinemaName[1]}">${cinemaName[0]}</a>`;
                    });
                    var htmlPart=`
                        <dl class="cinema-list">
                            <dt><a name="${key}">${key}</a></dt>
                            <dd>${cinemaNameHtml}</dd>
                        </dl>
                    `;
                    cinemaListArr[index]=cinemaListTempArr;
                    letter+=`<a href="#${key}">${key}</a>`;
                    html+=htmlPart;
                    index++;
                };
                $('#js-cinema').html(html).parent().next().html(letter);

            }
        })

    }

};
selCinema.init();