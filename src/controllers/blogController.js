var hogan = require('hogan');
var fs = require('fs');

var BlogController = function (){
};

BlogController.prototype = {

    index: function () {
        if (!this.requestData.queryString.name){
            return this._loadPageAndCompile(
                {
                    pagePath: './public/partials/blog.html',
                    pageTitle: 'Centaurea - Development and consulting company'
                },
                this._masterPath);
        }
        else {
            return this._loadPageAndCompile(
                {
                    pagePath: './public/partials/blog-post/'+this.requestData.queryString.name+'.html'
                },
                this._masterPath);
        }
    },


    _masterPath : './public/master/master-with-contact-footer.html',

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

//module.exports = BlogController;
