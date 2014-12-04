var hogan = require('hogan');
var fs = require('fs');

var ServicesController = function (){
};

ServicesController.prototype = {

    development: function(){

        var file = fs.readFileSync('./public/services/development.html', 'utf-8');
        template = hogan.compile(file);
        var model = {
            technologyName:"MongoDB",
            bodyText: "can help with anything companies need related to MongoDB. Everything from the application code, prototype,"+
            "design, and development, all the way to deployment of the application within your architecture." +
            "Specifically our team can help clients with application design, schema design, deployment architecture,"+
            "enterprise scaling, query optimization, benchmarking and much more."
        };

        return template.render(model);

    }

};

module.exports = ServicesController;