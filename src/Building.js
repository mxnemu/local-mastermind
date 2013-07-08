function Building(spriteName, map, node) {
    Building.superclass.constructor.call(this);
    this.node = new Node();
    this.map = null;
    this.label = 0;
    this.buildingType = "none";
    
    this.worktime = 20;
    this.lowerClassJobs = 0;
    this.middleClassJobs = 0;
    this.upperClassJobs = 0;
    
    this.lowerClassHome = 0;
    this.middleClassHome = 0;
    this.upperClassHome = 0;

    this.lowerClassWorkers = [];
    this.middleClassWorkers = [];
    this.upperClassWorkers = [];
    
    if (spriteName) {
        this.portrait = spriteName;
        this.sprite = new cc.Sprite({file: spriteName});
        this.contentSize = new cc.Size(this.sprite.contentSize.width,
                                   this.sprite.contentSize.height);
    }
}

Building.inherit(cc.Node, {

    get node() {
        return this._node;
    },

    set node(node) {
        if (node) {
            node.building = this;
        }
        this._node = node;
    },

    restore: function(data) {
        this.label = data.label;
        this.buildingType = data.buildingType;
        this.sprite = new cc.Sprite({file: data.sprite});
        this.addChild(this.sprite);
        this.portrait = data.sprite;
        this.contentSize = new cc.Size(this.sprite.contentSize.width,
                                       this.sprite.contentSize.height);
        
        this.worktime = data.worktime;
        this.lowerClassJobs = data.lowerClassJobs;
        this.middleClassJobs = data.middleClassJobs;
        this.upperClassJobs = data.upperClassJobs;
        
        this.lowerClassHome = data.lowerClassHome;
        this.middleClassHome = data.middleClassHome;
        this.upperClassHome = data.upperClassHome;
        
        if (data.interior) {
            this.createInterior(data.interior);
        }
    },
    
    update: function(dt) {
        if (this.interiorMap) {
            this.interiorMap.update(dt);
        }
    },
    
    hasJobFor: function(actor) {
        return (actor.socialClass == "lower" && 
            this.lowerClassJobs - this.lowerClassWorkers.length > 0) ||
            (actor.socialClass == "middle" && 
            this.middleClassJobs - this.middleClassWorkers.length > 0) ||
            (actor.socialClass == "upper" && 
            this.upperClassJobs - this.upperClassWorkers.length > 0);
    },
    
    hire: function(actor) {
        if (this.hasJobFor(actor)) {
            if (actor.socialClass == "lower") {
               this.lowerClassWorkers.push(actor); 
            } else if (actor.socialClass == "middle") {
               this.middleClassWorkers.push(actor);
            } else if (actor.socialClass == "upper") {
               this.upperClassWorkers.push(actor);
            }
            actor.job = new Job(actor, this);
            return true;
        }
        return false;
    },
    
    getFullName: function() {
        return this.label;
    },
    
    createInterior: function(data) {
        var _this = this;
        this.interiorMap = new Map();
        this.interiorMap.building = this;
        var xOffset = 0, yOffset = 0;
        
        if (data.sprite) {
            this.interiorSprite = new cc.Sprite({file:data.sprite});
            this.interiorSprite.zOrder = G.interiorZ;
            this.interiorMap.addSprite(this.interiorSprite);
            xOffset = -this.interiorSprite.contentSize.width /2;
            yOffset = this.interiorSprite.contentSize.height /2;
        }
        
        if (data.nodes && data.nodes.length > 0) {
            var interiorNodes = [];
            $.each(data.nodes, function() {
                var connections = [];
                if (this.connections) {
                    $.each(this.connections, function() {
                        connections.push(interiorNodes[this]);
                    });
                }
                var node = new Node(
                    this.x + xOffset,
                    -this.y + yOffset,
                    connections,
                    this.type
                );
                node.map = _this.interiorMap;
                interiorNodes.push(node);
            });
            this.interiorNode = interiorNodes[0];
            this.interiorNode.addConnection(this.node);
            this.interiorMap.setNodes(interiorNodes);
        } else {
            this.interiorNode = new Node(0,0, [this.node]);
            this.interiorNode.map = this.interiorMap;
        }
    }

});
