function Observable() {
    this.observers = {};
}

Observable.inherit(Object, {
    
    addObserver: function(eventType, observer) {
        if (!this.observers[eventType]) {
            this.observers[eventType] = new Array();
        }
        
        this.observers[eventType].push(observer);
    },
    
    removeObserver: function(eventType, observer) {
        if (this.observers[eventType]) {
            for (var i=0; i < this.observers[eventType].length; ++i) {
                if (this.observers[eventType]) {
                    this.observers[eventType].splice(0, 1);
                }
            }
        }
    },
    
    fireEvent: function(eventType, event) {
        if (this.observers[eventType]) {
            for (var i=0; i < this.observers[eventType].length; ++i) {
                this.observers[eventType][i](event);
            }
        }
    }
});
