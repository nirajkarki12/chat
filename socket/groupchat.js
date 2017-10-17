module.exports = function(io){
	io.on('connection', (socket) => {
		socket.on('createMessage', (message) => {
			console.log(message);
		});
	});

	
}