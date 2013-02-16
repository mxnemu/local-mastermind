function Player() {
    this.money = 20;
    this.henchmen = [];
}

Player.inherit(Object, {
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
    }
});
