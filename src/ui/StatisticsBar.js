function StatisticsBar(ui) {
    this.ui = ui;
}

StatisticsBar.inherit(Object, {
    init: function() {
        var _this = this;
        if (this.ui.player.henchmen.length > 0) {
            $(".showHenchmenButton").show("slow");
        }
        
        $(".showHenchmenButton").click(function() {
            _this.ui.overlayList = new OverlayListHenchmen(_this.ui.player.henchmen);
        });
        
        $(".leaveBuildingButton").click(function() {
            _this.ui.game.camera.jumpToMap(_this.ui.game.outdoorMap, _this.ui.game.map.building);
        });

        this.ui.game.addObserver("changeMap", function(event) {
            if (event.newMap != _this.ui.game.outdoorMap) {
                $(".leaveBuildingButton").show("slow");
            } else {
                $(".leaveBuildingButton").hide("slow");
            }
        });
    }
});
