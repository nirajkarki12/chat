$(document).ready(function(){
	var socket = io();

	var room = $('#groupName').val();
	var sender = $('#sender').val();

	socket.on('connect', function(){

		var params = {
            room: room,
			sender: sender
		}

		socket.emit('joinRequest', params, function(){

		});

	});

	socket.on('newFriendRequest', function(friend){
        $('#reload').load(location.href + ' #reload');

        $(document).on('click', 'button.accept_friend', function(){
            var div = $(this).parent('div');

            var senderId = $(div).find('input.senderId').val();
            var senderName = $(div).find('input.senderName').val();

            $.ajax({
                url: '/group/'+room,
                type: 'POST',
                data: {
                    senderId: senderId,
                    senderName: senderName
                },
                success: function(){
                    $(this).parent().eq(1).remove();
                }
            });
            $('#reload').load(location.href + ' #reload');
        });
        
        $(document).on('click', 'button.cancel_friend', function(){
            var user_Id = $(this).parent('div').find('input.user_Id').val();

            $.ajax({
                url: '/group/'+room,
                type: 'POST',
                data: {
                    user_Id: user_Id
                },
                success: function(){
                    $(this).parent().eq(1).remove();
                }
            });
            $('#reload').load(location.href + ' #reload');
        });
	});

	$('form.add_friend').on('submit', function(e){
        e.preventDefault();
        
        var receiverName = $(this).find('input.receiverName').val();
        
        $.ajax({
            url: '/group/'+room,
            type: 'POST',
            data: {
                receiverName: receiverName
            },
            success: function(){
                socket.emit('friendRequest', {
                    receiver: receiverName,
                    sender: sender
                }, function(){
                    console.log('Request Sent');
                })
            }
        })
    });
    
    $('button.accept_friend').on('click', function(){
        var div = $(this).parent('div');

        var senderId = $(div).find('input.senderId').val();
        var senderName = $(div).find('input.senderName').val();
        
        $.ajax({
            url: '/group/'+room,
            type: 'POST',
            data: {
                senderId: senderId,
                senderName: senderName
            },
            success: function(){
                $(this).parent().eq(1).remove();
            }
        });
        $('#reload').load(location.href + ' #reload');
    });
    
    $('button.cancel_friend').on('click', function(){
        var user_Id = $(this).parent('div').find('input.user_Id').val();

        $.ajax({
            url: '/group/'+room,
            type: 'POST',
            data: {
                user_Id: user_Id
            },
            success: function(){
                $(this).parent().eq(1).remove();
            }
        });
        $('#reload').load(location.href + ' #reload');
    });

});