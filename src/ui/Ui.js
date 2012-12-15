function Ui() {
    this.entity = null;
    this.actionBox = null;
}

Ui.inherit(Object, {
    setSelectedActor: function(actor) {
        this.entity = actor;
        this.actionBox = new ActionBoxCivilian(actor);
        this.actionBox.createUi();
        $(".villianPortrait img").attr("src", actor.portrait);
        console.log("gothim");
    }
});
