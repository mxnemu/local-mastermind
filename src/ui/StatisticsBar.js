function StatisticsBar(ui) {
    this.ui = ui;
}

StatisticsBar.inherit(Object, {
    init: function() {
        if (this.ui.player.henchmen.length > 0) {
            $(".showHenchmenButton").show("slow");
        }
    }
});
