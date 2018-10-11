var config = require('./tsconfig.json');
var fs = require('fs');

var files = [];

getFiles = function(dir) {
    if (!dir) dir = '';
    var dirFiles = fs.readdirSync('./' + dir);
    for (var i = 0; i < dirFiles.length; i++) {
        var file = dirFiles[i];
        var path = dir + file;
        if (fs.statSync('./' + path).isDirectory()) {
            getFiles(path + '/');
        } else {
            if (file.endsWith('.ts')) {
                files.push(path);
            }
        }
    }
}
getFiles();
config['files'] = files;
fs.writeFile('tsconfig.json', JSON.stringify(config, null, 4), e => {
    if (e) {
        throw e;
    }
    console.log('done');
});
