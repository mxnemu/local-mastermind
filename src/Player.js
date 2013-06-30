function Player() {
    Player.superclass.constructor.call(this);
    this.money = 20;
    this.henchmen = [];
}

Player.inherit(Observable, {
    get money() {
        return this._money;
    },

    set money(money) {
        this._money = money;
        $(".moneyDisplay").text(""+money);        
    },
    
    modifyMoney: function(difference) {
        this.setMoney(this.money + difference);
    },
    
    hasHenchman: function(actor) {
        return -1 != $.inArray(actor, this.henchmen);
    },
    
    hire: function(actor) {
        this.money -= actor.hirecost;
        this.henchmen.push(actor);
        //TODO make customizable
        actor.badge = new cc.Sprite({file:"images/badge.png"});
        $(".showHenchmenButton").show("slow");
        this.fireEvent("hire", {actor:actor});
    },
    
    createFromJson: function(data) {
        this.hq = new Building();
        this.hq.restore(G.defaultHqs[data.hq]);
        
        this.namePrefix = data.namePrefix;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.honorificTitle = data.honorificTitle;
        
        // TODO add attributes for archtype
        this.archtype = data.archtype;
    }
});
