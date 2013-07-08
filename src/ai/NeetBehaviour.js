function NeetBehaviour(actor) {
    NeetBehaviour.superclass.constructor.call(this, actor);
    this.lastAction = "";
    this.lurkTargets = ["smallStore", "library", "park"];
}

NeetBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        if (this.defaultActions()) {
            return;
        }
        
        if (this.goOutside()) {
            return;
        }
        
        var lurkTargets = this.lurkTargets.slice();
        for (var i=0; i < lurkTargets; ++i) {
            if (lurkTargets[i] == this.lastAction) {
                lurkTargets.splice(i,1);
                break;
            }
        }
        var targetBuildingType = randomElementInArray(lurkTargets);
        
        if (targetBuildingType && this.actor.map) {
            var building = this.actor.map.findBuildingOfType(targetBuildingType);
            if (building) {
                this.actor.path.toNode(building.interiorNode || building.node);
                this.lastAction = targetBuildingType;
            }
        }
        // that's all NEETs do
        this.actor.addActionToPath(new Action({
            name:"relax", 
            duration:randomInRange(7, 32)
        }));
    }
});
