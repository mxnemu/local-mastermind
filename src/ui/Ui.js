function Ui(game) {
    Ui.superclass.constructor.call(this);
    this.game = game;
    this.player = game.player;
    this.entity = null;
    this._actionBox = null;
    this._overlayList = null;
    this.statisticsBar = new StatisticsBar(this);
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
        if (actionBox) {
            actionBox.createUi();
        }
    },   
    
    get overlayList() {
        return this._overlayList;
    },
    
    set overlayList(overlayList) {
        if (this._overlayList) {
            this._overlayList.destroy();
        }
        this._overlayList = overlayList;
        if (overlayList) {
            overlayList.createUi();
        }
    }, 
    
    setSelectedActor: function(actor) {
        this.entity = actor;
        this.actionBox = new ActionBoxCivilian(actor, this);
        $(".villianPortrait img").show();
        $(".villianPortrait img").attr("src", actor.portrait);
        this.fireEvent("actorSelected", {actor: actor});
    },
    
    setSelectedBuilding: function(building) {
        this.entity = building;
        this.actionBox = new ActionBoxBuilding(building, this);
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
        
        this.statisticsBar.init();
        //this.influenceBar = new Progressbar({height: 14, padding});
        this.tutorial.start();
    }
});
