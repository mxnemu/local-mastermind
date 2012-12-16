function Building(spriteName, map, node) {
    Building.superclass.constructor.call(this);
    this._node = null;
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
    },
    
    update: function() {
    
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
            actor.job = this;
            return true;
        }
        return false;
    },
    
    getFullName: function() {
        return this.label;
    }

});
