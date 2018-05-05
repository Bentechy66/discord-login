function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next()
    res.send('not logged in :(')
}

function checkInServer(data, serverName) {
  for (var key in data.guilds) {
    if (data.guilds.hasOwnProperty(key)) {
      if (data.guilds[key]["name"] == serverName) {
        return true
      }
    }
  }
  return false
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
      if(checkInServer(req.user, "Werewolves")) {
        res.send("You're logged in and in the werewolves server!")
      } else {
        res.send("You're not in the werewolves server! Join <a href='invite.here'>here.</a>")
    }
  })
}
