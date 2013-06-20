$(function() {
    var archtype = null;
    var hq = null;
    
    var namePrefix = null;
    var firstName = null;
    var lastName = null;
    var honorificTitle = null;
    
    var status = {
        pageId:0    
    };
    
    var loadPage = function(id) {
        var pages = $(".screen");
        if (id < 0 || id >= pages.length) {
            return;
        }
    
        status.pageId = id;
        $(".screen").hide("slow");
        $(pages.get(id)).show("slow");
    };
    
    $(".previousPageButton").click(function() {
        console.log("prev");
        loadPage(status.pageId-1);
    });
    
    $(".nextPageButton").click(function() {
        console.log("next");
        loadPage(status.pageId+1);
    });
    
    $("input[type=radio][name=archtype]").change(function() {
        archtype = this.value;
        $(".archtypeText").text(archtype);
    });
    $("input[type=radio][name=hq]").change(function() {
        hq = this.value;
        $(".hqText").text(hq);
    });
    
    $(".namePrefix").on("input", function(event) {
        namePrefix = event.target.value;
        $(".namePrefixText").text(namePrefix);
    });
    $(".firstName").on("input", function(event) {
        firstName = event.target.value;
        $(".firstNameText").text(firstName);
    });
    $(".lastName").on("input", function(event) {
        lastName = event.target.value;
        $(".lastNameText").text(lastName);
    });
    $(".honorificTitle").on("input", function(event) {
        honorificTitle = event.target.value;
        $(".honorificTitleText").text(honorificTitle);
    });
    
    $(".startGameButton").click(function() {
        $("input").trigger("input");
        if (!archtype) {
            $("input[type=radio][name=archtype]:first").trigger("change");
        }
        if (!hq) {
            $("input[type=radio][name=hq]:first").trigger("change");
        }
        var json = {
            namePrefix: namePrefix,
            firstName: firstName,
            lastName: lastName,
            honorificTitle: honorificTitle,
            
            archtype: archtype,
            hq: hq,
        };
        window.location = "index.html#newGame:" + JSON.stringify(json);
    });
});
