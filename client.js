$(document).ready(function() {
	var socket = io.connect('http://localhost:1337');

	$('#messageForm').submit(function(event) {
		event.preventDefault();

		if ($('#message').val()) {
			socket.emit('message', {
				msg: $('#message').val()
			});
		}
		else alert('Vous devez entrer un message');

		// On vide l'input
		$('#message').val('');
	});

	socket.on('newMessage', function(message) {
		$('#messages').append('<div>' + message.msg + '</div>');
	});

	socket.on('newUser', function () {
		$('#messages').append('<p>Nouvel utilisateur</p>');
	});

	socket.on('userDisconnect', function () {
		$('#messages').append('<p>Déconnexion</p>');
	})
});