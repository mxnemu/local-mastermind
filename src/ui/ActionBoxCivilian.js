function ActionBoxCivilian(actor) {
    this.actor = actor;
}

ActionBoxCivilian.inherit(Object, {
    createUi: function() {
        $(".actionBox").empty();
        $(".actionBox").append($("<span>"+ this.actor.getFullName() +"</span>"));
        $(".actionBox").append($("<br/>"));
        $(".actionBox").append($("<input value='hire' type='button'></input>"));
    }
});
