function Actor(node) {
    Actor.superclass.constructor.call(this);
    this.setAtNode(node)
    this.lastNode = node;

    this.path = [];
    this.speed = 1;
    
    this.isMouseEnabled = true;

    this.sprite = new cc.Sprite({
        file: "images/person.png"
    });
    
    this.portrait = "images/portrait.png";
    
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
                    if (node.position.x > this.position.x + this.speed) {
                        this.position.x += this.speed;
                    } else if (node.position.x < this.position.x  - this.speed) {
                        this.position.x -= this.speed;
                    }
                    if (node.position.y > this.position.y + this.speed) {
                        this.position.y += this.speed;
                    } else if (node.position.y < this.position.y - this.speed){
                        this.position.y -= this.speed;
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
});
