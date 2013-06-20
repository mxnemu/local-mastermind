

$(function() {
    $(".fullscreenButton").click(function() {
        var element = document.getElementById("game");
        var reqFscr = element.webkitRequestFullScreen ||
                      element.mozRequestFullScreen ||
                      element.requestFullScreen || 
                      function() {};
        reqFscr.call(element);
        
        element.classList.add("fullscreen");
        
        // shitty timeout workaround for css computation time
        setTimeout(function() {
            var director = cc.Director.sharedDirector;
            var cocosElement = document.getElementById('cocos2d-demo');
            cocosElement.innerHTML = "";
            director.attachInView(cocosElement);
        }, 200);
    });
});
