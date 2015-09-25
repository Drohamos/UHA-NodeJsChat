var http = require('http');

httpServer = http.createServer(function(req, res) {
	console.log('Un utilisateur a affiché la page');
});

httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);

var messages = [];

io.sockets.on('connection', function(socket) {
	console.log('Nouvel utilisateur');

	for (i = 0; i < messages.length; i++) {
		socket.emit('newMessage', messages[i]);
	}

	socket.broadcast.emit('newUser');

	socket.on('message', function(message) {
		console.log('Nouveau message recu : ' + message.msg);
		messages[messages.length] = message;

		io.sockets.emit('newMessage', message);
	});

	socket.on('disconnect', function() {
		console.log('Deconnexion');

		socket.broadcast.emit('userDisconnect');
	});
});