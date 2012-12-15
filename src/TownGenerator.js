function TownGenerator() {

}

TownGenerator.inherit(Object, {
    create: function() {
        var _this = this;
        var map = new Map();
        
        this.lowerClassData = G.defaultTownSettings.lowerClassData;
        this.middleClassData = G.defaultTownSettings.middleClassData;
        this.upperClassData = G.defaultTownSettings.upperClassData;
        
        var position = new cc.Point(0,0);
        var lastPosition = null;
        
        var buildings = [];
        
        // parse json & generate buildings        
        $.each(G.defaultTownSettings.buildings, function() {
            for (var i=0; i < randomInRange(this.min, this.max); ++i) {
                console.log(this.label);
                var building = new Building();
                building.restore(this);
                buildings.push(building);
            }
        });
        
        var buildGrid = [];
        var buildGridWidth = buildings.length/3;
        var buildGridHeight = buildings.length/3;
        for (var i=0; i < buildGridWidth*buildGridHeight; ++i) {
            buildGrid.push(null);
        }
        
        Utils.shuffleArray(buildings);
        
        //TODO this shit needs proper streets
        // insert in to build grid        
        $.each(buildings, function() {
            var building = this;

            // monkey insert! Please... somebody stop me.
            var inserted = false;
            while (!inserted) {
                var index = Math.floor(randomInRange(0, buildGridWidth*buildGridHeight));
                if (!buildGrid[index]) {
                    buildGrid[index] = building;
                    inserted = true;
                }
            }
        });
        
        
        
        // build grid to pixels
        var nodes = [];
        var pos = 0;
        var rowHeight = 0;
        for (var y=0; y < buildGridHeight; ++y) {
            var rowWidth = 0;
            var lastHeight = 0;
            var lastWidth = 0;
            for (var x=0; x < buildGridWidth; ++x) {
                var building = buildGrid[pos];
                if (building) {
                    if (rowWidth < building.contentSize.width) {
                        rowWidth = building.contentSize.width;
                    }
                    if (rowHeight < building.contentSize.height) {
                        rowHeight = building.contentSize.height;
                    }
                    building.position = new cc.Point(((rowWidth)*x),
                                                     ((rowHeight)*y));
                    lastWidth = building.contentSize.width;
                    lastHeight = building.contentSize.height;
                    building.node = new Node(building.position.x,
                                             building.position.y - building.contentSize.height/2);
                    nodes.push(building.node);
                }
                ++pos;
            }
        }
        
        var getClosestBuilding = function(index) {
            var delta = 1;
            while(delta < buildGrid.length) {
                var hasBuilding = function(newIndex) {
                    if (newIndex < buildGrid.length && buildGrid[newIndex]) {
                        return true;
                    }
                    return false;
                }
                
                var isInSameRow = function(newIndex) {
                    return Math.floor(index/buildGridHeight) == 
                           Math.floor(newIndex/buildGridHeight);
                }
                
                var isInSameColumn = function(newIndex) {
                    return Math.floor(index%buildGridHeight) == 
                           Math.floor(newIndex%buildGridHeight)
                }
                
                //kill me
                if (hasBuilding(index - delta) && isInSameRow(index - delta)) {
                    return buildGrid[index - delta];
                }
                
                if (hasBuilding(index + delta) && isInSameRow(index + delta)) {
                    return buildGrid[index + delta];
                }
                
                if (hasBuilding(index - delta*buildGridHeight) && isInSameColumn(index - delta*buildGridHeight)) {
                    return buildGrid[index - delta*buildGridHeight];
                }
                
                if (hasBuilding(index + delta*buildGridHeight) && isInSameColumn(index + delta*buildGridHeight)) {
                    return buildGrid[index + delta*buildGridHeight];
                }

                ++delta
            }
        }
        
        // connect Nodes
        pos = 0;
        for (var y=0; y < buildGridHeight; ++y) {
            for (var x=0; x < buildGridWidth; ++x) {
                var building = buildGrid[pos];
                if (building) {
                    var closestBuilding = getClosestBuilding(pos);
                    if (closestBuilding) {
                        building.node.addConnection(closestBuilding.node);                    
                    }
                }
                ++pos;
            }
        }
        
        // insert the result
        $.each(buildings, function() {
            map.addBuilding(this);
        });
        map.setNodes(nodes);
        
        return map;
    },
    
    createUpperClassHouseHold: function(home) {
        
    },
    
    createMiddleClassHouseHold: function(home) {
    
    },
    
    createLowerClassHouseHold: function() {
    
    }
});
