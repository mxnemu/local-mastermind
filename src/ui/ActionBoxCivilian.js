function ActionBoxCivilian() {

}

ActionBoxCivilian.inherit(Object, {
    createUi: function() {
        $(".actionBox").empty();
        $(".actionBox").append($("<input value='hire' type='button'></input>"));
    }
});
