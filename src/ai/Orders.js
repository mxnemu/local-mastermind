function Orders() {}

Orders.command = function(orderName, actor, node) {
    fn = Orders[orderName];
    if (fn) {
        return fn(actor, node);
    }
},
    
Orders.harassVisitors = function(actor, node) {
    Orders._harass(actor, node, function(victim) {
        return victim.role != "policeman" && victim.role != "worker";
    });
},
    
Orders.harassWorkers = function(actor, node) {
    Orders._harass(actor, node, function(victim) {
        return victim.role == "worker" && 
               victim.job.workplaceBuilding.node == node;
    });
},
    
Orders.claimProtectionMoney = function(actor, node) {
    actor.path.toNode(node);
    actor.addAction(new Action({name:"unimplemented protectionmoney charge"}));
},
    
Orders._harass = function(actor, node, filter) {
    var player = Application.instance.game.player.actor;
    actor.path.toNode(node);
    actor.addActionToPath(new Action({
        name:"lookForVictims",
        duration: 15,
        onOtherArrived: function(other) {
            if (!filter) {
                return; // TODO let player set a setting to attack the police
            }
            
            this.interjectAction(new Action({
                name:"harass",
                heat: 100,
                duration: 5
            }));
            other.interjectAction(new Action({
                name:"gettingHarassed",
                duration: 5,
                onEnd: function() {
                    var harressedMoney = 5;
                    this.transfereMoney(player, harressedMoney);
                }
            }));
        }
    }));
}
