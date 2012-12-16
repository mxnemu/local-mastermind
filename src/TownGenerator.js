function TownGenerator() {
    this.buildings = [];
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
                _this.addLogisticsOfBuilding(building)
            }
        });
        
        var buildGrid = [];
        var buildGridWidth = Math.floor(buildings.length/3);
        var buildGridHeight = Math.floor(buildings.length/3);
        for (var i=0; i < buildGridWidth*buildGridHeight; ++i) {
            buildGrid.push(null);
        }
        
        Utils.shuffleArray(buildings);
        
        //TODO this shit needs proper streets
        // insert in to build grid      
        var insertCount = 0;  
        $.each(buildings, function() {
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
                    building.nodel = new Node(building.position.x - building.contentSize.width/2,
                                             building.position.y - building.contentSize.height/2);
                    building.node = new Node(building.position.x,
                                             building.position.y - building.contentSize.height/2);
                    building.noder = new Node(building.position.x + building.contentSize.width/2,
                                             building.position.y - building.contentSize.height/2);
                    building.nodel.addConnection(building.node);
                    building.noder.addConnection(building.node);
                    nodes.push(building.nodel);
                    nodes.push(building.node);
                    nodes.push(building.noder);
                }
                ++pos;
            }
        }
        
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
                        building.nodel.addConnection(b.noder);
                    }
                    
                    // connect right
                    b = getNextBuildingInRow(pos, 1);
                    if (b && !alreadyConnected(b)) {
                        building.noder.addConnection(b.nodel);
                    }
                    
                    // connect above
                    b = getNextBuildingInColumn(pos, 1);
                    if (b && !alreadyConnected(b)) {
                        building.nodel.addConnection(b.nodel);
                    }
                    
                    // connect under
                    b = getNextBuildingInColumn(pos, -1);
                    if (b && !alreadyConnected(b)) {
                        building.noder.addConnection(b.noder);
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
        
        this.buildings = buildings;
        this.createPopulation(map);
        
        return map;
    },
    
    
    createPopulation: function(map) {
        var _this = this;
        var households = [];
        $.each(this.buildings, function() {
            var household;
            
            if (this.upperClassHome > 0) {
                household = _this.createUpperClassHousehold(this);
            } else if (this.lowerClassHome > 0) {
                household = _this.createLowerClassHousehold(this);
            } else if (this.middleClassHome > 0) {
                household = _this.createMiddleClassHousehold(this);
            }
            
            if (household) {
                households.push(household);
            }
        });
        
        // find jobs you lazy scum!
        $.each(households, function() {
            
            $.each(this.actors, function() {
                var actor = this;
                if (this.role == "worker") {
                    $.each(_this.buildings, function() {
                        if (this.hire(actor)) {
                            return;
                        }
                    });
                }
                this.path = this.node.findPath(randomElementInArray(map.nodes));
                map.addActor(this);
            });
        });
    },
    
    createUpperClassHousehold: function(home) {
        return this.createHousehold(home, this.upperClassData);
    },
    
    createMiddleClassHousehold: function(home) {
        return this.createHousehold(home, this.middleClassData);
    },
    
    createLowerClassHousehold: function(home) {
        return this.createHousehold(home, this.lowerClassData);
    },
    
    createHousehold: function(home, data) {
        var household = new Household(home);
        
        var numberOfThugs = randomInRangearray(data.thug);
        for (var i=0; i < numberOfThugs; ++i) {
            household.addActor(this.createThug(household));
        }
        var numberOfWorkers = randomInRangearray(data.worker);
        for (var i=0; i < numberOfWorkers; ++i) {
            household.addActor(this.createWorker(household))
        }
        var numberOfNeets = randomInRangearray(data.neet);
        for (var i=0; i < numberOfNeets; ++i) {
            household.addActor(this.createNeet(household))
        }
        
        this.nameHouseholdMembers(household, data);
        console.log(household.familyName+" "+household.actors.length);
        return household;
    },
    
    createThug: function(household) {
        var actor = new Actor(household.home.node, "images/thug.png", household);
        actor.role = "thug";
        return actor;
    },
    
    createWorker: function(household) {
        var actor = new Actor(household.home.node, "images/person.png", household);
        actor.role = "worker";
        return actor;
    },
    
    createNeet: function(household) {
        var actor = new Actor(household.home.node, "images/person.png", household);
        actor.role = "neet";
        return actor;
    },
    
    // avoid duplicate family names and duplicate first names in 1 household
    nameHouseholdMembers: function(household, data) {
        if (!data.freeLastNames || data.freeLastNames.length == 0) {
            data.freeLastNames = data.familyNames.slice();
        }
        var familyNameIndex = Math.floor(randomInRange(0, data.freeLastNames.length));
        household.familyName = data.freeLastNames[familyNameIndex];
        data.freeLastNames.splice(familyNameIndex,1);
        
        var freeNames = data.firstNames.slice();
        $.each(household.actors, function() {
            if (freeNames.length == 0) {
                freeNames = data.firstNames.slice();
            }
            var nameIndex = Math.floor(randomInRange(0, freeNames.length));
            this.firstName = freeNames[nameIndex];
            freeNames.splice(nameIndex,1);
            
            this.familyName = household.familyName;
        });
    },
    
        
    addLogisticsOfBuilding: function(building) {
        //TODO
    },
});
