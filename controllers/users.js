'use strict';

module.exports = function(_, passport, User){

	return {
		SetRouting: function(router){
			router.get('/', this.indexPage);
			router.post('/', User.LoginValidation, this.postLogin);
			router.get('/signup', this.getSignUp);
			router.post('/signup', User.SignUpValidation, this.postSignUp);

			router.get('/home', this.homePage);
		},
		indexPage: function(req, res){
			const errors = req.flash('error');
			return res.render('index', { title: 'ChatApp | Login', messages: errors, hasErrors: errors.length > 0});
		},
		postLogin: passport.authenticate('local.login',{
			successRedirect: '/home',
			failureRedirect: '/',
			failureFlash: true
		}),
		getSignUp: function(req, res) {
			const errors = req.flash('error');
			return res.render('signup', { title: 'ChatApp | Signup', messages: errors, hasErrors: errors.length > 0});
		},
		postSignUp: passport.authenticate('local.signup',{
			successRedirect: '/home',
			failureRedirect: '/signup',
			failureFlash: true
		}),
		homePage: function(req, res){
			return res.render('home');
		}
	}

}