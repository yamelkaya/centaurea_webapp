var hogan = require('hogan');
var fs = require('fs');

var ErrorController = function () {
};

ErrorController.prototype = {
    'productivity-coming': function () {
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/page-coming-soon.html',
                pageTitle: 'Revolutionary productivity application is coming soon'
            },
            this._masterPath);
    },


    _masterPath: './public/master/master-without-menu.html',

    _loadPageAndCompile: function (data, masterPath) {
        var file = fs.readFileSync(data.pagePath, 'utf-8');
        var template = hogan.compile(file);
        var model = data;
        model.partialHtml = template.render();

        var master = fs.readFileSync(masterPath, 'utf-8');
        var masterTemplate = hogan.compile(master);

        return masterTemplate.render(model);
    }

};

module.exports = ErrorController;
