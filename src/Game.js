function Game(root) {
    Game.superclass.constructor.call(this);
    this.root = root;
    this.entities = [];
}

Game.inherit(Observable, {

    init: function() {
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
        this.outdoorMap = this.map;
        this.camera = new Camera(cc.Director.sharedDirector.winSize, this);
        this.player = new Player();
        this.ui = new Ui(this);
        
        if (this.map.buildings.length > 0) {
            this.camera.trackedEntity = this.map.buildings[0];
        }
    
        //this.camera.trackedEntity = actor;
    },
    
    setMap: function(map) {
        if (this.map) {
            this.root.removeChild(this.map);
        }
        var oldMap = this.map; // store for event
        this.map = map;
        this.map.restCamera();
        this.root.addChild(this.map);
        this.fireEvent("changeMap", {newMap: map, oldMap: oldMap});
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
        var isDoubleClick = this.checkDoubleClick(event.which);
    
    
        if (event.which == G.rightMouseButtonIndex) {
            if (actor) {
                this.camera.trackedEntity = actor;
            } else if (building) {
                this.camera.trackedEntity = building;
            // shortcut to leave building
            } else if (isDoubleClick) {
                if (this.map != this.outdoorMap) {
                    this.camera.jumpToMap(this.outdoorMap, this.map.building);
                }
            }
        } else if (event.which == G.leftMouseButtonIndex) {
            if (actor) {
                this.ui.setSelectedActor(actor);
            } else if (building) {
                this.ui.setSelectedBuilding(building);
                if (isDoubleClick && building == this.ui.entity) {
                    this.camera.jumpToMap(building.interiorMap, building.interiorNode);
                }
            } else {
                this.ui.setSelectedEntity(null);
            }
        }
    },
    
    checkDoubleClick: function(buttonIndex) {
        var ret = false;
        var currentTime = new Date().getTime();
        if (this.lastClickTime &&
            this.lastMouseButtonIndex == buttonIndex &&
            currentTime - this.lastClickTime < G.doubleClickTime) {

            ret = true;
        }
        this.lastClickTime = currentTime;
        this.lastMouseButtonIndex = buttonIndex;
        return ret;
    }
});

Game.instance = null;
