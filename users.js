module.exports = users;


function users (){
    this.list = [];
}

users.prototype.add = function(usrObj){
    this.list.push(usrObj);
};

users.prototype.remove = function(usrObj){
    var obj = null;
    var index = -1;
    if(!usrObj)
        return;
    var property = 'uname' in usrObj ? 'uname':'socket';
    if(!(property in usrObj))
        return;
    for(var i = 0 ; i < this.list.length ; i++){
        if(list[i][property] == usrObj[property]){
            index = i;
        }
    }
    
    if (index != -1){
        obj = list.splice(index, 1);
    }

    return obj;
};