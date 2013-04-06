function Path(actor, finishNode) {
    this.steps = [];
    this.actor = actor; // provides start node
    if (actor && actor.node && finishNode) {
        this.fromStartToEnd(actor.node, finishNode);
    }
}

Path.inherit(Object, {
    
    reset: function() {
        this.steps = [];
    },
    
    toNode: function(node) {
        if (this.actor) {
            this.fromStartToEnd(this.actor.node, node);
        }
    },

    fromStartToEnd: function(startNode, finishNode) {
        if (!startNode || !finishNode) {
            console.error("trying to find path from/to undefined location");
            return;
        }
    
        // TODO use permissions to check rights to open doors
        if (startNode.map != finishNode.map) {
            this.toMap(startNode, finishNode.map);
            var lastNode = this.lastNode();
            if (lastNode) {
                this.steps = this.steps.concat(lastNode.findPath(finishNode));
            }
        } else if (startNode) {
            this.steps = startNode.findPath(finishNode);
        }
    },
    
    toMap: function(startNode, finishMap) {
        if (startNode.map != finishMap) {
            var path = [];
            var mapPath = startNode.map.findMapConnectionPath(finishMap);
            var node = startNode;
            if (mapPath) {
                $.each(mapPath, function() {
                    path = path.concat(node.findPath(this.entranceNode));
                    path.push({node:this.exitNode});
                    node = this.exitNode;
                });
            }
            this.steps = path;
        }
    },
    
    // TODO cross map
    toBuildingOfType: function(buildingType) {
        var building = this.map.findClosestBuildingOfType(buildingType, this.node);
        //var building = this.map.findBuildingOfType(buildingType);
        if (building) {
            this.toNode(building.node);
        }
    },
    
    // TODO use real distance and not guessed directLineDistance
    toNodeOfTypeInBuilding: function(building, type) {
        if (building) {
            this.toNode(building.node);
            this.addNode(building.interiorNode); 
            var node = building.interiorMap.findClosestFreeNodeOfType(building.interiorNode, type);
            this.findPathAndAppend(node); // TODO remove
        }
    },

    // TODO remove    
    findPathAndAppend: function(node) {
        var lastNode = this.lastNode() || actor.node;
        if (node && node != lastNode) {
            this.steps = this.steps.concat(lastNode.findPath(node));
        }
    },
    
    distance: function() {
        var sum = 0;
        var lastNode = null;
        var firstNode = null;
        for (var i=0; i < this.steps.length; ++i) {
            if (this.steps[i].node) {
                if (lastNode) {
                    if (!firstNode) {
                        firstNode = lastNode;
                    }
                    sum += lastNode.distance(this.steps[i].node);
                }
                lastNode = this.steps[i].node;
            }
        }
        
        if (this.actor && firstNode && this.actor.map == firstNode.map) {
            sum += firstNode.distance(this.actor);
        }
        return sum;
    },
    
    addNode: function(node) {
        this.steps.push(new PathStep(node, null));
    },
    
    addAction: function(action) {
        this.steps.push(new PathStep(null, action));
    },
    
    hasSteps: function() {
        return this.steps.length > 0;
    },
    
    popFirst: function() {
        this.steps.splice(0,1);
    },
    
    first: function() {
        return this.steps[0];
    },
    
    /// insert given Step at given index. If index is not provided insert at 0
    insert: function(index, step) {
        index = index || 0;
        this.steps.splice(index, 0, step);
    },
    
    nextPlannedAction: function() {
        if (this.action) {
            return this.action;
        }
    
        for (var i=0; i < this.steps.length; ++i) {
            if (this.steps[i].action) {
                return this.steps[i].action;
            }
        }
        return null;
    },
    
    lastNode: function() {
        for (var i=this.steps.length-1; i >= 0; --i) {
            if (this.steps[i].node) {
                return this.steps[i].node;
            }
        }
        return null;
    }
    
});

function PathStep(node, action) {
    this.node = node;
    this.action = action;
}
PathStep.inherit(Object, {});

function PathUtils() {}
PathUtils.heuristicDistance = function(nodeA, nodeB) {};

//Map.mapconnectionsDistanceCache;
