function ActionBoxCivilian(actor, ui) {
    this.actor = actor;
    this.ui = ui;
}

ActionBoxCivilian.inherit(Object, {
    createUi: function() {
        $(".actionBox").empty();
        $(".actionBox").append($("<span>"+ this.actor.getFullName() +"</span>"));
        $(".actionBox").append($("<br/>"));
        if (!this.ui.player.hasHenchman(this.actor)) {
            $(".actionBox").append($("<span class='hirecost'>$"+this.actor.hirecost+"</span>"))
            $(".actionBox").append($("<input value='hire' type='button'></input>"));
            $(".actionBox").append($("<br/>"));
        }
        $(".actionBox").append($("<span>Role: </span>"));
        $(".actionBox").append($("<span>"+ this.actor.role +"</span>"));
        $(".actionBox").append($("<br/>"));
        $(".actionBox").append($("<span>Action: </span>"));
        $(".actionBox").append($("<span>"+ this.actor.getActionName() +"</span>"));
    }
});
