function Action(args) {
    this.name = args.name;
    this.duration = args.duration || 1;
    this.progress = 0;
    this.satiety = args.satiety || -(this.duration/7);
    this.wakefulness = args.wakefulness || -(this.duration/10);
    this.onStart = args.onStart || null;
    this.onEnd = args.onEnd || null; // called when action ends normally
    this.onStop = args.onStop || null; // TODO 100% this will be called, when action stops being in queue or active
    this.onOtherArrived = args.onOtherArrived || null;
    this.lock = args.lock || null;
    this.heat = args.heat || 0; //TODO cause heat either onArrive of others, start or end
    
    if (this.lock) {
        this.lock.action = this;
    }
}

Action.inherit(Object, {
    hasStarted: function() {
        return this.progress > 0;
    },
    
    isFinished: function() {
        return this.progress >= this.duration;
    }
});

function Lock(actor, timeoutOffset) {
    timeoutOffset = timeoutOffset || 10000;
    this.actor = actor;
    this.action = null;
    this.node = null;
    this.timeoutTime = new Date().getTime() + timeoutOffset;
    this._isDestroyed = false;
}

Lock.inherit(Object, {
    get isDestroyed() {
        if (this._isDestroyed) {
            return this._isDestroyed;
        }
    
        if (this.destroyTime) {
            var currentTime = new Date().getTime();
            if (destroyTime < currentTime) {
                this._isDestroyed = true;
            }
        }
        
        if (this.action.isFinished()) {
            this._isDestroyed = true;
        }
        return this._isDestroyed;
    },
    
    set isDestroyed(value) {
        this._isDestroyed = value;
    }
});
