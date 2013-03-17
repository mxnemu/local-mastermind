function Action(args) {
    this.name = args.name;
    this.duration = args.duration || 1;
    this.progress = 0;
    this.satiety = args.satiety || -(this.duration/7);
    this.wakefulness = args.wakefulness || -(this.duration/10);
    this.onEnd = args.onEnd || null;
    this.onOtherArrived = args.onOtherArrived || null;
    this.criminal = args.criminal || null;
    this.lock = args.lock || null;
    
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
