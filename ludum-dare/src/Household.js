function Household(home) {
    this.actors= [];
    this.home = home;
    
    this.resources = 700;
    this.minResources = 10;
    this.maxResources = 1000;
    this.plannedResourceAddition = 0;
}

Household.inherit(Object, {
    addActor: function(actor) {
        this.actors.push(actor);
        actor.household = this;
    },
    
    removeActor: function() {
        var index = $.inArray()
        if (index != -1) {
            this.actors.splice(index, 1);
        }
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
