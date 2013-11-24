function TestGame(root) {
    TestGame.superclass.constructor.call(this);
}

TestGame.inherit(Game, {

    init: function() {
        var map = new Map();
        var nodes = new Array();
        nodes.push(new Node( 100, 100));
        nodes.push(new Node( 400, 100, [nodes[0]]));
        nodes.push(new Node( 700, 100, [nodes[1]]));
        nodes.push(new Node( 400, 400, [nodes[1]]));
        map.setNodes(nodes);
        
        var sprite = new cc.Sprite({file: "images/house.png"});
        sprite.position = new cc.Point(100, 200);
        map.addSprite(sprite);
        
        var actor = new Actor(nodes[3]);
        map.addActor(actor);
        actor.path = nodes[3].findPath(nodes[2]);
        this.setMap(map);
        
        this.camera.trackedEntity = actor;
    }
});
