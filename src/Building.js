function Building(spriteName, map, node) {
    Building.superclass.constructor.call(this); 
    this.map = null;
    this.label = 0;
    this.buildingType = "none";
    
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
        this.sprite = new cc.Sprite({file: spriteName});
        this.contentSize = new cc.Size(this.sprite.contentSize.width,
                                   this.sprite.contentSize.height);
   }
}

Building.inherit(cc.Node, {

    restore: function(data) {
        this.label = data.label;
        this.buildingType = data.buildingType;
        this.sprite = new cc.Sprite({file: data.sprite});
        this.addChild(this.sprite);
        this.contentSize = new cc.Size(this.sprite.contentSize.width,
                                       this.sprite.contentSize.height);
        
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
            this.lowerClassJobs - lowerClassWorkers.length > 0) ||
            (actor.socialClass == "middle" && 
            this.middleClassJobs - middleClassWorkers.length > 0) ||
            (actor.socialClass == "upper" && 
            this.upperClassJobs - upperClassWorkers.length > 0);
    },
    
    hire: function(actor) {
        if (this.hasJobFor(actor)) {
            if (actor.socialClass == "lower") {
               lowerClassWorkers.push(actor); 
            } else if (actor.socialClass == "middle") {
               middleClassWorkers.push(actor);
            } else if (actor.socialClass == "upper") {
               upperClassWorkers.push(actor);
            }
            actor.job = this;
            return true;
        }
        return false;
    }

});
