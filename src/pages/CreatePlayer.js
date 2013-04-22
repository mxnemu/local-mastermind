$(function() {
    var archtype = null;
    var hq = null;
    
    var namePrefix = null;
    var firstName = null;
    var lastName = null;
    var honorificTitle = null;
    
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
});
