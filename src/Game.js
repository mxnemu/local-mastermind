function Game(root) {
    this.root = root;
    this.entities = [];
    this.ui = new Ui();
    
    // test game
    this.map = new Map();
    var nodes = new Array();
    nodes.push(new Node( 100, 100));
    nodes.push(new Node( 400, 100, [nodes[0]]));
    nodes.push(new Node( 700, 100, [nodes[1]]));
    nodes.push(new Node( 400, 400, [nodes[1]]));
    this.map.setNodes(nodes);
    
    var sprite = new cc.Sprite({file: "images/house.png"});
    sprite.position = new cc.Point(100, 200);
    this.map.addSprite(sprite);
    
    var actor = new Actor(nodes[3]);
    this.map.addActor(actor);
    actor.addNodeToPath(nodes[1]);
    actor.addNodeToPath(nodes[0]);
    actor.addNodeToPath(nodes[1]);
    actor.addNodeToPath(nodes[3]);
    
    this.map.restCamera();
    root.addChild(this.map);
    this.camera = new Camera(cc.Director.sharedDirector.winSize, this);
    //this.camera.trackedActor = actor;
}

Game.inherit(Object, {
    
    update: function(dt) {
        this.map.update(dt);
        this.camera.update(dt);
    },
    
    selectEntity: function(entity) {
        
    },
    
    mouseDragged: function(event) {
        this.draggingMouse = true;
    },
    
    mouseDown: function(event) {

    },
    
    mouseUp: function(event) {
        var actor = this.map.getEntityOnPosition(event.locationInCanvas, "actor");
        var building = this.map.getEntityOnPosition(event.locationInCanvas, "building");
    
    
        if (event.which == 3) {
            if (actor) {
                this.camera.trackedActor = actor;
                /*
                this.camera.trackOffset = new cc.Point(actorToTrack.position.x - this.map.position.x,
                    actorToTrack.position.y - this.map.position.y)
                */
            }
        } else if (event.which == 1) {
            if (actor) {
                this.ui.setSelectedActor(actor);
            }
        }
    }
});

Game.instance = null;
