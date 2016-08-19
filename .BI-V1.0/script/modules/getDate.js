
module.exports={

    weekStartEnd(theDay){

        String.prototype.format = function() {
            var vs = arguments;
            return this.replace(/\{(\d+)\}/g, function() { return vs[parseInt(arguments[1])]; });
        };

        Date.prototype.format = function(formatString) {
            return (formatString||"{0}-{1}-{2}").format(
                this.getFullYear()
                , ("0" + (this.getMonth()+1)).slice(-2)
                , ("0" + this.getDate()).slice(-2)
                , ("0" + this.getHours()).slice(-2)
                , ("0" + this.getMinutes()).slice(-2)
                , ("0" + this.getSeconds()).slice(-2)
            );
        };

        var startDate = new Date(theDay.getTime());
        var endDate = new Date(theDay.getTime());
        var yesterday = new Date(theDay.getTime()-86400000);
        var tomorrow = new Date(theDay.getTime()+86400000);
        var dateNext=true;
        startDate.setDate(startDate.getDate()+1-startDate.getDay());
        endDate.setDate(endDate.getDate()+7-endDate.getDay());
        
        if(endDate.format()>this.today()){
            endDate.setDate(new Date().getDate()-1);
            if(startDate > endDate){
                startDate.setDate(startDate.getDate()-7);
            }
            // endDate=new Date(theDay.getTime());
            dateNext=false;
        };
        //sunday.setDate(sunday.getDate());
        return {
            startDate:startDate.format(),
            endDate:endDate.format(),
            yesterday: yesterday.format(),
            tomorrow: tomorrow.format(),
            dateNext: dateNext
        };

    },

    today(time){

        var nowDate=new Date();
        if(time){
            nowDate.setTime(time);
        };
        return nowDate.format();

    }

};