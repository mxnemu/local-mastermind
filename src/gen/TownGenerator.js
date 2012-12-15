function TownGenerator() {

}

TownGenerator.inherit(Object, {
    create: function() {
        var _this = this;
        var map = new Map();
        
        this.lowerClassData = G.defaultTownSettings.lowerClassData;
        this.middleClassData = G.defaultTownSettings.middleClassData;
        this.upperClassData = G.defaultTownSettings.upperClassData;
        
        $.each(G.defaultTownSettings.buildings, function() {
        
            for (var i=0; i < randomInRange(this.min, this.max); ++i) {
                console.log(this.label);
                var building = new Building();
                building.restore(this);
                map.addBuilding(building);
            }
        });
        
        return map;
    },
    
    createUpperClassHouseHold: function(home) {
        
    },
    
    createMiddleClassHouseHold: function(home) {
    
    },
    
    createLowerClassHouseHold: function() {
    
    }
});
