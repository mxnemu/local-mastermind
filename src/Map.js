function Map() {
    Map.superclass.constructor.call(this);
    this.actors = [];
    this.buildings = [];
    this.nodes = [];
    this.sprites = [];
    this.connectionLines = [];
    this.mapConnections = [];
    this.cameraStart = new cc.Point(0,0);
}

Map.inherit(cc.Layer, {

    restCamera: function() {
        this.position = new cc.Point(this.cameraStart.x, this.cameraStart.y)
    },
    
    addSprite: function(sprite) {
        this.sprites.push(sprite);
        this.addChild(sprite);
    },
    
    addActor: function(actor) {
        this.actors.push(actor);
        this.addChild(actor);
        actor.map = this;
    },
    
    addBuilding: function(building) {
        this.buildings.push(building);
        this.addChild(building);
    },
    
    removeActor: function(actor) {
        var index = $.inArray(actor, this.actors);
        if (index != -1) {
            this.actors.splice(index,1);
            this.removeChild(actor);
            actor.map = null;
        }
    },
    
    update: function(dt) {
        for (var i=0; i < this.actors.length; ++i) {
            this.actors[i].update(dt);
        }
        for (var i=0; i < this.buildings.length; ++i) {
            this.buildings[i].update(dt);
        }
    },
    
    setNodes: function(nodes) {
        this.nodes = nodes;
        var _this = this;
        
        $.each(this.nodes, function() {
            this.map = _this;
            _this.addChild(this);
        });
        
        $.each(this.nodes, function() {
            var nodeA = this;
            $.each(this.connections, function() {
                _this.addConnectionLine(nodeA, this);
            });
        });
    },
    
    addConnectionLine: function(nodeA, nodeB) {
        var _this = this;
        var exists = false;
        $.each(this.connectionLines, function() {
            if (this.nodeA == nodeA && this.nodeB == nodeB ||
                this.nodeA == nodeB && this.nodeB == nodeA) {
                exists = true;
                return;
            }
        });
        if (!exists) {
            if (nodeA.map == nodeB.map) {
                var line = new ConnectionLine(nodeA, nodeB);
                this.connectionLines.push(line);
                _this.addChild(line);
                console.log("line");
            } else if (nodeA.map && nodeB.map) {
                var entrance = (nodeA.map == this) ? nodeA : nodeB;
                var exit = (nodeA.map == this) ? nodeB : nodeA;
                var map = (nodeA.map == this) ? nodeB.map : nodeA.map;
                this.addMapConnection(entrance, exit, map);
                map.addMapConnection(exit, entrance, this);
            }
        }
    },
    
    addMapConnection: function(entranceNode, exitNode, map) {
        var exists = false;
        $.each(this.mapConnections, function() {
            if (this.entranceNode == entranceNode && this.map == map) {
                exists = true;
                return;
            }
        });
        if (!exists) {
            this.mapConnections.push({
                entranceNode: entranceNode,
                exitNode: exitNode,
                map: map
            });
        }
    },
    
    getActorOnPosition: function(point) {
        return this.getEntityOnPosition(point, "actor");
    },
    
    
    // if current is given, loop through all matching entities to find the one after
    // after the currently selected
    getEntityOnPosition: function(point, entityType, current) {
        entityType = entityType || "actor";
        var entities;
        if (entityType == "actor") {
            entities = this.actors;
        } else if (entityType == "building") {
            entities = this.buildings;
        } else if (entityType == "node") {
            entities = this.nodes;
        }
        
        var firstMatch = null;
        var entity = null;
        var foundCurrent = false;
        $.each(entities, function() {
            var xDistance = Math.abs(point.x - this.position.x);
            var yDistance = Math.abs(point.y - this.position.y);
            if (xDistance < this.contentSize.width/2 &&
                yDistance < this.contentSize.height/2) {
                
                if (!firstMatch) {
                    firstMatch = this;
                }

                if (foundCurrent && !entity) {
                    entity = this;
                    return;
                } else if (this == current) {
                    foundCurrent = true;
                }
            }
        });
        
        return entity || firstMatch;
    },
    
    findBuildingOfType: function(type) {
        for (var i=0; i < this.buildings.length; ++i) {
            if (this.buildings[i].buildingType == type) {
                return this.buildings[i];
            }
        }
    },
    
    findClosestBuildingOfType: function(type, node) {
        var closest;
        var closestDistance = -1;
        for (var i=0; i < this.buildings.length; ++i) {
            if (this.buildings[i].buildingType == type) {
                var distance = node.getDistanceTo(this.buildings[i].node);
                if (!closest || closestDistance < distance) {
                    closest = this.buildings[i];
                    closestDistance = distance;
                }
            }
        }
        return closest;
    },
    
    
    getClosestNodeToPosition: function(x,y) {
        var closestNode = null;
        var closestDistance = -1;
        $.each(this.nodes, function() {
            var distance = ((this.x - x) + (this.y - y))/2;
            if (closestDistance == -1 || distance < closestDistance) {
                closestNode = this;
                closestDistance = distance;
            }
        });
        
        return closestNode;
    },
    
    findNodesOfType: function(type) {
        var returnArray = [];
        $.each(this.nodes, function() {
            if (this.type == type) {
                returnArray.push(this);
            }
        });
        return returnArray;
    },
    
    findClosestFreeNodeOfType: function(startNode, type) {
        var nodes = this.findNodesOfType(type);
        
        for (var i=0; i< nodes.length; ++i) {
            if (nodes[i].blocked) {
                nodes.splice(i, 1);
                --i;
            }
        }
        
        var closest;
        var lowestDistance;
        for (var i=0; i< nodes.length; ++i) {
            var distance = nodes[i].absoluteDistance(startNode);
            if (!closest || distance < lowestDistance) {
                lowestDistance = distance;
                closest = nodes[i];
            }
        }
        return closest;
    },
    
    findMapConnectionPath: function(map, triedConnections) {
        triedConnections = triedConnections || [];
        var path = [];
        var directConnection = false;
        
        $.each(this.mapConnections, function() {
            if (this.map == map) {
                path.push(this);
                directConnection = true;
                return; // break
            }
        });
        
        if (!directConnection) {
            var foundPath = false;
            $.each(this.mapConnections, function() {
                if (!foundPath && $.inArray(this, triedConnections != -1)) {
                    triedConnections.push(this);
                    var addPath = this.map.findMapConnectionPath(map, triedConnections);
                    if (addPath) {
                        path = path.concat(addPath);
                        path.push(this);
                        return;
                    }
                }
            });
        }
        
        if (path.length > 0 || map == this) {
            return path.reverse(); // start with this end with goal
        }
        
        return null;
    }
})
