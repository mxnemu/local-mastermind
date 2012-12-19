function Ui(player) {
    this.player = player;
    this.entity = null;
    this.actionBox = null;
    this.tutorial = new Tutorial();
    this.init();
}

Ui.inherit(Object, {
    setSelectedActor: function(actor) {
        this.entity = actor;
        this.actionBox = new ActionBoxCivilian(actor, this);
        this.actionBox.createUi();
        $(".villianPortrait img").show();
        $(".villianPortrait img").attr("src", actor.portrait);
    },
    
    setSelectedBuilding: function(building) {
        this.entity = building;
        this.actionBox = new ActionBoxBuilding(building, this);
        this.actionBox.createUi();
        $(".villianPortrait img").show();
        $(".villianPortrait img").attr("src", building.portrait);
    },
    
    setSelectedEntity: function(entity) {
        if (entity) {
            //TODO check for type and call the other set function
        } else {
            this.entity = entity;
            this.actionBox = null;
            $(".actionBox").empty();
            $(".villianPortrait img").hide();
            $(".villianPortrait img").removeAttr("src");
        }
    },
    
    setInfluence: function(influence) {
        $(".influenceDisplay").text(influence);
    },
    
    init: function() {
        $(".overlayList .titlebar .closeButton").click(function() {
            $(".overlayList").hide("slow");
        });
        //this.influenceBar = new Progressbar({height: 14, padding});
        this.tutorial.start();
    }
});
