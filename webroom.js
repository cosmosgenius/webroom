(function(){
    var app = require('express')(),
        server = require('http').createServer(app),
        io = require('socket.io').listen(server);

    app.set('view engine', 'ejs');
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
})();