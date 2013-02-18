function OverlayListCivilian(actors) {
    this.actors = actors
}

OverlayListCivilian.inherit(Object, {
    createUi: function() {
        $(".overlayList .content").empty();
        $.each(this.actors, function() {
            var li = $("<li></li>");
            li.append("<span class='fullName'>"+ this.getFullName() +"</span>");
            
            $(".overlayList .content").append(li);
        });
    }
});
