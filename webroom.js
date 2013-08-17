(function(){
    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server);

    app.use(express.logger('dev'));
    app.set('view engine', 'ejs');
    app.use('/static',express.static(__dirname + "/static"));

    usernames={};
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
        socket.on("message",handle_message);

        socket.on("username",function(uname){
            if(usernames[uname]){
                socket.emit('message','Username Exist');
                socket.disconnect();
                return;
            }
            usernames[uname] = socket;
            socket.emit('message','Welcome, '+uname);
            socket.broadcast.emit('message',uname + ' has entered the room');
        });

        socket.on("disconnect",function(val){
            var uname;
            for (var x in usernames){
                if(usernames[x] == socket){
                    uname = x;
                    break;
                }
            }
            socket.broadcast.emit('message', uname + ' left room');
            delete usernames[uname];
        });
    });

    function handle_message(msg){
        socket.broadcast.emit('message',msg);
    }
})();