var hogan = require('hogan');
var fs = require('fs');
var nodemailer = require('nodemailer');

var HomeController = function (){
};

HomeController.prototype = {

    index: function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/index.html',
                pageTitle: 'Centaurea - Software Development, IT Consulting, Managed Services',
                pageDescription: 'Centaureа is a software development and consulting company ' +
                'that specialized in construction of high-load, scalable, distributed and Big Data processing systems.',
                pageKeywords: 'solution development, software development, application development, cloud solutions' +
                'it consulting, technology consulting, database consulting, mongodb consulting, big data consulting, cloud consulting'+
                'corporate training, it training, dedicated team, managed service, virtual cto'
            },
            this._masterPath);
    },


    _masterPath : './public/master/master.html',
    _masterWithContactPath: './public/master/master-with-contact-footer.html',

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