function Actor(node, spriteName, household) {
    Actor.superclass.constructor.call(this);
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
    this.speed = 1;
    this.action = null;
    this.actionHistory = [];
    
    this.isMouseEnabled = true;

    this.portrait = spriteName || "images/portrait.png";
    spriteName = spriteName || "images/person.png";
    this.sprite = new cc.Sprite({
        file: spriteName
    });
    
    
    this.addChild(this.sprite);
    this.contentSize = new cc.Size(this.sprite.contentSize.width, this.sprite.contentSize.height)
}

Actor.inherit(cc.Node, {
    maxActionHistoryLength: 15,

    update: function(dt) {
        
        if (this.action) {
            this.action.duration -= dt;
            
            if (this.action.update) {
                this.action.update(dt);
            }
            
            if (this.action.duration <= 0) {
                this.addActionToHistory(this.action);
                console.log("finished" + this.action.name);
                this.action = this.action.next || null;
            }
        } else if (this.path.length > 0) {
            var node = this.path[0].node;
            var action = this.path[0].action;
            
            if (action) {
                this.action = action
                this.path[0].action = null;
            } else if (node) {
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
                    
                    if (this.path.length == 0) {
                        this.arrive();
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
        
            // search a new goal
            if (this.job) {
                this.findPath(this.job.node);
                this.addActionToPath({name:"work", duration:this.job.worktime});
            }
        }
    },
    
    arrive: function() {
    
    },
    
    addActionToHistory: function(action) {
        if (this.actionHistory.length > this.maxActionHistoryLength) {
            this.actionHistory.splice(0,1);
        }
        this.actionHistory.push(action);
    },
    
    setAtNode: function(node) {
        this.position = new cc.Point(node.position.x, node.position.y);
        this.node = node;
    },
    
    findPath: function(node) {
        if (node != this.node) {
            this.path = this.node.findPath(node);
        }
    },
    
    addActionToPath: function(action) {
        this.path.push({node:null, action:action});
    },
    
    addNodeToPath: function(node) {
        this.path.push({node:node});
    },
    
    getFullName: function() {
        return this.firstName + " " + this.familyName;
    }
});
