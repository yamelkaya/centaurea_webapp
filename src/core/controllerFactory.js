var CodeLoader = require('./../infrastructure/codeLoader');
var _ = require('./../infrastructure/jsUtilHelper');

var ControllerMetadata = (function(){

    function readSignature(func){

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
        if(result === null){
            result = []
        }
        return result;

    };

    var ActionMetadata = function(func){
        this.name = func.name;
        this.args = readSignature(func);
        this.attr = func.meta;
        this.func = func;
    };

    function ControllerMetadata(ctrl, name) {

        this.controller = ctrl;
        this.readControllerMetadata(name);
        this.readControllerActionsData()

    };

    ControllerMetadata.prototype = {

        readControllerActionsData: function(){
            this.actionsData = {};
            var proto = this.controller.prototype;
            for(var method in proto){
                if(proto.hasOwnProperty(method)){
                    this.actionsData[method] = new ActionMetadata(proto[method]);
                }
            }
        },

        readControllerMetadata: function(name){
            this.name = name;
            this.args = readSignature(this.controller);
            this.attr = this.controller.meta;
        }
    };

    return ControllerMetadata;
})();


var ControllerFactory = function(settings){

    this.settings = settings;
    this.controllers = {};
    this.controllersMetadata = {};
    this.loader = new CodeLoader(this.settings);

};

ControllerFactory.prototype = {

    readControllerFromFile: function (name) {

        this.controllers[name] = this.loader.loadController(name);
        this.controllersMetadata[name] = new ControllerMetadata(this.controllers[name], name);

    },

    getControllerInstance: function(name){

        if (! (name in this.controllers)){
            this.readControllerFromFile(name);
        }

        var constructor = this.controllers[name];
        return new constructor();

    },

    getControllerMetadata: function(name){

        if(!(name in this.controllersMetadata)){
            this.readControllerFromFile(name);
        }
        return this.controllersMetadata[name];

    }

};

module.exports = ControllerFactory;