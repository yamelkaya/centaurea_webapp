var hogan = require('hogan');
var fs = require('fs');

var ServicesController = function (){
};

ServicesController.prototype = {
    'development': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/development.html',
                pageTitle: 'Centaurea - Software development'
            },this._masterPath);
    },

    'consulting': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/consulting.html',
                pageTitle: 'Centaurea - Technology consulting'
            },this._masterPath);
    },

    'corporate-trainings': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/corporate-trainings.html',
                pageTitle: 'Centaurea - Corporate trainings'
            },this._masterPath);
    },

    'cto-as-a-service': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/cto-as-a-service.html',
                pageTitle: 'Centaurea - CTO as a service'
            },this._masterPath);
    },

    'dedicated-team': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/dedicated-team.html',
                pageTitle: 'Centaurea - Dedicated team'
            },this._masterPath);
    },

    'managed-services': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/managed-services.html',
                pageTitle: 'Centaurea - Managed Services'
            },this._masterPath);
    },

    'mongodb-as-a-service': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/mongodb-as-a-service.html',
                pageTitle: 'Centaurea - MongoDB as a service'
            },this._masterPath);
    },


    _masterPath : './public/master/master-with-contact-footer.html',

    _loadPageAndCompile: function(data,masterPath){
        var file = fs.readFileSync(data.pagePath, 'utf-8');
        var template = hogan.compile(file);
        var model = data;
        model.partialHtml = template.render();

        var master = fs.readFileSync(masterPath,'utf-8');
        var masterTemplate = hogan.compile(master);

        return masterTemplate.render(model);
    }
};

module.exports = ServicesController;