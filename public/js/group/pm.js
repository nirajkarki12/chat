$(document).ready(function(){
	var socket = io();

	var paramOne = $.deparam(window.location.pathname);
	var newParam = paramOne.split('.');
	
	var username = newParam[0];
	$('#receiver_name').text('@' + username);

	swap(newParam, 0, 1);
	var paramTwo = newParam[0] + '.' + newParam[1];


	socket.on('connect', function(){
		var params = {
			room1: paramOne,
			room2: paramTwo
		}

		socket.emit('join pm', params, function(){
			console.log('User Joined');
		});
	});

	socket.on('new message', function(data){
		var template = $('#message-template').html();
		var message = Mustache.render(template, {
			text: data.text,
			sender: data.sender
		});

		$('#messages').append(message);
	});

	$('#message_form').on('submit', function(e){
		e.preventDefault();

		var msg = $('#msg').val();
		var sender = $('#name-user').val();

		if(msg.trim().length > 0){
			socket.emit('private message', { 
				text: msg,
				sender: sender,
				room: paramOne
			}, function(){
				$.ajax({
					url: '/chat/' + paramOne,
					type: 'POST',
					data: {
						message: msg
					},
					success: function(){
						$('#msg').val('');
					}
				});
			});
		}
	});
});

function swap(input, value_1, value_2){
	var temp = input[value_1];
	input[value_1] = input[value_2];
	input[value_2] = temp;

}