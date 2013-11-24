function Game(root) {
    Game.superclass.constructor.call(this);
    this.root = root;
    this.entities = [];
}

Game.inherit(Observable, {

    init: function() {
        // TODO does not work with options like #noSound
        var newGameJson;
        if (window.location.hash.match("#newGame:")) {
            var hash = window.location.hash;
            var rawJson = hash.substring("#newGame:".length, hash.length);
            newGameJson = JSON.parse(rawJson);
            console.log(newGameJson);
        }
        
        newGameJson = newGameJson || {
            archtype: "madScientist",
            firstName: "Bernd",
            honorificTitle: "Imperator of Worlds",
            hq: "momsBasement",
            lastName: "van und zu Brotig",
            namePrefix: "Prof.Dr.Dr.Prof."
        };
        
        this.player = new Player();
        this.player.createFromJson(newGameJson);
        this.setMap(new TownGenerator(this.player).create());
        this.outdoorMap = this.map;
        this.camera = new Camera(cc.Director.sharedDirector.winSize, this);
        this.ui = new Ui(this);
        this.calendar = new GameCalendar();
        
        if (this.map.buildings.length > 0) {
            this.camera.jumpToMap(this.player.hq.interiorMap,
                                  this.player.hq.interiorNode);
        }
        //this.camera.trackedEntity = this.player.actor;
    },
    
    setMap: function(map) {
        if (this.map) {
            this.root.removeChild(this.map);
        }
        var oldMap = this.map; // store for event
        this.map = map;
        map.contentSize = cc.Director.sharedDirector.winSize;
        this.map.restCamera();
        this.root.addChild(this.map);
        this.fireEvent("changeMap", {newMap: map, oldMap: oldMap});
    },
    
    update: function(dt) {
        this.outdoorMap.update(dt);
        this.camera.update(dt);
        this.calendar.update(dt);
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
