

$(function() {
    $(".fullscreenButton").click(function() {
        var element = document.getElementById("game");
        var reqFscr = element.mozRequestFullScreen ||
                      element.requestFullScreen || 
                      null;
                      
        if (reqFscr == null) {
            // webkit workaround
            if (element.webkitRequestFullScreen) {
                reqFscr = function() {
                    element.webkitRequestFullScreen(element.ALLOW_KEYBOARD_INPUT);
                }
            } else {
                reqFscr = function() {}; // just don't crash
            }
        }
                      
        reqFscr.call(element);
        
        function resizeCanvas() {
            var director = cc.Director.sharedDirector;
            var cocosElement = document.getElementById('cocos2d-demo');
            director.resize(element.clientWidth, element.clientHeight);
            Application.instance.game.camera.size = director.winSize; 
            Application.instance.game.map.contentSize = director.winSize;
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
