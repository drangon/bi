webpackJsonp([8],{0:function(n,a,i){(function(n){"use strict";var a=i(40),e=i(11),t=i(166),c=[],o={init:function(){location.search.indexOf("login")>0&&n("#js-cinema-close").hide(),this.insertCinema(),e.on("a[data-code]",function(){return localStorage.cinemaCode=n(this).attr("data-code"),localStorage.cinemaName=n(this).attr("data-name"),location.href=location.search.split("=")[1],!1}),t(this.searchCinema,function(){n("#js-cinema dl").show().find("a").show()})},searchCinema:function(){var a=n(this).val(),i=n("#js-cinema dl");i.show(),c.forEach(function(n,e){var t=[],c=i.eq(e).find("dd a"),o=0;n.forEach(function(n,i){t.push(),n.indexOf(a)<0?c.eq(i).hide():(c.eq(i).show(),o++)}),0==o&&i.eq(e).hide()})},insertCinema:function(){a.jsonp({url:"/reportProxyService/user/cineDataByUser",success:function(a){var i=a.data,e="",t="",o=0;for(var s in i){var r=i[s],d="",h=[];r.forEach(function(n){var a=n.split("_");h.push(a[0]),d+='<a data-code="'+a[1]+'" data-name="'+a[0]+'" href="/bi/index.html?code='+a[1]+'">'+a[0]+"</a>"});var l='\n                        <dl class="cinema-list">\n                            <dt><a name="'+s+'">'+s+"</a></dt>\n                            <dd>"+d+"</dd>\n                        </dl>\n                    ";c[o]=h,t+='<a href="#'+s+'">'+s+"</a>",e+=l,o++}n("#js-cinema").html(e).parent().next().html(t)}})}};o.init()}).call(a,i(2))},166:function(n,a,i){(function(a){"use strict";var e=i(11);n.exports=function(n,i){var t=arguments.length<=2||void 0===arguments[2]?"#js-search-input":arguments[2];e.on(t,n,"","input"),e.on("#js-cancel-search",function(){i(),a("#js-search-input").val("")})}}).call(a,i(2))}});