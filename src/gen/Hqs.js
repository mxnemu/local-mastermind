G.defaultHqs = {
    "moldyShack": {
        label: "Secret HQ",
        buildingType: "hq",
        groups: ["player"],
        sprite: "images/moldyShackHq.png",
        interior: {}
    },
    "momsBasement": {
        label: "Secret HQ",
        buildingType: "hq",
        groups: ["player"],
        sprite: "images/momsBasementHq.png",
        interior: {
            sprite: "images/momsBasementHqInterior.png",
            nodes: [
                {x:200, y:256, type:"door"},
                {x:245, y:443, connections:[0], type:"work"},
            ]
        }
    }
}
