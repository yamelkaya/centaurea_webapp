var hogan = require('hogan');
var fs = require('fs');

var TechnologiesController = function (){
};

TechnologiesController.prototype = {

    mongodb: function(){

        var file = fs.readFileSync('./public/technologies/mongodb.html', 'utf-8');
        template = hogan.compile(file);
        var model = {
            technologyName:"MongoDB",
            bodyText: "can help with anything companies need related to MongoDB. Everything from the application code, prototype,"+
            "design, and development, all the way to deployment of the application within your architecture." +
            "Specifically our team can help clients with application design, schema design, deployment architecture,"+
            "enterprise scaling, query optimization, benchmarking and much more."
        };

        return template.render(model);

    },

    couchdb: function(){

        var file = fs.readFileSync('./public/technologies/master-technologies.html', 'utf-8');
        template = hogan.compile(file);
        var model = {
            technologyName:"CouchDB",
            bodyText: "can help with anything companies need related to CouchDB. Everything from the application code, prototype,"+
            "design, and development, all the way to deployment of the application within your architecture." +
            "Specifically our team can help clients with application design, schema design, deployment architecture,"+
            "enterprise scaling, query optimization, benchmarking and much more."
        };

        return template.render(model);

    }

};

module.exports = TechnologiesController;