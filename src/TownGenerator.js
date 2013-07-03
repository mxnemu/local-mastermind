function TownGenerator(player) {
    this.buildings = [];
    this.data = G.defaultTownSettings;
    this.player = player;
}

TownGenerator.inherit(Object, {
    create: function() {
        var _this = this;
        var map = new Map();
        
        // generate all town buildings at 0,0 position
        this.generateBuildings();
        
        // prepare for position and connection        
        this.nodes = [];
        var buildGrid = [];
        var buildGridWidth = Math.floor(this.buildings.length/3);
        var buildGridHeight = Math.floor(this.buildings.length/3);
        for (var i=0; i < buildGridWidth*buildGridHeight; ++i) {
            buildGrid.push(null);
        }
        
        // position and connect
        this.positionBuildings(buildGrid, buildGridWidth, buildGridHeight);
        this.addToMap(map);
        //this.connectBuildingsViaRaycast(map);
        this.connectBuildingsViaGrid(buildGrid, buildGridWidth, buildGridHeight);
        map.setNodes(this.nodes);
        
        
        var populationGenerator = new PopulationGenerator(this.data, this.buildings);


        populationGenerator.create(map);        
        return map;
    },
    
    generateBuildings: function() {
        var _this = this;
        // parse json & generate buildings    
        $.each(this.data.buildings, function() {
            for (var i=0; i < randomInRange(this.min, this.max); ++i) {
                //console.log(this.label);
                var building = new Building();
                building.restore(this);
                _this.buildings.push(building);
            }
        });
        this.buildings.push(this.player.hq);
    },
    
    positionBuildings: function(buildGrid, buildGridWidth, buildGridHeight) {
        
        //TODO this shit needs proper streets
        // insert in to build grid      
        var insertCount = 0;  
        $.each(this.buildings, function() {
            var building = this;

            // make sure there is 1 building in each column first            
            if (insertCount < buildGridWidth) {
                var index = insertCount;
                index += buildGridWidth*Math.floor(randomInRange(0, buildGridHeight));
                // else should never happen (kill me for that line)
                if (!buildGrid[index]) {
                    buildGrid[index] = building;
                }
            } else {
                // monkey insert! Please... somebody stop me.
                var inserted = false;
                while (!inserted) {
                    var index = Math.floor(randomInRange(0, buildGridWidth*buildGridHeight));
                    if (!buildGrid[index]) {
                        buildGrid[index] = building;
                        inserted = true;
                    }
                }
            }
            ++insertCount;
        });
        
        
        
        // build grid to pixels and disconnected nodes
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
                    building.nodel = new Node(building.position.x - building.contentSize.width/2,
                                             building.position.y - building.contentSize.height/2);
                    building.node.position = new cc.Point(building.position.x, building.position.y - building.contentSize.height/2);
                    building.noder = new Node(building.position.x + building.contentSize.width/2,
                                             building.position.y - building.contentSize.height/2);
                    building.nodel.addConnection(building.node);
                    building.noder.addConnection(building.node);
                    this.nodes.push(building.nodel);
                    this.nodes.push(building.node);
                    this.nodes.push(building.noder);
                }
                ++pos;
            }
        }
    },
    
    connectBuildingsViaRaycast: function(map) {
        var rayCastBuilding = function(position, delta, initial) {
            for (var i=1; i < 200; ++i) {
                var p = new cc.Point(position.x + (delta.x*i), position.y + (delta.y*i));
                var building = map.getEntityOnPosition(p, "building");
                if (building && building != initial) {
                    return building;
                }
            }
            return null;
        }
    
        for (var i=0; i < this.buildings.length; ++i) {
            var building = this.buildings[i];
            var alreadyConnected = function(o) {
                if (building.nodel.hasConnectionTo(o.nodel) ||
                    building.nodel.hasConnectionTo(o.noder) ||
                    building.noder.hasConnectionTo(o.nodel) ||
                    building.noder.hasConnectionTo(o.noder)) {
                    return true;
                }
                return false;
            }
        
            // connect left
            var b = rayCastBuilding(building.nodel.position, new cc.Point(-50,0), building);
            if (b && !alreadyConnected(b)) {
                building.nodel.addConnection(b.noder);
            }
            
            // connect right
            b = rayCastBuilding(building.noder.position, new cc.Point(50,0), building);
            if (b && !alreadyConnected(b)) {
                building.noder.addConnection(b.nodel);
            }
            
            // connect above
            b = rayCastBuilding(building.nodel.position, new cc.Point(0,50), building);
            if (b && !alreadyConnected(b)) {
                building.nodel.addConnection(b.nodel);
            }
            
            // connect under
            b = rayCastBuilding(building.noder.position, new cc.Point(0,-50), building);
            if (b && !alreadyConnected(b)) {
                building.noder.addConnection(b.noder);
            }
        }
    },
    
    connectBuildingsViaGrid: function(buildGrid, buildGridWidth, buildGridHeight) {
        // connect Nodes
        var getNextBuildingInColumn = function(index, deltaModifier) {
            var isInSameColumn = function(newIndex) {
                return Math.floor(index % buildGridWidth) == 
                       Math.floor(newIndex % buildGridWidth)
            }
        
            var delta = buildGridWidth * deltaModifier;
            var newIndex = index + delta;
            while(newIndex >= 0 && newIndex < buildGrid.length && isInSameColumn(newIndex)) {
                if (buildGrid[index + delta]) {
                    return buildGrid[index + delta]
                }
                delta += buildGridWidth * deltaModifier;
                newIndex = index + delta;
            }

            return null;
        }
        
        var getNextBuildingInRow = function(index, deltaModifier) {
            var isInSameRow = function(newIndex) {
                return Math.floor(index / buildGridHeight) == 
                       Math.floor(newIndex / buildGridHeight);
            }
            
            var delta = 1 * deltaModifier;
            while(isInSameRow(index + delta)) {
                if (buildGrid[index + delta]) {
                    return buildGrid[index + delta]
                }
                delta += 1 * deltaModifier;
            }
            
            return null;
        }
        
        function connectClosestBulidingNodes(buildingA, buildingB) {
            /*
            if (buildingA.position.x > buildingB.position.x) {
                if (buildingA.nodel.absoluteDistance(buildinB.nodel) <
                    buildingA.noder.absoluteDistance(buildinB.noder)) {
                    
                    buildingA.nodel.addConnection(buildingB.noder);                    
                }
            } else {
                buildingA.noder.addConnection(buildingB.nodel);
            }
            */
            
            function pointAbsSum(p) {
                return Math.abs(p.x) + Math.abs(p.y);
            }
            
            var distances = [
                {
                    d: pointAbsSum(buildingA.nodel.absoluteDistance(buildingB.nodel)),
                    nodes: [buildingA.nodel, buildingB.nodel]
                },
                {
                    d: pointAbsSum(buildingA.nodel.absoluteDistance(buildingB.noder)),
                    nodes: [buildingA.nodel, buildingB.noder]
                },
                {
                    d: pointAbsSum(buildingA.noder.absoluteDistance(buildingB.nodel)),
                    nodes: [buildingA.noder, buildingB.nodel]
                },
                {
                    d: pointAbsSum(buildingA.noder.absoluteDistance(buildingB.noder)),
                    nodes: [buildingA.noder, buildingB.noder]
                }
            ];
            
            distances.sort(function(a, b) {
                return a.d < b.d ? -1 : 1;
            });
            
            distances[0].nodes[0].addConnection(distances[0].nodes[1]);
        }
        
        pos = 0;
        for (var y=0; y < buildGridHeight; ++y) {
            for (var x=0; x < buildGridWidth; ++x) {
                var building = buildGrid[pos];
                if (building) {
                
                    var alreadyConnected = function(o) {
                        if (building.nodel.hasConnectionTo(o.nodel) ||
                            building.nodel.hasConnectionTo(o.noder) ||
                            building.noder.hasConnectionTo(o.nodel) ||
                            building.noder.hasConnectionTo(o.noder)) {
                            return true;
                        }
                        return false;
                    }
                
                    // connect left
                    var b = getNextBuildingInRow(pos, -1);
                    if (b && !alreadyConnected(b)) {
                        connectClosestBulidingNodes(building, b);
                    }
                    
                    // connect right
                    b = getNextBuildingInRow(pos, 1);
                    if (b && !alreadyConnected(b)) {
                        connectClosestBulidingNodes(building, b);
                    }
                    
                    // connect above
                    b = getNextBuildingInColumn(pos, 1);
                    if (b && !alreadyConnected(b)) {
                        connectClosestBulidingNodes(building, b);
                    }
                    
                    // connect under
                    b = getNextBuildingInColumn(pos, -1);
                    if (b && !alreadyConnected(b)) {
                        connectClosestBulidingNodes(building, b);
                    }
                }
                ++pos;
            }
        }
    },
    
    addToMap: function(map) {
        $.each(this.buildings, function() {
            map.addBuilding(this);
        });
    },
    
    getBuildingDataForType: function(type) {
        var building;
        $.each(this.data.buildings, function() {
            if (this.buildingType == type) {
                building = this;
                return;
            }
        });
        return building;
    },
    
    addLogisticsOfBuilding: function(building) {
        //TODO
    },
});
