var _ = require('./../infrastructure/jsUtilHelper');
var Router = require('./routing');
var ControllerFactory = require("./controllerFactory");
var ExecutionFlow = require("./executionFlow");
var DependencyResolver = require("../infrastructure/dependencyResolver");
var Logger = require('./../infrastructure/logger');
var http = require('http');
var FileServer = require('node-static').Server;

var Application = function(configPath){

    this.logger = new Logger();

    if(_.isNullOrUndefined(configPath)){
        this.initDefault();
    }else{
        this.initWithConfig(configPath);
    }

    var that = this;
    this.server = http.createServer(function(request, response){
        try {
            return that.handleRequest.call(that, request, response)
        }catch(exception){
            process.stdout.write("Request to: " + request.url + '\n');
            process.stdout.write(exception + '\n');
            response.writeHead(500, {"Content-Type": "text/html"});
            response.end("Server error occurred. We already fixing it.");
        }
    });
    this.fileServer = new FileServer('.');
    this.controllerFactory = new ControllerFactory(this.settings);
    this.dependencyResolver = new DependencyResolver();
    this._initFilters();
};

Application.prototype = {

    initDefault: function(){

        this.settings = {
            "serverPort": 5000,
            "staticContent": "/public"
        };
        this.router = new Router(this.settings);
        this.server = http.createServer(this.handleRequest);

    },

    initWithConfig: function(path){

        var fs = require('fs');

        try {

            var data =  fs.readFileSync(path).toString();
            this.settings = JSON.parse(data);
            this.router = new Router(this.settings);

        }catch(err) {

            this.logger.logError(err);
            throw err;

        };

    },

    handleRequest: function(request, response){

        var that = this;
        function isStaticUrl(url) {
            return url.indexOf(that.settings.staticContent) == 0 ||
                url.indexOf('favicon') > -1
        }


        if(isStaticUrl(request.url)){

            this.fileServer.serve(request, response).addListener('error', function (err) {
                process.stderr.write("Error serving " + request.url + " - " + err.toString() +'\n');
                response.writeHead(404, {"Content-Type": "text/html"});
                response.end("Content not found");
                //throw new Error(err);
            });

        }else{

            var uriData = this.router.parseURI(request);
            var controllerMetadata = this.controllerFactory.getControllerMetadata(uriData.controller);

            ExecutionFlow.buildControllerFlow(
                this.dependencyResolver,
                this.filters,
                controllerMetadata,
                request,
                response,
                uriData).execute();

            this._sendResponse(response);

        }

    },

    run: function(){
        this.server.listen(this.settings.serverPort);
    },

    _initFilters: function(){
        this.filters = [];
    },

    _sendResponse: function(response){
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end(response.executionFlowResult[0]);
    }

};

module.exports = Application;
