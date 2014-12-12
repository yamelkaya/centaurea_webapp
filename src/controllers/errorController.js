var hogan = require('hogan');
var fs = require('fs');

var ErrorController = function () {
};

ErrorController.prototype = {
    'page-not-found': function () {
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/page-not-found.html',
                pageTitle: 'Nothing found for request'
            },
            this._masterPath);
    },


    _masterPath: './public/master/master-with-contact-footer.html',

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
