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

function getSrvCount(data) {
  var srvCount = 0
  for (var key in data.guilds) {
    srvCount += 1
  }
  return srvCount
}

module.exports = function(app, passport, scopes){
  app.get('/auth/discord/init/', passport.authenticate('discord', { scope: scopes }), function(req, res) {})
  app.get('/', function(req, res) {
    res.send("Hello! <a href='/auth/discord/init'>Click here</a> to login with Discord.")
  })
  app.get('/callback',
      passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/info') } // auth success
  );
  app.get('/logout', function(req, res) {
      req.logout()
      res.redirect('/')
  });
  app.get('/info', checkAuth, function(req, res) {
      if(checkInServer(req.user, "Werewolves")) {
        res.send("You're logged in and in the werewolves server! You're currently in " + getSrvCount(req.user) + " servers.")
      } else {
        res.send("You're not in the werewolves server! To use this tool, you must be. Join <a href='http://discord.io/werewolves'>here.</a>")
    }
  })
}
