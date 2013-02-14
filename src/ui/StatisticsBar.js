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
            ui.overlay = new OverlayListHenchmen(_this.ui.player.henchmen);
        });
    }
});
