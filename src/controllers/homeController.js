var hogan = require('hogan');
var fs = require('fs');

var HomeController = function (){
};

HomeController.prototype = {

    index: function(){
        var file = fs.readFileSync('./public/index.html', 'utf-8');
        return file;

    },

    technologies: function(id){
        console.log(id)
    }
};

module.exports = HomeController;