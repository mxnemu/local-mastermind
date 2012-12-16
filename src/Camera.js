function Camera(size, game) {
    Camera.superclass.constructor.call(this);
    this.size = size;
    this.game = game;
    this.scrollSpeed = 5;
    this.trackedEntity = null;
    this.trackOffset = null;
}

Camera.inherit(Object, {
    update: function() {
        if (this.trackedEntity) {
            if (this.trackedEntity.destroyed) {
                this.trackedEntity = null;
            } 
            
            if (this.trackedEntity.map && this.trackedEntity.map != this.game.map) {
                this.game.setMap(this.trackedEntity.map);
            }
            
            this.centerAt(this.trackedEntity.position);
        }
        
        
        
        // left
        if (Input.instance.keysDown[37] || Input.instance.keysDown[65]) {
            this.game.map.position.x += this.scrollSpeed;
            this.trackedEntity = null;
        }
        // right
        if (Input.instance.keysDown[39] || Input.instance.keysDown[68]) {
            this.game.map.position.x -= this.scrollSpeed;
            this.trackedEntity = null;
        }
        // up 38
        if (Input.instance.keysDown[38] || Input.instance.keysDown[87]) {
            this.game.map.position.y -= this.scrollSpeed;
            this.trackedEntity = null;
        }
        // down 40     
        if (Input.instance.keysDown[40] || Input.instance.keysDown[83]) {
            this.game.map.position.y += this.scrollSpeed;
            this.trackedEntity = null;
        }
        
        // + or , to zoom in 107
        if (Input.instance.keysDown[107] || Input.instance.keysDown[188]) {
            this.scaleByDelta(40);
        }
        // - or . to zoom out 189 also on numpad
        if (Input.instance.keysDown[189] || Input.instance.keysDown[190] || Input.instance.keysDown[190]) {
            this.scaleByDelta(-40);
        }
        
        // c reset camera position
        if (Input.instance.keysDown[67]) {
            this.game.map.position.x = 0;
            this.game.map.position.y = 0;
            this.trackedEntity = null;
        }
    },
    
    scaleByDelta: function(delta, event) {
        
        var scaleDelta = delta * 0.0005;
        var newScale = this.game.map.scale + scaleDelta;
        if (newScale > 0 && newScale < 3) {
            var center = this.mouseToCamera(new cc.Point(this.size.width/2, this.size.height/2));
            this.game.map.scale = newScale;
            if (!this.trackedEntity) {
                this.centerAt(center); // scale at center is fuggan amazing
            }
        }
    },
    
    mouseToCamera: function(point) {
/*
 __        _______     __  __    _  _____ _   _     _   _  ___    ___        __
 \ \      / / ____|   |  \/  |  / \|_   _| | | |   | \ | |/ _ \  / \ \      / /
  \ \ /\ / /|  _|     | |\/| | / _ \ | | | |_| |   |  \| | | | |/ _ \ \ /\ / / 
   \ V  V / | |___    | |  | |/ ___ \| | |  _  |   | |\  | |_| / ___ \ V  V /  
    \_/\_/  |_____|   |_|  |_/_/   \_\_| |_| |_|   |_| \_|\___/_/   \_\_/\_/  
*/
        var p = new cc.Point(point.x, point.y)
        p.x -= this.size.width/2;
        p.x /= this.game.map.scale;
        p.x += this.size.width/2; // fuck yeah I've got it
        
        p.y -= this.size.height/2;
        p.y /= this.game.map.scale;
        p.y += this.size.height/2; // fuck yeah I've got it
        

        
        p.x -= (this.game.map.position.x/this.game.map.scale);
        p.y -= (this.game.map.position.y/this.game.map.scale);
        return p;
        
    },
    
    centerAt: function(point) {
        this.game.map.position.x = (-point.x + this.size.width/2)*this.game.map.scale;
        this.game.map.position.y = (-point.y + this.size.height/2)*this.game.map.scale;
    }
});


