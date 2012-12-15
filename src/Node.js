function Node(x, y, connections, actionType) {
    Node.superclass.constructor.call(this);
    this.type = actionType;
    this.position = new cc.Point(x,y);
    this.user = null;
    this.building = null;
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
        }
    }
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
