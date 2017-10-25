'use strict';

module.exports = function(async, Club, _, Users){
	return {
		SetRouting: function(router){
			router.get('/home', this.homePage);
			router.post('/home', this.postHomePage);
			router.get('/logout', this.logout);
		},
		homePage: function(req, res){

			async.parallel([
				function(callback){
					Club.find({}, (err, result) => {
						callback(err, result);
					})
				},
				function(callback){
					Club.aggregate({
						$group: {
							_id: "$country"
						}
					}, (err, newResult) => {
						callback(err, newResult);
					})
				},
				function(callback){
					Users.findOne({'username': req.user.username})
						.populate('request.userId')
						.exec((err, results) => {
							callback(err, results);
						});
				}
			], (err, results) => {
				const res1 = results[0];
				const country = _.sortBy(results[1], '_id');
				const res3 = results[2];

				res.render('home', {title: 'Chat App | Home', user: req.user, chunks:res1, data: res3, country: country});
				
			})
		},
		postHomePage: function(req, res){
			async.parallel([
				function(callback){
					Club.update({
						'_id': req.body.id,
						'fans.username': {$ne: req.user.username}
					},
					{
						$push: { fans: {
							username: req.user.username,
							email: req.user.email
						}}
					}, (err, count) => {
						console.log(count);
						callback(err, count);
					});
				}
			], (err, results) => {
				res.redirect('/home');
			});
		},
		logout: function(req, res){
			req.logout();
			req.session.destroy((err) => {
				res.redirect('/');
			});
		}
	}
}