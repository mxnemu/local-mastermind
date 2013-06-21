

$(function() {
    $(".fullscreenButton").click(function() {
        var element = document.getElementById("game");
        var reqFscr = element.webkitRequestFullScreen ||
                      element.mozRequestFullScreen ||
                      element.requestFullScreen || 
                      function() {};
        reqFscr.call(element);
        
        function resizeCanvas() {
            var director = cc.Director.sharedDirector;
            var cocosElement = document.getElementById('cocos2d-demo');
            cocosElement.innerHTML = "";
            director.attachInView(cocosElement);
            Application.instance.game.camera.size = director.winSize;
            Application.instance.bindCanvasEvents();
        }
        
        function leaveFullScreen() {
            var caller = arguments.callee;
            document.removeEventListener("webkitfullscreenchange", caller, false);
            document.removeEventListener("mozfullscreenchange", caller, false);
            document.removeEventListener("fullscreenchange", caller, false);
        
            element.classList.remove("fullscreen");
            setTimeout(resizeCanvas, 200);
        }
        
        function enterFullScreen() {
            element.classList.add("fullscreen");
            document.addEventListener("webkitfullscreenchange", leaveFullScreen);
            document.addEventListener("mozfullscreenchange", leaveFullScreen);
            document.addEventListener("fullscreenchange", leaveFullScreen);
            
            resizeCanvas();
        }

        // shitty timeout workaround for css computation time
        setTimeout(enterFullScreen, 200);
    });
});
