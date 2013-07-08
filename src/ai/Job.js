function Job(actor, building) {
    this.actor = actor;
    this.workplaceBuilding = building;
}

Job.inherit(Object, {
    findNewAction: function() {
        this.actor.path.toNodeOfTypeInBuilding(this.workplaceBuilding, "work");
        this.actor.addActionToPath(new Action({
            name:"work",
            duration:this.workplaceBuilding.worktime,
            wakefulness: -(this.workplaceBuilding.worktime*2),
            lock: new Lock(this.actor, 150000)
        }));
    }
});
