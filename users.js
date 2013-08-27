module.exports = new users();

function users (){
    this.list = [];
}

users.prototype.add = function(usrObj){
    this.list.push(new user(usrObj));
};

users.prototype.remove = function(usrObj){
    var index = _search(this,usrObj);
    if(index !== null){
        return this.list.splice(index, 1);
    }
    return null;
};

users.prototype.search = function (usrObj){
    var index = _search(this,usrObj);
    if(index !== null)
        return this.list[index];
    return null;
};

users.prototype.update = function (usrObj){
    if(!usrObj.uname){
        return null;
    }
    var index = _search(this,{'socket':usrObj.socket});
    var isExist = this.search({'uname':usrObj.uname});
    if(index !== null && isExist === null){
        this.list[index] = usrObj;
        return this.list[index];
    }
    return null;
};

users.prototype.getUsers = function (){
    var ulist = [];
    for(var i = 0 ; i < this.list.length;i++)
        ulist.push(this.list[i].uname);
    return ulist;
};

function _search(self,usrObj){
    var i;
    if(!usrObj)
        return;
    if(usrObj.socket){
        for(i = 0 ; i < self.list.length ; i++){
            if(self.list[i].socket == usrObj.socket){
                return i;
            }
        }
    }
    
    if(usrObj.uname){
        for(i = 0 ; i < self.list.length ; i++){
            if(self.list[i].uname == usrObj.uname){
                return i;
            }
        }
    }
    return null;
}

function user(params){
    if(params){
        for (var x in params){
            this[x] = params[x];
        }
    }
}