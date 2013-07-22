function PlayerBehaviour(actor) {
    PlayerBehaviour.superclass.constructor.call(this, actor);
}

PlayerBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        /*
        if (this.defaultActions()) {
            return;
        }
        */
        
        this.actor.addActionToPath(new Action({
            name:"plotEvil", 
            duration:randomInRange(7, 32)
        }));
    }
});
