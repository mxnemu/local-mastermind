function Household(home) {
    this.actors= [];
    this.home = home;
}

Household.inherit(Object, {
    addActor: function(actor) {
        this.actors.push(actor);
    }
});
