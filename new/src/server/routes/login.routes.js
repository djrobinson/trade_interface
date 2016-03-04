module.exports = function(app, passport) {

  // routes ======================================================================

  //Login form
  app.get('/login', function(req, res) {

    res.render('login.ejs', { message: req.flash('loginMessage') });
  });


  //Signup form
  app.get('/signup', function(req, res) {

    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  //Profile

  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.ejs', {
      user : req.user
    });
  });

  //Logout

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
}