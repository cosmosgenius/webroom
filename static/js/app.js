(function($){
    listcontroller = function(id){
        var list_obj = $(id);
        var items = [];

        this.add = function(item){
            items.push(item);
            update_view();
        };

        this.removeByName = function(item){
            for(var x in items){
                if(items[x]==item){
                    this.removeByIndex(x);
                }
            }
        };

        this.set = function(list){
            items = list.slice();
            update_view();
        };

        this.removeByIndex = function(index){
            items.splice(index,1);
            update_view();
        };

        function update_view(){
            var item_col = "";
            items.sort();
            for (var x in items){
                item_col += itemMarkup(items[x]);
            }
            list_obj.html(item_col);
        }

        function itemMarkup(item){
            return "<li id="+item+">"+item+"</li>";
        }
    };

    chatcontroller = function(id){
        var chat_obj = $(id);
        var chat_history = [];
        var previous_user;
        this.add = function(item){
            chat_history.push(item);
            update_view();
        };

        this.clear = function (){
            chat_history = [];
            update_view();
        };
        this.history = function (){
            return chat_history;
        };

        function update_view(){
            var chat_col = "";
            for (var x = 0; x < chat_history.length;x++){
                chat_col += itemMarkup(chat_history[x]);
            }
            chat_obj.html(chat_col);
            window.scrollBy(0, document.height);
        }

        function itemMarkup(item){
            var ret;
            ret = "<p>"+item['from']+": "+item['msg']+"</p>";
            return  ret;
        }
    };
})(jQuery);