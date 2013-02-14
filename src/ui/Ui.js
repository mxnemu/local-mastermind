function Ui(player) {
    Ui.superclass.constructor.call(this);
    this.player = player;
    this.entity = null;
    this._actionBox = null;
    this.statisticsBar = new StatisticsBar();
    this.tutorial = new Tutorial(this);
    this.init();
}

Ui.inherit(Observable, {

    get actionBox() {
        return this._actionBox;
    },

    set actionBox(actionBox) {
        if (this._actionBox) {
            this._actionBox.destroy();
        }
        this._actionBox = actionBox;
    },    
    
    setSelectedActor: function(actor) {
        this.entity = actor;
        this.actionBox = new ActionBoxCivilian(actor, this);
        this.actionBox.createUi();
        $(".villianPortrait img").show();
        $(".villianPortrait img").attr("src", actor.portrait);
        this.fireEvent("actorSelected", {actor: actor});
    },
    
    setSelectedBuilding: function(building) {
        this.entity = building;
        this.actionBox = new ActionBoxBuilding(building, this);
        this.actionBox.createUi();
        $(".villianPortrait img").show();
        $(".villianPortrait img").attr("src", building.portrait);
        this.fireEvent("buildingSelected", {building: building});
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
            this.fireEvent("unselected", {});
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
