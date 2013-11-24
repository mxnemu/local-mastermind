function Resources() {
    this.director = cc.Director.sharedDirector;
}

/// I modified lib/cocos2d-beta2.js to make this work
/// this function does not work with the official release!
Resources.prototype.registerResource = function(path, mimetype, alias) {
    alias = alias || path;
    cc.jah.resources[alias] = {data: path, mimetype: mimetype, remote:true};
    this.director.preloader().addToQueue(path);
};

// TODO integrate audio loading into the preloader
Resources.prototype.registerAudio = function(name) {
    Audiomanager.instance.load({ 
        "ogg": "audio/"+name+".ogg",
        "aac": "audio/conversions/"+name+".aac",
        "wav": "audio/conversions/"+name+".wav",
        
    }, name); 
}

Resources.prototype.load = function() {
    // list your images here
    // they will be loaded with the loadingscreen before your game starts
    
    // actors
    this.registerResource("images/policeman.png", "image/png");
    this.registerResource("images/person.png", "image/png");
    this.registerResource("images/thug.png", "image/png");
    this.registerResource("images/neet.png", "image/png");
    this.registerResource("images/worker.png", "image/png");
    
    // bulidings
    this.registerResource("images/lowerClassHouse.png", "image/png");
    this.registerResource("images/middleClassHouse.png", "image/png");
    this.registerResource("images/upperClassHouse.png", "image/png");
    
    this.registerResource("images/moldyShackHq.png", "image/png");
    this.registerResource("images/momsBasementHq.png", "image/png");
    
    this.registerResource("images/policeStation.png", "image/png");
    this.registerResource("images/park.png", "image/png");
    this.registerResource("images/townhall.png", "image/png");
    this.registerResource("images/library.png", "image/png");
    this.registerResource("images/smallStore.png", "image/png");
    this.registerResource("images/office.png", "image/png");
    this.registerResource("images/factory.png", "image/png");
    
    // interiors
    this.registerResource("images/lowerClassHouseInterior.png", "image/png");
    this.registerResource("images/policeStationInterior.png", "image/png");
    this.registerResource("images/factoryInterior.png", "image/png");
    this.registerResource("images/shopInterior.png", "image/png");
    
    this.registerResource("images/momsBasementHqInterior.png", "image/png");

    // misc
    this.registerResource("images/house.png", "image/png");
    this.registerResource("images/badge.png", "image/png"); // the debug sprite
    
    // preload audio files
    this.registerAudio("village-tired");
}

Resources.instance = new Resources();
