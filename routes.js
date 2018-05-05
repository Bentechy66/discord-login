function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.send('not logged in :(')
}

module.exports = function(app, passport, scopes){
  app.get('/', passport.authenticate('discord', { scope: scopes }), function(req, res) {})
  app.get('/callback',
      passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/info') } // auth success
  );
  app.get('/logout', function(req, res) {
      req.logout()
      res.redirect('/')
  });
  app.get('/info', checkAuth, function(req, res) {
      //console.log(req.user)
      res.json(req.user)
  })
}
