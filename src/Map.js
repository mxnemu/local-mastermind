function Map() {
    Map.superclass.constructor.call(this);
    this.actors = [];
    this.buildings = [];
    this.nodes = [];
    this.sprites = [];
    this.connectionLines = [];
    this.cameraStart = new cc.Point(0,0);
}

Map.inherit(cc.Layer, {

    restCamera: function() {
        this.position = new cc.Point(this.cameraStart.x, this.cameraStart.y)
    },
    
    addSprite: function(sprite) {
        this.sprites.push(sprite);
        this.addChild(sprite);
    },
    
    addActor: function(actor) {
        this.actors.push(actor);
        this.addChild(actor);
    },
    
    addBuilding: function(building) {
        this.buildings.push(building);
        this.addChild(building);
    },
    
    update: function() {
        for (var i=0; i < this.actors.length; ++i) {
            this.actors[i].update();
        }
        for (var i=0; i < this.buildings.length; ++i) {
            this.buildings[i].update();
        }
    },
    
    setNodes: function(nodes) {
        this.nodes = nodes;
        var _this = this;
        
        $.each(this.nodes, function() {
            var nodeA = this;
            _this.addChild(this);
            $.each(this.connections, function() {
                _this.addConnectionLine(nodeA, this);
            });
        });
        
    },
    
    addConnectionLine: function(nodeA, nodeB) {
        var _this = this;
        var exists = false;
        $.each(this.connectionLines, function() {
            if (this.nodeA == nodeA && this.nodeB == nodeB ||
                this.nodeA == nodeB && this.nodeB == nodeA) {
                exists = true;
                return;
            }
        });
        if (!exists) {
            var line = new ConnectionLine(nodeA, nodeB);
            this.connectionLines.push(line);
            _this.addChild(line);
            console.log("line");
        }
    },
    
    getActorOnPosition: function(point) {
        return this.getEntityOnPosition(point, "actor");
    },
    
    
    
    getEntityOnPosition: function(point, entityType) {
        entityType = entityType || "actor";
        var entities;
        if (entityType == "actor") {
            entities = this.actors;
        } else if (entityType == "building") {
            entities = this.buildings;
        } else if (entityType == "node") {
            entities = this.nodes;
        }
        
        point.x -= this.position.x;
        point.y -= this.position.y;
        
    
        var entity = null;
        $.each(entities, function() {
            var xDistance = Math.abs(point.x - this.position.x);
            var yDistance = Math.abs(point.y - this.position.y);
            if (xDistance < this.contentSize.width/2 &&
                yDistance < this.contentSize.height/2) {
                
                entity = this;
                return;
            }
        });
        return entity;
    },
    
    
    
    
    getClosestNodeToPosition: function(x,y) {
        var closestNode = null;
        var closestDistance = -1;
        $.each(this.nodes, function() {
            var distance = ((this.x - x) + (this.y - y))/2;
            if (closestDistance == -1 || distance < closestDistance) {
                closestNode = this;
                closestDistance = distance;
            }
        });
        
        return closestNode;
    },
    
    getFreeNodesOfType: function(type) {
        var returnArray = [];
        $.each(this.nodes, function() {
            if (this.type == type && !this.user) {
                returnArray.push(this);
            }
        });
        return returnArray;
    },
    
    getClosestFreeNodeOfType: function(type) {
        var nodes = getFreeNodesOfType(type);
    }
})
