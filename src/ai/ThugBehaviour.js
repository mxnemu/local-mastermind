
function ThugBehaviour(actor) {
    ThugBehaviour.superclass.constructor.call(this, actor);
    this.lurkTargets = ["smallStore", "library", "park", "random"];
}

ThugBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        if (this.defaultActions()) {
            return;
        }
    
        var _this = this;
        
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
        
        if (targetBuildingType == "random") {
            //TODO next line node can be null error
            this.actor.path.toNode(randomElementInArray(this.actor.map.nodes));
            this.lastAction = targetBuildingType;
        } else if (targetBuildingType && this.actor.map) {
            var building = this.actor.map.findBuildingOfType(targetBuildingType);
            if (building) {
                if (building.interiorNode && building.isPublic) {
                    this.actor.path.toNode(building.interiorNode);    
                } else {
                    this.actor.path.toNode(building.node);
                }
                this.lastAction = targetBuildingType;
            }
        }
        
        
        // that's all thugs do
        this.actor.addActionToPath(new Action({
            name:"lookForVictims", 
            duration:randomInRange(30, 52),
            onOtherArrived: function(other) {
                if (this.isInSameHousehold(other) || other.role == "thug" || other.role == "policeman") {
                    return; // thugs don't steal from thugs, family or police
                }
                
                // i'd just like to interject for a moment
                this.interjectAction(new Action({
                    name:"harass",
                    heat: 100,
                    duration: 5
                }));
                other.interjectAction(new Action({
                    name:"gettingHarassed",
                    duration: 5,
                    onEnd: function() {
                        var harressedMoney = 5;
                        this.transfereMoney(_this.actor, harressedMoney);
                    }
                }));
            }
        }));
    }
});
