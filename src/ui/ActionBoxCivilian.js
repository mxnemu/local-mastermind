function ActionBoxCivilian(actor, ui) {
    this.actor = actor;
    this.ui = ui;
}

ActionBoxCivilian.inherit(Object, {
    createUi: function() {
        var _this = this;
        $(".actionBox").empty();
        $(".actionBox").append($("<span>"+ this.actor.getFullName() +"</span>"));
        $(".actionBox").append($("<br/>"));
        if (!this.ui.player.hasHenchman(this.actor) && this.actor.role == "thug" || this.actor.role == "nerd") {
            var hireButton = $("<input value='hire' type='button'></input>");
            $(".actionBox").append($("<span class='hirecost'>$"+this.actor.hirecost+"</span>"))
            $(".actionBox").append(hireButton);
            $(".actionBox").append($("<br/>"));
            
            hireButton.click(function() {
                _this.ui.player.hire(_this.actor);
                _this.ui.setSelectedActor(_this.actor);
            });
        }
        $(".actionBox").append($("<span>Role: </span>"));
        $(".actionBox").append($("<span>"+ this.actor.role +"</span>"));
        $(".actionBox").append($("<br/>"));
        $(".actionBox").append($("<span>Action: </span>"));
        $(".actionBox").append($("<span class='actionDisplay'>"+ this.actor.getActionName() +"</span>"));
        
        this.onActionChanged = function() {
            $(".actionBox .actionDisplay").text(_this.actor.getActionName());    
        };
        this.actor.addObserver("actionChanged", this.onActionChanged);
    },
    
    destroy: function() {
        this.actor.removeObserver("actionChanged", this.onActionChanged);
    }
});
