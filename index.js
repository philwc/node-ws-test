var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.send('<h1>Websocket Server</h1><p>To use, POST JSON to /message</p>');
});

app.post('/message', function (req, res) {
    var msg = req.body;
    io.emit('message', msg);
    res.send({'status': 'OK'});
});

io.on('connection', function (socket) {
    console.log('client connected');
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});