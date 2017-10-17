$(document).ready(function(){
	var socket = io();

	socket.on('connect', function(){
		console.log('User Connected');

	});

	$('#message-form').on('submit', function(e){
		e.preventDefault();

		var msg = $('#msg').val();
		
		socket.emit('createMessage', { text: msg });
	});
})