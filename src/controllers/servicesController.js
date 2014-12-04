var hogan = require('hogan');
var fs = require('fs');

var ServicesController = function (){
};

ServicesController.prototype = {

    development: function(){

        var file = fs.readFileSync('./public/services/partials/development.html', 'utf-8');
        var template = hogan.compile(file);
        var model = {
            partialHtml: template.render()
        };

        var master = fs.readFileSync('./public/services/master.html','utf-8');
        var masterTemplate = hogan.compile(master);

        return masterTemplate.render(model);
    }

};

module.exports = ServicesController;