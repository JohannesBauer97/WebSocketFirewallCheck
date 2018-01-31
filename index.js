var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

http.listen(80, function(){
    console.log('listening on *:80');
});

io.on('connection', function(socket){
    console.log('a user connected');
    var i = 0;
    socket.on('send', function(msg){
        i++;
        socket.emit('send',i + ' - ' + getTimestamp());
    });
});

function getTimestamp(){
    var date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}