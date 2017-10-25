$(document).ready(function(){
	var socket = io();

	socket.on('connect', function(){
		var room = 'Global Room';
		var name = $('#name-user').val();
		var img = $('#name-img').val();

		socket.emit('global room', {
			room: room,
			name: name,
			img: img
		});
	});

	socket.on('loggedInUser', function(users){
		var friends = $('.friend').text();
		var friend = friends.split('@');

		var name = $('#name-user').val().toLowerCase();
		var ol = $('<div></div>');

		var arr = [];

		for(i = 0; i < users.length; i++){
			if(friend.indexOf(users[i].name) >  -1){
				arr.push(users[i]);

				var userName = users[i].name.toLowerCase();
				var list = '<img src="https://placehold.it/300x300" class="pull-left img-circle" style="width:50px;margin-right:10px;margin-top:10px;" /><p>' + 
					'<a href="/chat/' + userName + '.' + name + '" class="val"><h3 style="color:grey;font-size:14px;">' + '@' + users[i].name +'<i class="fa fa-circle online pull-right" aria-hidden="true"></i></h3></a></p><div class="clearfix"></div>'
					;
				ol.append(list);
			}
		}

		$('#numOfFriends').text('(' + arr.length + ')');
		$('#onlineFriends').html(ol);

	})
});