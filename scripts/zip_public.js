var walk = require('walk')
var fs = require('fs')
var walk    = require('walk');
var zlib = require('zlib');
var files   = [];


// Walker options
var walker  = walk.walk('../public', { followLinks: false });

walker.on('file', function(root, stat, next) {
    // Add this file to the list of files
    //files.push(root + '/' + stat.name);
    process.stdout.write(root + '/' + stat.name + '\n');
    var read = fs.createReadStream(root + '/' + stat.name);
    var write = fs.createWriteStream(root + '/' + stat.name + '.gz')
    read.pipe(zlib.createGzip()).pipe(write);
    next();
});

walker.on('end', function() {
    console.log(files);
});