function ActionBoxBuilding(building, ui) {
    this.building = building
    this.ui = ui;
}

ActionBoxBuilding.inherit(Object, {
    createUi: function() {
        $(".actionBox").empty();
        $(".actionBox").append($("<span>"+ this.building.getFullName() +"</span>"));
        $(".actionBox").append($("<br/>"));
        $(".actionBox").append($("<input value='plot harassment' type='button'></input>"));
        $(".actionBox").append($("<br/>"));
        $(".actionBox").append($("<input value='charge prot. Money' type='button'></input>"));
        $(".actionBox").append($("<br/>"));
        $(".actionBox").append($("<input value='plot takeover' type='button'></input>"));
    },
    
    destroy: function() {
    }
});
