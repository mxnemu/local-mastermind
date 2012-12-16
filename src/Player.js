function Player() {
    this.money = 20;
    this.henchmen = [];
}

Player.inherit(Object, {
    set money(money) {
        this._money = money;
        $(".moneyDisplay").text(""+money);        
    },
    
    modifyMoney: function(difference) {
        this.setMoney(this.money + difference);
    },
    
    hasHenchman: function(actor) {
        return -1 != $.inArray(actor, this.henchmen);
    }
});
