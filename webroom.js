(function(){
    var express = require('express'),
        app = express(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server);

    app.use(express.logger('dev'));
    app.set('view engine', 'ejs');
    app.use('/static',express.static(__dirname + "/static"));

    usernames={'length':0};
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
        usernames[socket.id] = {'uname': "user"+usernames.length};
        usernames.length +=1;
        socket.emit("uname",usernames[socket.id].uname);
        socket.on("message",handle_message);

        socket.on("changeuname",function(uname){
            for(var x in username){
                if(username[x].uname == uname){
                    socket.emit('system','Username Exist');
                    return;
                }
            }
            usernames[socket.id].uname = uname;
        });

        socket.on("disconnect",function(val){
            delete usernames[socket.id];
            usernames.length -= 1;
        });

        function handle_message(packet){
            packet['from']=usernames[socket.id].uname;
            socket.broadcast.emit('message',packet);
        }
    });

    
})();