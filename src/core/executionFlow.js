var _ = require("../infrastructure/jsUtilHelper");
var er = require("./errors");

function Task(func, order, context, resolver){
    
    this.func = func;
    this.order = order;
    this.context = context;
    this.resolver = resolver;
    
};

Task.prototype.invoke = function(){
    var result = null;
    try{
        var signature = this.resolver.readSignature(this.func);
        if(_.isEmpty(signature)){
            result = this.func.call();
        }else{
            var data = [];
            var self = this;

            _.each(signature, function(elem){
                data.push(self.resolver.resolve(elem));
            })

            result = this.func.apply(null, data);
        }
    }
    catch(e){
        //TODO:Implement error handling logic according framework policies
        console.log(e);
    }

    this.context.res.executionFlowResult.push(result);

};

function FilterTask(func, order, context, resolver){

};

_.inherit(FilterTask, Task);

function ControllerTask(func, order, context, resolver, method){

}

_.inherit(ControllerTask, Task);

function AttributeTask(func, order, context, resolver){

}

_.inherit(AttributeTask, Task);

function ExecutionFlow(dependencyResolver, context){
    
    if(!dependencyResolver){
        throw new Error("Injector is required.");
    }

    if(!context){
        context = {req: {}, res:{}}
    }
    
    this.resolver = dependencyResolver;
    this.tasks = [];
    this.size = 0;
    this.executionContext = context;
    this.executionContext.res.executionFlowResult = [];
};

ExecutionFlow.buildControllerFlow = function(resolver, filters, controllerMetadata, request, response, uriData){
    var flow = new ExecutionFlow(resolver, {req: request, res: response});

    function addToFlow(collection){
        if(collection && _.isArray(collection)){
            _.forEach(collection, function(elem){
                flow.append(elem);
            });
        }
    }

    addToFlow(filters);
    addToFlow(controllerMetadata.attr);

    var actionMetadata = controllerMetadata.actionsData[uriData.action];
    addToFlow(actionMetadata.attr);

    var ctrlInstance = new controllerMetadata.controller();
    ctrlInstance.requestData = uriData;

    flow.append(function(){
        return actionMetadata.func.apply(
            ctrlInstance,
            arguments);
    });

    return flow;
};

ExecutionFlow.prototype = {

    append: function(func){
        var taskCtor;

        switch(func.type){
            case "ctrl":
                taskCtor = ControllerTask;
                break;
            case "filter":
                taskCtor = FilterTask;
                break;
            case "attribute":
                taskCtor = AttributeTask;
                break;
            default:
                taskCtor = Task;
        }

        this.tasks.push(new taskCtor(func, ++this.size, this.executionContext, this.resolver));

    },
    
    execute: function(){

        _.forEach(this.tasks, function(task){
           task.invoke(); 
        });   

    }

};

module.exports = ExecutionFlow;
