function Ui() {
    this.entity = null;
    this.actionBox = null;
    this.init();
}

Ui.inherit(Object, {
    setSelectedActor: function(actor) {
        this.entity = actor;
        this.actionBox = new ActionBoxCivilian(actor);
        this.actionBox.createUi();
        $(".villianPortrait img").attr("src", actor.portrait);
    },
    
    setSelectedBuilding: function(building) {
        this.entity = building;
        this.actionBox = new ActionBoxBuilding(building);
        this.actionBox.createUi();
        $(".villianPortrait img").attr("src", building.portrait);
    },
    
    init: function() {
        $(".overlayList .titlebar .closeButton").click(function() {
            $(".overlayList").hide("slow");
        });
    }
});
