var hogan = require('hogan');
var fs = require('fs');

var HomeController = function (){
};

HomeController.prototype = {

    index: function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/index.html',
                pageTitle: 'Centaurea - Development and consulting company'
            },
            this._masterPath);
    },

    _masterPath : './public/master/master.html',

    _loadPageAndCompile: function(data,masterPath){
        var file = fs.readFileSync(data.pagePath, 'utf-8');
        var template = hogan.compile(file);
        var model = data;
        model.partialHtml= template.render();

        var master = fs.readFileSync(masterPath,'utf-8');
        var masterTemplate = hogan.compile(master);

        return masterTemplate.render(model);
    }
};

module.exports = HomeController;