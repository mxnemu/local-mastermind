function GameCalendar() {
    this.time = 0;
    this.paused = false;
    this.timeModifier = 100; // how much faster is an ingameDay to a realDay
    GameCalendar.superclass.constructor.call(this);
}

GameCalendar.inherit(Observable, {
    update: function(dt) {
        if (this.paused) {
            return;
        }
        
        var oldDate = this.toDate();        
        
        this.time += dt * this.timeModifier;
        
        var newDate = this.toDate();
        if (oldDate.getDay() != newDate.getDay()) {
            this.fireEvent("changeDay", {oldDate: oldDate, newDate:newDate});
        }
    },
    
    toDate: function() {
        return new Date(this.time * 1000); // unpercise float time
    }
});
