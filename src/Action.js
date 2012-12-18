function Action(args) {
    this.duration = args.duration || 1;
    this.progress = 0;
    this.satiety = args.satiety || -(this.duration/7);
    this.wakefulness = args.wakefulness || -(this.duration/10);
    this.onEnd = args.onEnd || null;
    this.onOtherArrived = args.onOtherArrived || null;
}

Action.inherit(Object, {
    isFinished: function() {
        return this.duration >= this.progress;
    }
});
