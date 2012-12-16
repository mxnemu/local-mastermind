function Behaviour(actor) {
    this.actor = actor;
}

Behaviour.inherit(Object, {
    findNewAction: function() {
        
    },
    
    defaultActions: function() {
        if (this.actor.household && this.actor.household.requiresResourceAddition()) {
            
            this.actor.findPathToBuildingType("smallShop");
            this.actor.findPathTo(this.actor.home.node);
            this.actor.addActionToPath({
                name: "restoreResources"
            })
        }
        return false;
    },
    
    reset: function() {
    
    }
});


function ThugBehaviour(actor) {
    ThugBehaviour.superclass.constructor.call(this, actor);
}

ThugBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        var _this = this;
        var targetBuildingType = "smallShop";
        if (this.lastAction != "library") {
           targetBuildingType = "library";
        } else
        
        if (targetType && this.actor.map) {
            var building = this.actor.map.findBuildingOfType(targetBuildingType);
            if (building) {
                this.actor.findPath(building.node);
                this.lastAction = targetBuildingType;
            }
        }
        
        
        // that's all thugs do
        this.actor.addActionToPath({
            name:"lookForVictims", 
            duration:randomInRange(30, 52),
            onOtherArrives: function(other) {
                // i'd just like to interject for a moment
                _this.interjectAction({
                    name:"haress",
                    duration: 5
                });
                other.insertAction({
                    name:"getHaressed",
                    duration: 5,
                    onEnd: function() {
                        var harressedMoney = 5;
                        this.transfereMoney(harressedMoney);
                    }
                });
            }
        });
    }
});

function WorkerBehaviour(actor) {
    WorkerBehaviour.superclass.constructor.call(this, actor);
}

WorkerBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        // search a new goal
        if (this.actor.job) {
            //this.actor.findPath(this.actor.job.node);
            //this.actor.addActionToPath({name:"work", duration:this.actor.job.worktime});
        }
    }
});

function NeetBehaviour(actor) {
    NeetBehaviour.superclass.constructor.call(this, actor);
    this.lastAction = "";
}

NeetBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        if (this.defaultActions()) {
            return;
        }
        
        var targetBuildingType = "park";
        if (this.lastAction != "library") {
           targetBuildingType = "library";
        }
        
        if (targetBuildingType && this.actor.map) {
            var building = this.actor.map.findBuildingOfType(targetBuildingType);
            if (building) {
                this.actor.findPath(building.node);
                this.lastAction = targetBuildingType;
            }
        }
        // that's all NEETs do
        this.actor.addActionToPath({name:"relex", duration:randomInRange(7, 32)});
    }
});

function PoliceBehaviour(actor) {
    PoliceBehaviour.superclass.constructor.call(this, actor);
}

PoliceBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        
    }
});
