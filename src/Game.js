function Game(root) {
    this.root = root;
    this.entities = [];
    this.ui = new Ui();
    

    // test game
    /*
    var map = new Map();
    var nodes = new Array();
    nodes.push(new Node( 100, 100));
    nodes.push(new Node( 400, 100, [nodes[0]]));
    nodes.push(new Node( 700, 100, [nodes[1]]));
    nodes.push(new Node( 400, 400, [nodes[1]]));
    map.setNodes(nodes);
    
    var sprite = new cc.Sprite({file: "images/house.png"});
    sprite.position = new cc.Point(100, 200);
    map.addSprite(sprite);
    
    var actor = new Actor(nodes[3]);
    map.addActor(actor);
    actor.path = nodes[3].findPath(nodes[2]);
    this.setMap(map);
    */

    this.setMap(new TownGenerator().create());
    this.camera = new Camera(cc.Director.sharedDirector.winSize, this);
    //this.camera.trackedActor = actor;
}

Game.inherit(Object, {
    
    setMap: function(map) {
        if (this.map) {
            this.root.removeChild(this.map);
        }
    
        this.map = map;
        this.map.restCamera();
        this.root.addChild(this.map);
    },
    
    update: function(dt) {
        this.map.update(dt);
        this.camera.update(dt);
    },
    
    mouseDragged: function(event) {
        this.draggingMouse = true;
    },
    
    mouseDown: function(event) {

    },
    
    mouseWheel: function(event) {
        this.camera.scaleByDelta(event.wheelDelta, event);
    },
    
    mouseUp: function(event) {
        var point = this.camera.mouseToCamera(event.locationInCanvas);
        var actor = this.map.getEntityOnPosition(point, "actor", this.ui.entity);
        var building = this.map.getEntityOnPosition(point, "building", this.ui.entity);
    
    
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
            } else if (building) {
                this.ui.setSelectedBuilding(building);
            }
        }
    }
});

Game.instance = null;
