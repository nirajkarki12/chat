'use strict';

module.exports = function(async, Club, _){
	return {
		SetRouting: function(router){
			router.get('/home', this.homePage);
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
				}
			], (err, results) => {
				const res1 = results[0];
				const country = _.sortBy(results[1], '_id');

				res.render('home', {title: 'Chat App | Home', user: req.user, data:res1, country: country});
				
			})
		}
	}
}