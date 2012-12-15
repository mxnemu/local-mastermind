function Camera(size, game) {
    Camera.superclass.constructor.call(this);
    this.size = size;
    this.game = game;
    this.scrollSpeed = 5;
    this.trackedActor = null;
    this.trackOffset = null;
}

Camera.inherit(Object, {
    update: function() {
        if (this.trackedActor) {
            if (this.trackedActor.destroyed) {
                this.trackedActor = null;
            } 
            
            if (this.trackedActor.map && this.trackedActor.map != this.game.map) {
                this.game.setMap(this.trackedActor.map);
            }
            
            this.game.map.position.x = -this.trackedActor.position.x + this.size.width/2;
            this.game.map.position.y = -this.trackedActor.position.y + this.size.height/2;
        }
        
        
        
        // left
        if (Input.instance.keysDown[37] || Input.instance.keysDown[65]) {
            this.game.map.position.x += this.scrollSpeed;
            this.trackedActor = null;
        }
        // right
        if (Input.instance.keysDown[39] || Input.instance.keysDown[68]) {
            this.game.map.position.x -= this.scrollSpeed;
            this.trackedActor = null;
        }
        // up 38
        if (Input.instance.keysDown[38] || Input.instance.keysDown[87]) {
            this.game.map.position.y -= this.scrollSpeed;
            this.trackedActor = null;
        }
        // down 40     
        if (Input.instance.keysDown[40] || Input.instance.keysDown[83]) {
            this.game.map.position.y += this.scrollSpeed;
            this.trackedActor = null;
        }
        
        
    }
});


