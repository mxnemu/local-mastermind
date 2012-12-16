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

    update: function() {
        if (this.path.length > 0) {
            var node = this.path[0].node;
            
            if (node) {
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
                    
                    this.position.x = node.position.x;
                    this.position.y = node.position.y;
                    
                    this.lastNode = node;
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
            }
        }
    },
    
    arrive: function() {
    
    },
    
    setAtNode: function(node) {
        this.position = new cc.Point(node.position.x, node.position.y);
        this.node = node;
    },
    
    addNodeToPath: function(node) {
        this.path.push({node:node});
    },
    
    getFullName: function() {
        return this.firstName + " " + this.familyName;
    }
});
