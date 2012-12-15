function Building(spriteName, map, node) {
    Building.superclass.constructor.call(this); 
    this.map = null;
    this.label = 0;
    this.buildingType = "none";
    
    this.lowerClassJobs = 0;
    this.middleClassJobs = 0;
    this.upperClassJobs = 0;
    
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
    },
    
    update: function() {
    
    }

});
