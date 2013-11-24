function Behaviour(actor) {
    this.actor = actor;
}

Behaviour.inherit(Object, {
    findNewAction: function() {
        
    },
    
    defaultActions: function() {
        var _this = this;
        
        // sleep
        if (this.actor.wakefulness < 20) {
            var sleepRequired = 100 - this.actor.wakefulness;
            this.actor.path.toNodeOfTypeInBuilding(this.actor.home, "sleep");
            this.actor.addActionToPath(new Action({
                name: "sleep",
                duration: sleepRequired/2,
                wakefulness:sleepRequired,
                blocking: true
            }));
            return true;
        // buy new food
        } else if (this.actor.household.requiresResourceAddition()) {
            // carries more stuff from the store if awake
            this.actor.household.plannedResourceAddition = (this.actor.household.maxResources -
                                                            this.actor.household.resources) *
                                                            (100-this.actor.wakefulness);
            var shop = this.actor.path.toBuildingOfType("smallStore");
	    if (!shop) {
		return false;
	    }
	    this.actor.path.toNodeOfTypeInBuilding(shop, "buy");
            this.actor.addActionToPath(new Action({
                name: "shopping",
                duration: randomInRange(5, 15),
                onEnd: function() {
		    _this.actor.path.toNodeOfTypeInBuilding(_this.actor.home, "food");
                    _this.actor.addActionToPath(new Action({
                        name: "refillResources",
                        duration: 5,
                        onEnd: function() {
                            _this.actor.household.refillResources();
                        }
                    }));
                }
            }));
            console.log("go shopping");
            return true;
        // eat
        } else if (this.actor.home.interiorNode == this.actor.interiorNode && this.actor.satiety < 50) {
            var resourcesEaten = Math.min(100-this.actor.satiety, this.actor.household.resources)
            this.actor.household.resources -= resourcesEaten;
            this.actor.addActionToPath(new Action({
                name:"eat",
                satiety:resourcesEaten,
                duration: resourcesEaten/5
            }));
            return true;
        }
        
        return false;
    },
    
    goOutside: function() {
        if (this.actor.map != Application.instance.game.outdoorMap) {
            this.actor.path.toMap(Application.instance.game.outdoorMap);
            this.actor.addActionToPath(new Action({name:"goOutside"}))
            return true;
        }
        return false;
    },
    
    reset: function() {
    
    }
});
