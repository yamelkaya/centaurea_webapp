var hogan = require('hogan');
var fs = require('fs');

var BlogController = function (){
};

BlogController.prototype = {

    index: function () {
        var postName = this.requestData.queryString.name;
        if (!postName){
            return this._loadPageAndCompile(
                {
                    pagePath: './public/partials/blog.html',
                    pageTitle: 'Centaurea Blog - MongoDB, Big Data, Cloud services, Apache Kafka'
                },
                this._masterPath);
        }
        else {
            return this._loadPageAndCompile(
                {
                    pagePath: './public/partials/blog-post/'+postName+'.html',
                    pageTitle: this._pageTitles[postName]
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
    },

    _pageTitles : {
        'how-mongodb-indexes-depends-on-ram-and-io-operations': 'Introduction to MongoDB indexing: How MongoDB indexes depend on memory and I/O operations',
        'mongodb-memory-allocation-and-cache-management': 'Introduction to MongoDB memory allocation and cache management'
    }
};

module.exports = BlogController;
