function WorkerBehaviour(actor) {
    WorkerBehaviour.superclass.constructor.call(this, actor);
}

WorkerBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        if (this.defaultActions()) {
            return;
        }
        
        // go outside
        if (this.actor.map != Application.instance.game.outdoorMap) {
            this.actor.path.toMap(Application.instance.game.outdoorMap);
            this.actor.addActionToPath(new Action({name:"goOutside"}))
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
