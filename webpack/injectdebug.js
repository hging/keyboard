var fs = require('fs');
var routers = require('./routers.deploy.json').routers;

var files = fs.readdirSync('./dist/html/');

var reg = /.+\.html/;

files.forEach(function(file) {
  if (reg.test(file)) {
    var content = fs.readFileSync('./dist/html/' + file).toString();
    fs.writeFileSync('./dist/html/' + file, content);
  }
})
