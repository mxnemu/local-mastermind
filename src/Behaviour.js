function Behaviour(actor) {
    this.actor = actor;
}

Behaviour.inherit(Object, {
    findNewAction: function() {
        
    }
});


function ThugBehaviour(actor) {
    ThugBehaviour.superclass.constructor.call(this, actor);
}

ThugBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        
    }
});

function WorkerBehaviour(actor) {
    WorkerBehaviour.superclass.constructor.call(this, actor);
}

WorkerBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        
    }
});

function NeetBehaviour(actor) {
    NeetBehaviour.superclass.constructor.call(this, actor);
}

NeetBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        
    }
});

function PoliceBehaviour(actor) {
    PoliceBehaviour.superclass.constructor.call(this, actor);
}

PoliceBehaviour.inherit(Behaviour, {
    findNewAction: function() {
        
    }
});
