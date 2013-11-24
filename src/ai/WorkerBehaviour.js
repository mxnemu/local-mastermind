function WorkerBehaviour(actor) {
    WorkerBehaviour.superclass.constructor.call(this, actor);
}

WorkerBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        if (this.defaultActions()) {
            return;
        }
        
        if (this.goOutside()) {
            return;
        }
        
        if (this.actor.job) {
            this.actor.job.findNewAction();
        }
    }
});
