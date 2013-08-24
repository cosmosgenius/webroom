module.exports = users;


function users (){
    this.list = [];
}

users.prototype.add = function(usrObj){
    this.list.push(usrObj);
};

users.prototype.remove = function(usrObj){
    var index = this.search(usrObj);
    if(index !== null){
        return this.list.splice(index, 1);
    }
    return null;
};

users.prototype.search = function (usrObj){
    var i;
    if(!usrObj)
        return;
    if(usrObj.socket){
        for(i = 0 ; i < this.list.length ; i++){
            if(this.list[i].socket == usrObj.socket){
                return i;
            }
        }
    }
    
    if(usrObj.uname){
        for(i = 0 ; i < this.list.length ; i++){
            if(this.list[i].uname == usrObj.uname){
                return i;
            }
        }
    }
    return null;
};

users.prototype.update = function (usrObj){
    if(!usrObj.uname){
        return;
    }
    var index = this.search({'socket':usrObj.socket});
    var isExist = this.search({'uname':usrObj.uname});
    if(index !== null && isExist === null){
        this.list[i] = usrObj;
    }
};