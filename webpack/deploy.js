var fs = require('fs');
var routers = require('./routers.deploy.json').routers;

var files = fs.readdirSync('./dist/assets');

var reg = /.+\.html/;

const replaceContent = '</head>';

files.forEach(function(file) {
  if (reg.test(file)) {
    console.log(file);
    if (file.startsWith('home')) {
      fs.renameSync('./dist/assets/' + file, './dist/' + file.split('_')[1]);
    } else {
      fs.renameSync('./dist/assets/' + file, './dist/' + file.replace('_', '/'));
    }

    // var fileRouter = routers.find(r => r.filename === file);

    // var content = fs.readFileSync('./dist/assets/' + file).toString();
    // content = content.replace('</head>', replaceContent);
    // fs.renameSync('./dist/assets/' + file, './dist/html/' + file + (fileRouter.erb ? '.erb' : ''));
  }
})
