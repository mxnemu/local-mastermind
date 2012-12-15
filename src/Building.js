function Building(spriteName, map, node) {
    Building.superclass.constructor.call(this); 
    this.map = null;
    this.label = 0;
    this.buildingType = "none";
    
    this.lowerClassJobs = 0;
    this.middleClassJobs = 0;
    this.upperClassJobs = 0;
    
    spriteName = spriteName || "images/house.png";
    this.sprite = new cc.Sprite({file: spriteName});
}

Building.inherit(cc.Node, {

    restore: function(data) {
        this.label = data.label;
        this.buildingType = data.buildingType;
        this.sprite = new cc.Sprite({file: data.sprite});
        this.addChild(this.sprite);
        
        this.lowerClassJobs = data.lowerClassJobs;
        this.middleClassJobs = data.middleClassJobs;
        this.upperClassJobs = data.upperClassJobs;
    },
    
    update: function() {
    
    }

});
