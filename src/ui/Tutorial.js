function Tutorial() {
    var _this = this;
    this.step = 1;
    this.progress = 0;
    this.skiped = false;
    this.continueLater = false;
    
    $(".tutorialBox .closeButton").click(function() {
        _this.continueLater = true;
        $(".tutorialBox").hide("slow");
    });
    
    $(".tutorialBox .skipButton").click(function() {
        _this.skiped = true;
        $(".tutorialBox").hide("slow");
    });
}

Tutorial.inherit(Object, {

    start: function() {
        if (!this.skiped && this["step" + this.step]) {
            $(".tutorialBox").show("slow");
            this["step" + this.step]();  
        } else {
            console.log("don't launch the tutorial; it's either skipped or finished;");
        }
    },

    setProgress: function(number) {
        this.progress = number > this.progress ? number : this.progress;
        this.step = number;
    },

    step1: function() {
        var _this = this;
        this.setProgress(1);
        var zoomed = false;
        var moved = false;
        var nextStep = function() {
            if (zoomed && moved) {
                _this.step2();
            }
        }
        $(".tutorialBox .content").get(0).innerHTML = 
            "Welcome to the town. <br/>" +
            "This short introduction will tell you about the people <br/>" +
            "in this town and how you can use them for your evil deeds.<br/>" +
            "<br/>" +
            "If you already know the game, you can press " +
            "the skip button.<br/>" +
            "<br/>" +
            "You can navigate using the <b>WASD</b> keys " +
            "and zoom using the <b>mousewheel</b> or the ',' and '.' keys. "
        ;
        $(".tutorialBox .continueCondition").text(
            "Move with and zoom to continue."
        );
        Game.instance.camera.addObserver("zoom", function() {
            Game.instance.camera.removeObserver("zoom", this);
            zoomed = true;
            nextStep();
        });
        Game.instance.camera.addObserver("move", function() {
            Game.instance.camera.removeObserver("move", this);
            moved = true;
            nextStep();
        });
    },
    
    step2: function() {
        var _this = this;
        this.setProgress(2);
        $(".tutorialBox .content").get(0).innerHTML =
            "To build your empire, you need henchman. <br/>" +
            "This city is full of thugs, who fit perfect for this task. <br/>" +
            "You can easily identify them by their baseballcaps."
        ;
        $(".tutorialBox .continueCondition").text(
            "Click on a thug to continue."
        );
        Game.instance.ui.addObserver("actorSelected", function(event) {
            if (event.actor && event.actor.role == "thug") {
                Game.instance.ui.removeObserver("actorSelected", this);
                _this.step3();
            } else {
                console.log("That's not a thug you genious"); // TODO tell via gui
            }
        });
    },
    
    step3: function() {
    var _this = this;
        this.setProgress(2);
        $(".tutorialBox .content").get(0).innerHTML =
            "Click on the hire button in the bottom right<br/>" +
            "to recruit your first servant."
        ;
        $(".tutorialBox .continueCondition").text(
            "Click on the hire button."
        );
        Game.instance.ui.player.addObserver("hire", function(event) {
            if (event.actor && event.actor.role == "thug") {
                Game.instance.ui.player.removeObserver("hire", this);
                _this.step4();
            } else {
                console.log("That's not a thug you genious"); // TODO tell via gui
            }
        });
    },
    
    step4: function() {
        $(".tutorialBox .content").get(0).innerHTML =
            "Hah this part of the tutorial doesn't exist, yet!<br/>" +
            "Guess you're screwed! <br/>" +
            "Gotta Wait a few weeks for updates.<br/>" //+
            //"If you're desperate for more, tell me on twitter @Nehmulos"
        ;
        $(".tutorialBox .continueCondition").text(
            "No way to continue here, because I'm lazy!"
        );
    }

});
