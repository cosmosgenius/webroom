var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    userlist = require('./users');

app.use(express.logger('dev'));
app.set('view engine', 'ejs');
app.use('/static',express.static(__dirname + "/static"));
io.configure(function(){
    io.set("transports",["xhr-polling"]);
    io.set("polling duration",10);
});

app.get('/',function(req, res){
    var param = {
        room_title:'Webroom dev',
        title:'Room 1'
    };
    res.render('index',param);
});

module.exports = function(config){
    return server;
};

io.sockets.on("connection",function(socket){
    var currentUser;
    socket.on("disconnect",function(val){
        console.dir(userlist.remove({'socket':socket.id}));
    });

    socket.on("user new",function(packet){
        if(packet.uname){
            if(userlist.search(packet) === null){
                packet.socket = socket.id;
                userlist.add(packet);
                currentUser = packet;
                wbsys("Welcome, "+packet.uname);
                sendUsers(packet.uname);
            }else{
                wbsys("Username already exist", "error");
            }
        }
    });

    socket.on("user change",function(packet){
        packet.socket = socket.id;
        userlist.update(packet);
        sendUsers();
    });

    socket.on("wbmsg",handle_msg);

    function sendUsers(uname){
        if(uname){
            wbsys(uname + " has entered room","broadcast");
        }
        var list = [];
        io.sockets.emit("user list",userlist.getUsers());
    }

    function wbsys(msg,type){
        var packet = {'msg':msg,'type':type};
        if(!type){
            packet.type = 'info';
        }
        if(type == "broadcast"){
            socket.broadcast.emit("wbsys",packet);
        }else{
            socket.emit("wbsys",packet);
        }
        
    }

    function handle_msg(packet){
        if(!currentUser){
            wbsys("Please register a username","error");
            return;
        }

        if(packet.msg){
            packet.from = currentUser.uname;
            socket.broadcast.emit("wbmsg",packet);
        }else{
            wbsys("Require <msg> param","error");
        }
    }
});