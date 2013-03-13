function ActionBoxBuilding(building, ui) {
    this.building = building
    this.ui = ui;
}

ActionBoxBuilding.inherit(Object, {
    createUi: function() {
        var _this = this;
        var enterButton = $("<input value='look inside' type='button'></input>");
        
        enterButton.click(function() {
            if (_this.ui.game.map != _this.building.interiorMap) {
                _this.ui.game.camera.jumpToMap(_this.building.interiorMap);
            }
        });
        
        $(".actionBox").empty();
        $(".actionBox").append($("<span>"+ this.building.getFullName() +"</span>"));
        $(".actionBox").append($("<br/>"));
        $(".actionBox").append(enterButton);
        $(".actionBox").append($("<br/>"));
        $(".actionBox").append($("<input value='More...' type='button'></input>"));
        // TODO charge prot money, add $ icon to regularly charged buildings
        // TODO show statistics, workers, inhabitants
        // TODO plot heist / harassment menu
    },
    
    destroy: function() {
        //FIXME
        this.ui.game.camera.removeObserver();
    
    }
});
