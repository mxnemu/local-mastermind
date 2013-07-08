function PoliceBehaviour(actor) {
    PoliceBehaviour.superclass.constructor.call(this, actor);
    this.ignorance = actor.socialClass == "lower" ? 30 : 15;
    
    var _this = this;
    // that line...
    //Application.instance.game.outdoorMap.events.addObserver("heat", function(event) {
    // TODO remove workaround that could take indoor maps and get the real outdoor map
    this.actor.map.events.addObserver("heat", function(event) {
        if (_this.actor.behaviour == _this) {
            // TODO collect events for a period of time and then choose the closest
            if (event.heat > _this.ignorance) {
                var nextAction = _this.actor.path.nextPlannedAction();
                if (nextAction && nextAction.name == "patrol") {
                    _this.actor.path.toNode(event.node);
                    _this.actor.addActionToPath(new Action({
                        name:"fightCrime",
                        duration:randomInRange(2, 6),
                        onStart:function() {
                            for (var i=0; i < _this.actor.node.actors.length; ++i) {
                                var other = _this.actor.node.actors[i];
                                if (other.action && other.action.heat > _this.ignorance) {
                                    var prison = _this.actor.map.findBuildingOfType("policeStation");
                                    _this.actor.path.toNodeOfTypeInBuilding(prison, "cell");
                                    _this.actor.addActionToPath(new Action({
                                        name:"arrestCriminal"
                                    }));
                                    
                                    other.path = _this.actor.path.copy(other);
                                    if (other.path.hasSteps()) {
                                        other.path.steps.splice(other.path.length-1,1);
                                    }
                                    other.addActionToPath(new Action({
                                        name:"stayInPrison",
                                        duration: 300,
                                        lock: new Lock(other, 150000)
                                    }));
                                }
                            }
                        }
                    }));
                    //TODO take heat-causing actors to prison, or take money
                }
            }
        } else {
            Application.instance.game.outdoorMap.events.removeObserver("heat", this);
        }
    });
    
}

PoliceBehaviour.inherit(Behaviour, {
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
        
        // TODO check suspicious heat from map
        if (this.actor.map) {
            this.actor.path.toNode(randomElementInArray(this.actor.map.nodes));
            
            this.actor.addActionToPath(new Action({
                name:"patrol",
                duration:randomInRange(2, 6)
            }));
        }
    }
});
