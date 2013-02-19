function Actor(node, spriteName, household) {
    Actor.superclass.constructor.call(this);
    Observable.prototype.constructor.call(this); // evil multi inheritance
    this.setAtNode(node)
    this.lastNode = node;
    
    if (household) {
        this.home = household.home;
    }
    
    this.firstName = "Bobby";
    this.familyName = "Tables";
    this.role = "neet";
    this.job = null;

    this.path = [];
    this.speed = 1.5;
    this._action = null;
    this.actionHistory = [];
    this.satiety = 100;
    this.wakefulness = 100;
    
    this.influence = 0.0; // influence of the player
    this.suspicion = 0.0; // suspicion against the player
    
    this.portrait = spriteName || "images/portrait.png";
    spriteName = spriteName || "images/person.png";
    this.sprite = new cc.Sprite({
        file: spriteName
    });
    
    this.baseHireCost = 5;
    this.money = 15;
    
    
    this.addChild(this.sprite);
    this.contentSize = new cc.Size(this.sprite.contentSize.width, this.sprite.contentSize.height)
}

Actor.inherit(cc.Node, {
    maxActionHistoryLength: 15,

    update: function(dt) {
        
        if (this.action) {
            this.action.progress += dt;
            
            if (this.action.update) {
                this.action.update(dt);
            }
            
            if (this.action.isFinished()) {
                this.addActionToHistory(this.action);
                // lazy default hunger incr.
                this.satiety += this.action.satiety; 
                this.wakefulness += this.action.wakefulness;
                
                if (this.action.onEnd) {
                    this.action.onEnd.call(this);
                }
                
                this.action = this.action.next || null;
            }
        } else if (this.path.length > 0) {
            var node = this.path[0].node;
            var action = this.path[0].action;
            
            if (action) {
                this.action = action
                this.path[0].action = null;
            } else if (node) {
                if (node.map != this.node.map) {
                    this.setAtNode(node);
                    
                    return;
                }
            
                var xDistance = Math.abs(node.position.x - this.position.x);
                var yDistance = Math.abs(node.position.y - this.position.y);
                
                var xStepsRequired = xDistance / this.speed;
                var yStepsRequired = yDistance / this.speed;
                
                var deltaX = this.speed;
                var deltaY = this.speed;
                
                // eat my proper diagonal movement!
                if (xStepsRequired > yStepsRequired && yStepsRequired != 0) {
                    deltaY *= yStepsRequired/xStepsRequired;
                } else if (yStepsRequired > xStepsRequired && xStepsRequired != 0) {
                    deltaX *= xStepsRequired/yStepsRequired;
                }
                
                if (xDistance < this.speed*2 &&
                    yDistance < this.speed*2) {
                    
                    this.setAtNode(node);
                    this.path.splice(0,1);
                    this.arriveOnNode(node);
                    
                    if (this.path.length == 0) {
                        this.arriveOnFinalDestination();
                    }
                } else {
                    // move
                    if (node.position.x > this.position.x + deltaX) {
                        this.position.x += deltaX;
                    } else if (node.position.x < this.position.x  - deltaX) {
                        this.position.x -= deltaX;
                    }
                    if (node.position.y > this.position.y + deltaY) {
                        this.position.y += deltaY;
                    } else if (node.position.y < this.position.y - deltaY){
                        this.position.y -= deltaY;
                    }
                }
            } else {
                this.path.splice(0,1);
            } 
        } else {
            if (this.behaviour) {
                this.behaviour.findNewAction();
            }
        }
    },
    
    get hirecost() {
        return this.baseHireCost * (1-(this.influence || 0));
    },
    
    get badge() {
        return this._badge;
    },
    
    set badge(badge) {
        if (this.badge) {
            this.removeChild(this.badge);
        }
        this._badge = badge;
        if (badge) {
            this.addChild(badge);
        }
    },
    
    otherActorArrivedAtNode: function(other) {
        if (this.action && this.action.onOtherArrived) {
            this.action.onOtherArrived.call(this, other);
        }
    },
    
    arriveOnNode: function(node) {
        var _this = this;
        $.each(node.actors, function() {
            this.otherActorArrivedAtNode(_this);
        });
    },
    
    arriveOnFinalDestination: function() {
    
    },
    
    findPathToBuildingType: function(buildingType) {
        var building = this.map.findClosestBuildingOfType(buildingType, this.node);
        //var building = this.map.findBuildingOfType(buildingType);
        if (building) {
            this.findPath(building.node);
        }
    },
    
    transfereMoney: function(other, sum) {
        sum = Math.min(this.money, sum);
        other.money += sum;
        this.money -= sum;
        //console.log("transfered $" + sum + " from " + this.getFullName() +
        //            " to " + other.getFullName());
    },
    
    isInSameHousehold: function(other) {
        return other.household == this.household;
    },
    
    addActionToHistory: function(action) {
        if (this.actionHistory.length > this.maxActionHistoryLength) {
            this.actionHistory.splice(0,1);
        }
        this.actionHistory.push(action);
    },
    
    setAtNode: function(node) {
        if (this.node) {
            this.node.removeActor(this);
            
            if (this.node.map != node.map) {
                this.node.map.removeActor(this);
                node.map.addActor(this);
            }
        }
        
        this.position = new cc.Point(node.position.x, node.position.y);
        this.node = node;
        this.node.addActor(this);
    },
    
    findPath: function(node) {
        if (node != this.node) {
            this.path = this.node.findPath(node);
        }
    },
    
    /// replace the current action and set the next action to the current
    interjectAction: function(action) {
        this.action = action;
        this.insertAction(action);
    },
    
    get action() {
        return this._action;
    },
    
    set action(action) {
        this._action = action;
        this.fireEvent("actionChanged", {action: action});
    },
    
    /// insert given action at given index. If index is not provided insert at 0
    insertAction: function(action, index) {
        index = index || 0;
        this.path.splice(index, 0, {node:null, action:action});
    },
    
    addActionToPath: function(action) {
        this.path.push({node:null, action:action});
    },
    
    addNodeToPath: function(node) {
        this.path.push({node:node});
    },
    
    getFullName: function() {
        return this.firstName + " " + this.familyName;
    },
    
    /// returns the name of the active action, or the one of the next planned
    getActionName: function() {
        if (this.action) {
            return this.action.name;
        }
        
        for (var i=0; i < this.path.length; ++i) {
            if (this.path[i].action) {
                return this.path[i].action.name;
            }
        }
        
        return "nothing"
    }
});

// some evil prototype hacking. Friends of linear inheritance look away now!
Actor.prototype.fireEvent = Observable.prototype.fireEvent;
Actor.prototype.addObserver = Observable.prototype.addObserver;
Actor.prototype.removeObserver = Observable.prototype.removeObserver;
