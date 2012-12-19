function Tutorial() {
    this.step = 0;
    this.progress = 0;
    this.skiped = false;
}

Tutorial.inherit(Object, function() {

    start: function() {
        this["step" + this.step]();  
    },

    setProgress: function(number) {
        this.progress = number > this.progress ? number : this.progress;
        this.step = number;
    },

    step1: function() {
        this.setProgress(1);
        var zoomed = false;
        var moved = false;
        var nextStep = function() {
            if (zoomed && moved) {
                step2();
            }
        }
        $(".tutorialBox .content").text(
            "Welcome to the town. " +
            "You can navigate using the WASD keys " +
            "and zoom using the mousewheel or the ',' and '.' keys. " +
            "This short introduction will tell you about the people " +
            "in this town and how you can use them for your evil deeds.\n" +
            "If you already know the game, you can press " +
            "the skip button."
        );
        $(".tutorialBox .continueCondition").text(
            "Move with wasd and zoom with ., to continue."
        );
        
        Game.instance.camera.addEventListener("zoom", function() {
            Game.instance.camera.removeEventListener("zoom", this);
            zoomed = true;
            nextStep();
        });
        Game.instance.camera.addEventListener("move", function() {
            Game.instance.camera.removeEventListener("move", this);
            moved = false;
            nextStep();
        });
    },
    
    step2: function() {
        this.setProgress(2);
        $(".tutorialBox .content").text(
            "To build your empire, you need henchman. " +
            "This city is full of thugs, who fit perfect for this task. " +
            "You can easily identify them by their baseballcaps."
        );
        $(".tutorialBox .continueCondition").text(
            "Move with wasd and zoom with ., to continue."
        );
        Game.instance.ui.addEventListener("actorSelected", function(actor) {
            if (actor && actor.role == "thug") {
                Game.instance.ui.removeEventListener("actorSelected", this);
                nextStep();
            } else {
                console.log("That's not a thug you genious"); // TODO tell via gui
            }
        });
    },
    
    step3: function() {
        $(".tutorialBox .content").text(
            "Hah this part of the tutorial doesn't exist, yet!" +
            "Guess you're screwed! Wait a few weeks for updates." +
            "If you're desperate for more, tell me on twitter @Nehmulos"
        );
        $(".tutorialBox .continueCondition").text(
            "No way to continue here, because I'm lazy!"
        );
    }

});
