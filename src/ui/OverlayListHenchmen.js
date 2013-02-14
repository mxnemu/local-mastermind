function OverlayListHenchmen(actors) {
    OverlayListHenchmen.superclass.constructor.call(this);
    this.actors = actors;
}

OverlayListHenchmen.inherit(Object, {
    createUi: function() {
        $(".overlayList .content").empty();
        $.each(this.actors, function() {
            var actor = this;
            var li = $("<li></li>");
            li.append("<span class='fullName'>"+ this.getFullName() +"</span>");
            $(".overlayList .content").append(li);
            
            li.click(function() {
                Application.instance.game.camera.trackedEntity = actor;
            });
        });
        $(".overlayList").show("slow");
    }
});
