function Node(x, y, connections, actionType) {
    Node.superclass.constructor.call(this);
    this.type = actionType;
    this.position = new cc.Point(x,y);
    this.user = null;
    this.building = null;
    this.actors = [];
    this.connections = [];
    this.setConnections(connections || []);
    
    this.contentSize = new cc.Size(5,5);
}

Node.inherit(cc.Node, {
    draw: function(context) {
        context.fillStyle = "green";
        
        context.beginPath();
        context.arc(0, 0, this.contentSize.width, 0, Math.PI*2, true); 
        context.closePath();
        context.fill();
    },
    
    setConnections: function(connections) {
        for (var i=0; i < connections.length; ++i) {
            if (connections[i]) {
                connections[i].addConnection(this);
            }
        }
    },
    
    addConnection: function(connection) {
        if (-1 == $.inArray(connection, this.connections)) {
            this.connections.push(connection);
            connection.connections.push(this);
        }
    },
    
    getConnectionsRecursive: function(nodes) {
        nodes = nodes || [this];
        for (var i=0; i < this.connections.length; ++i) {
            if (this.connections[i]) {
                if (-1 == $.inArray(this.connections[i], nodes)) {
                    nodes.push(this.connections[i]);
                    this.connections[i].getConnectionsRecursive(nodes);
                }
            }
        }
        return nodes;
    },
    
    addActor: function(actor) {
        this.actors.push(actor);
    },
    
    removeActor: function(actor) {
        var index = $.inArray(actor, this.actors);
        if (index != -1) {
            this.actors.splice(index, 1);
        }
    },
    
    hasConnectionTo: function(node) {
        return -1 != $.inArray(node, this.connections);
    },
    
    absoluteDistance: function(node) {
        return new cc.Point(Math.abs(this.position.x-node.position.x),
                            Math.abs(this.position.y-node.position.y));
    },
    
    // I just implemented freakin A* from memory that shit'z easy
    // TODO argh shit forgot about checking which route is ACTUALLY the fastest,
    // not just via heuristics
    findPath: function(node) {
        var path = [];
        var aNodes = [];
        var closedNodes = [];
        var addAnode = function(aNode){
            var found;
            for (var ii=0; ii < aNodes.length; ++ii) {
                if (aNodes[ii].node == aNode.node) {
                    found = true;
                }
            }
            
            for (var ii=0; ii < closedNodes.length; ++ii) {
                if (closedNodes[ii].node == aNode.node) {
                    found = true;
                }
            }
            
            if (!found) {
                aNodes.push(aNode);
            }
        }
        
        
        aNodes.push({node: this,
                     heuristic: this.absoluteDistance(node),
                     last: null});
                     
        var j = 0;
        while (aNodes.length > 0) {
            var current = aNodes[0];
            if (current.node != node) {
                for (var i=0; i < current.node.connections.length; ++i) {
                    addAnode({node: current.node.connections[i],
                              heuristic: current.node.connections[i].absoluteDistance(node),
                              last: current});
                }
                closedNodes.push(current);
                aNodes.splice(j,1);
                --j;
                aNodes.sort(function(a,b) { return a.heuristic < b.heuristic});
            } else {
                // found that bastard!
                path.push(current);
                var l = current.last;
                while (l) {
                    path.push({node: l.node});
                    l = l.last;
                }
                path.reverse();
                return path;
            }
            ++j;
        }
        return path;
    },
});

function ConnectionLine(nodeA, nodeB) {
    ConnectionLine.superclass.constructor.call(this);
    this.nodeA = nodeA;
    this.nodeB = nodeB;
    this.zOrder = -1
    this.opacity = 100;
}

ConnectionLine.inherit(cc.Node, {
    draw: function(context) {
        context.beginPath();
        context.lineWidth = 4;
        context.moveTo(this.nodeA.position.x,this.nodeA.position.y);
        context.lineTo(this.nodeB.position.x,this.nodeB.position.y);
        context.stroke();       
        
    },
})
