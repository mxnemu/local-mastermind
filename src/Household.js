function Household(home) {
    this.actors= [];
    this.home = home;
    
    this.resources = 100;
    this.minResources = 10;
    this.maxResources = 200;
    this.plannedResourceAddition = 0;
}

Household.inherit(Object, {
    addActor: function(actor) {
        this.actors.push(actor);
    },
    
    refillResources: function() {
        this.resources = Math.min(this.resources + this.plannedResourceAddition,
                                  this.maxResources);
        this.plannedResourceAddition = 0;
    },
    
    // The normals say 'Somebody must go shopping'
    requiresResourceAddition: function() {
        return this.resources + this.plannedResourceAddition < this.minResources;
    }
});
