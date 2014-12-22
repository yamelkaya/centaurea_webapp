var hogan = require('hogan');
var fs = require('fs');

var ServicesController = function (){
};

ServicesController.prototype = {
    'software-development': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/development.html',
                pageTitle: 'Software Design, Software Development - MongoDB, NoSql Databases, Hadoop, Apache Kafka, Dynamics CRM, Angular',
                pageDescription: 'Centaureа team is dealing with systems of different levels and complexity for clients from lifestyle businesses ' +
                'and start-ups to the enterprise level companies and global market leaders.',
                pageKeywords: 'software development, application development, solution development'
            },this._masterPath);
    },

    'it-consulting': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/consulting.html',
                pageTitle: 'Database Consulting, Big Data Consulting, Cloud Consulting, Technology Consulting, MongoDB Consulting, Dynamics CRM Consulting',
                pageDescription: 'Centaurea is ready to share and help you in making use of different technologies and' +
                ' building agile and scalable systems.',
                pageKeywords: 'database consulting, big data consulting, cloud consulting, centaurea consulting, centaurea consulting services, ' +
                'data consulting, data consulting services, database consulting, database consulting services, mongodb consulting, technology consulting'
            },this._masterPath);
    },

    'corporate-it-training': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/corporate-trainings.html',
                pageTitle: 'Corporate IT Training',
                pageDescription: 'Centaurea is ready to teach your team how to use the most modern technologies, share the best practices and go' +
                'through the typical problems and development scenarios.',
                pageKeywords: 'corporate training, it training'
            },this._masterPath);
    },

    'cto-as-a-service': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/cto-as-a-service.html',
                pageTitle: 'Virtual CTO, CTO Services, CTO as a service',
                pageDescription: 'Centaurea is ready to offer you the best specialists fo the role of virtual CTO or VP of development.',
                pageKeywords: 'CTO as a service, virtual CTO, virtual VP of development, CTO services'
            },this._masterPath);
    },

    'dedicated-team': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/dedicated-team.html',
                pageTitle: 'Dedicated Team',
                pageDescription: 'Centaureа is ready to offer you a team of highly qualified professionals with' +
                ' necessary skills and deep knowledge needed to achieve the client`s goals while spending reasonable amount of resources.',
                pageKeywords: 'dedicated team'
            },this._masterPath);
    },

    'managed-services': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/managed-services.html',
                pageTitle: 'Database, Application and Infrastructure, Managed Services',
                pageDescription: 'Stable infrastructure and safeness of data is an essential requirement for any business. Protect your data and keep your system healthy and well performed with our help.',
                pageKeywords: 'managed services'
            },this._masterPath);
    },

    'mongodb-as-a-service': function(){
        return this._loadPageAndCompile(
            {
                pagePath: './public/partials/services/mongodb-as-a-service.html',
                pageTitle: 'MongoDB as a Service',
                pageDescription: 'Discover MongoDB which simply works. No problems. No backups. No scaling issues. For' +
                ' any size of data and any performance requirements.',
                pageKeywords: 'mongodb services, mongodb as a service'
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