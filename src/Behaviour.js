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
            this.actor.findPathToNodeTypeInBuilding(this.actor.home, "sleep");
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
            this.actor.findPathToBuildingType("smallStore");
            this.actor.addActionToPath(new Action({
                name: "shopping",
                duration: randomInRange(5, 15),
                onEnd: function() {
                    _this.actor.findPath(_this.actor.home.interiorNode);
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
    
    reset: function() {
    
    }
});


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
        
        // go outside
        if (this.actor.map != Application.instance.game.outdoorMap) {
            this.actor.findPathToMap(Application.instance.game.outdoorMap);
            this.actor.addActionToPath(new Action({name:"goOutside"}))
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
            this.actor.findPath(randomElementInArray(this.actor.map.nodes));
            this.lastAction = targetBuildingType;
        } else if (targetBuildingType && this.actor.map) {
            var building = this.actor.map.findBuildingOfType(targetBuildingType);
            if (building) {
                if (building.interiorNode && building.isPublic) {
                    this.actor.findPath(building.interiorNode);    
                } else {
                    this.actor.findPath(building.node);
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
                    duration: 5
                }));
                other.insertAction(new Action({
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
            this.actor.findPathToMap(Application.instance.game.outdoorMap);
            this.actor.addActionToPath(new Action({name:"goOutside"}))
            return;
        }
        
        if (this.actor.job) {
            this.actor.findPathToNodeTypeInBuilding(this.actor.job, "work");
            this.actor.addActionToPath(new Action({
                name:"work",
                duration:this.actor.job.worktime,
                wakefulness: -(this.actor.job.worktime*2),
                blocking: true
            }));
        }
    }
});

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
        
        // go outside
        if (this.actor.map != Application.instance.game.outdoorMap) {
            this.actor.findPathToMap(Application.instance.game.outdoorMap);
            this.actor.addActionToPath(new Action({name:"goOutside"}))
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
                this.actor.findPath(building.interiorNode || building.node);
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

function PoliceBehaviour(actor) {
    PoliceBehaviour.superclass.constructor.call(this, actor);
    this.ignorance = actor.socialClass == "lower" ? 30 : 15;
}

PoliceBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        if (this.defaultActions()) {
            return;
        }
        
        // go outside
        if (this.actor.map != Application.instance.game.outdoorMap) {
            this.actor.findPathToMap(Application.instance.game.outdoorMap);
            this.actor.addActionToPath(new Action({name:"goOutside"}))
            return;
        }
        
        // TODO check suspicious heat from map
        if (this.actor.map) {
            this.actor.findPath(randomElementInArray(this.actor.map.nodes));
            
            this.actor.addActionToPath(new Action({
                name:"patrol",
                duration:randomInRange(2, 6)
            }));
        }
    }
});
