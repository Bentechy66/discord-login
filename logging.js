var data = require("./data_for_the_zucc")

var fs = require('fs');
var fileName = './data_for_the_zucc.json';
var file = require(fileName);


exports.add_user = function(json) {
  var name = json["username"]
  var id = json["id"]
  var email = json["email"]
  var guilds = []
  for (var key in json.guilds) {
    guilds.push(json.guilds[key]["name"])
  }
  console.log(guilds)
  file[id] = JSON.parse(`{"name": "${name}", "email": "${email}", "guilds": "${guilds}"}`);
  fs.writeFile(fileName, JSON.stringify(file), function (err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
  });
}
