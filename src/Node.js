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
    
    getDistanceTo: function(node) {
        var path = this.findPath(node);
        var distance = 0;
        var lastNode = this;
        for (var i=0; i < path.length; ++i) {
            var d = lastNode.absoluteDistance(path[i].node);
            distance += Math.max(d.x, d.y); // TODO get it precise
        }
        return distance;
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
    
    collidesWithLine: function(other) {
        var t1, t2, o1, o2, r;
        if (this.nodeA.x + this.nodeA.y < this.nodeB.x + this.nodeB.y) {
            t1 = this.nodeA.position;
            t2 = this.nodeB;
        } else {
            t1 = this.nodeB;
            t2 = this.nodeA;
        }
        
        if (other.nodeA.x + other.nodeA.y < other.nodeB.x + other.nodeB.y) {
            o1 = other.nodeA;
            o2 = other.nodeB;
        } else {
            o1 = other.nodeB;
            o2 = other.nodeA;
        }
        
        // (x1*y2 - y1*x2)*(x3-x4)-(x1-x2)*(x3*y4 -y3*x4) / (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4)
        // or just
        // (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4) == 0 means paralell, 
        // but that also accounts collisons outside of the line length
        
        r = new cc.Point(0,0);
        r.x = (t1.x*t2.y - t1.y*t2.x)*(o1.x-o2.x)-(t1.x-t2.x)*(o1.x*o2.y -o1.y*o2.x) / (t1.x-t1.x)*(o1.y-o2.y)-(t1.y-t2.y)*(o1.x-o2.x);
        r.y = (t1.x*t2.y - t1.y*t2.x)*(o1.y-o2.y)-(t1.y-t2.y)*(o1.x*o2.y -o1.y*o2.x) / (t1.x-t1.x)*(o1.y-o2.y)-(t1.y-t2.y)*(o1.x-o2.x);
        
        // does not work, because no proper sorting, but I'm to lazy for that right now.
        return r.x > t1.x && r.x < t2.x &&
               r.x > o1.x && r.x < o2.x &&
               r.y > t1.y && r.y < t2.y &&
               r.y > o1.y && r.y < o2.y;
    }
})
