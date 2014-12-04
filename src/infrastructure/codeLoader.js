
var buffer = {};

function addFunctionExtensions(){
    buffer.meta = Function.prototype.meta;
    Function.prototype.meta = function(metadata){
        this.meta = metadata;
        return this;
    }
};

function removeFunctionExtensions(){
    Function.prototype.meta = buffer.meta;
};

function CodeLoader(settings){
    this.settings = settings;
};

CodeLoader.prototype = {
    loadController: function(name){

        var controllerPostfix = "Controller";
        var controllerFullPath = this.settings["controllerFolderPath"] + name + controllerPostfix;

        addFunctionExtensions();
        var result = this._loadCodeFromSource(controllerFullPath);
        removeFunctionExtensions();

        return result;
    },

    _loadCodeFromSource: function(path){
        //There is issue with file resolving. Adding very ugly hack to avoid it. Need open issue for that
        return require(path.replace('./', '../../'));
    }
};

module.exports = CodeLoader;

