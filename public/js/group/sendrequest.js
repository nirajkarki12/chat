$(document).ready(function(){
	var socket = io();

	var room = $('#groupName').val();
	var sender = $('#sender').val();

	socket.on('connect', function(){

		var params = {
			sender: sender
		}

		socket.emit('joinRequest', params, function(){
			console.log('joined');
		});


	});
	socket.on('newFriendRequest', function(friend){
		console.log(friend);
        $('#reload').load(location.href + ' #reload');
	});

	$('#add_friend').on('submit', function(e){
		e.preventDefault();
		var receiverName = $('#receiverName').val();
		$.ajax({
			url: '/group/' + room,
			type: 'POST',
			data: {
				receiverName: receiverName,
				sender: sender
			},
			success: function(){
				socket.emit('frientRequest', {
					receiver: receiverName,
					sender: sender
				}, function(){
					console.log('Request Sent');
				})
			}
		});
	});

});