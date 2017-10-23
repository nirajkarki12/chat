module.exports = function(io, Global, _){
	const clients = new Global();

	io.on('connection', (socket) => {
		socket.on('global room', (global) => {
			socket.join(global.room);

			clients.EnterRoom(socket.id, global.name, global.room, global.img);

			var userArr = _.uniqBy(clients.GetRoomList(global.room), 'name');

			io.to(global.room).emit('loggedInUser', userArr);
		})
	})
}