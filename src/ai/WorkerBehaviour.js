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
            this.actor.path.toNodeOfTypeInBuilding(this.actor.job, "work");
            this.actor.addActionToPath(new Action({
                name:"work",
                duration:this.actor.job.worktime,
                wakefulness: -(this.actor.job.worktime*2),
                lock: new Lock(this.actor, 150000)
            }));
        }
    }
});
