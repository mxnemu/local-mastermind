G.defaultTownSettings = {
    lowerClassData: {
        socialClass:"lower",
        //maxSize: 7,
        thug: [1,3],
        worker:[1,4],
        neet:[0,2],
        
        firstNames:[
            "Kevin", "Justin", "Jenny", "Jaquline", "Kanses", "Sidney",
            "Bart", "Londen", "Bobby", "Charls", "Marilyn", "Ashley",
            "Burton"
        ],
        familyNames:[
            "Baker", "Brewer", "Butcher", "Carter", "Chandler",
            "Collier", "Cooper", "Cook", "Carpenter", "Dyer", "Farmer",
            "Faulkner", "Fisher", "Fletcher", "Fowler", "Fuller", "Glover",
            "Hayward", "Manson"
        ]
    },
    middleClassData: {
        //maxSize: 5,
        socialClass:"middle",
        thug: [-1,2],
        worker:[2,3],
        neet:[1,1],
        
        firstNames:[
            "James", "Jofrey", "Johan", "Charls", "Lisa", "Merry", "Lena", "Lora",
            "Hanna", "Max"
        ],
        familyNames:[
            "Archer", "Bailey", "Hawkins", "Cutcher", "Meyer", "Hochwart",
            "Mausmann", "Obland", "Dawkins", "Monroe", "Roseveld", "Eisenhauer",
            "Power", "Clark", "Smithers", "Hensington"
        ]
    },
    upperClassData: {
        //maxSize: 10,
        socialClass:"upper",
        thug: [-3,1],
        worker:[1,4],
        neet:[2,5],
        
        firstNames:[
            "Lady Lucilia",
            "Lord MacHauton",
            "Sir Leopold",
            "Lord Dorian",
            "Lord Henry",
            "Sire Lancelot",
            "Johann Wolfgang",
            "Lady Josephine"
        ],
        familyNames:[
            "van Org",
            "van Hochblut",
            "van Überwald",
            "van VeryRichington",
            "van Gray",
            "van Gay",
            "van Wotton",
            "von Goethe"
        ]
    },

    buildings: [
        {
            label: "Police Station",
            buildingType: "policeStation",
            groups: ["police", "government"],
            sprite: "images/policeStation.png",
            lowerClassJobs: 2,
            middleClassJobs: 3,
            min: 1,
            max: 1,
            interior: {
                sprite: "images/policeStationInterior.png",
                nodes: [
                    // desk + entrance 0-4
                    {x:1145, y:756, type:"door"},
                    {x:1145, y:443, connections:[0]},
                    {x:980, y:443, connections:[1]},
                    {x:980, y:160, connections:[2]},
                    {x:1145, y:160, connections:[3], type:"work"},
                    // green mile 5-8
                    {x:867, y:443, connections:[2]},
                    {x:648, y:443, connections:[5]},
                    {x:435, y:443, connections:[6]},
                    {x:200, y:443, connections:[7]},
                    // bottom cells 9-12
                    {x:867, y:666, connections:[5], type:"cell"},
                    {x:648, y:666, connections:[6], type:"cell"},
                    {x:435, y:666, connections:[7], type:"cell"},
                    {x:200, y:666, connections:[8], type:"cell"},
                    // top cells 13-16
                    {x:867, y:200, connections:[5], type:"cell"},
                    {x:648, y:200, connections:[6], type:"cell"},
                    {x:435, y:200, connections:[7], type:"cell"},
                    {x:200, y:200, connections:[8], type:"cell"},
                ]
            }
        },
        {
            label: "Factory",
            buildingType: "factory",
            groups: ["workplace"],
            sprite: "images/factory.png",
            min: 1,
            max: 3,
            worktime: 24,
            lowerClassJobs: 6,
            middleClassJobs: 2,
            upperClassJobs: 1,
            interior: {
                sprite: "images/factoryInterior.png",
                nodes: [
                    // entrance 0-3
                    {x:1155, y:540, type:"door"},
                    {x:1155, y:386, connections:[0]},
                    {x:1155, y:320, connections:[1]},
                    // top lane 4-7
                    {x:1155, y:186, connections:[2], type:"work"},
                    {x:960, y:186, connections:[3], type:"work"},
                    {x:750, y:186, connections:[4], type:"work"},
                    {x:550, y:186, connections:[5], type:"work"},
                    // low lane 8-11
                    {x:1155, y:386, connections:[1], type:"work"},
                    {x:960, y:386, connections:[7], type:"work"},
                    {x:750, y:386, connections:[8], type:"work"},
                    {x:550, y:386, connections:[9], type:"work"},
                    // mid to boss chair 12-15
                    {x:320, y:320, connections:[2]},
                    {x:320, y:220, connections:[11]},
                    {x:150, y:220, connections:[12]},
                    {x:150, y:300, connections:[13], type:"work"},
                ]
            }
        },
        {
            label: "Park",
            buildingType: "park",
            groups: ["public"],
            sprite: "images/park.png",
            min: 1,
            max: 1,
            interior: null
        },
        {
            label: "Town Hall",
            buildingType: "townhall",
            groups: ["government"],
            sprite: "images/townhall.png",
            min: 1,
            max: 1,
            interior: {}
        },
        {
            label: "Library",
            buildingType: "library",
            groups: ["library", "workplace", "public"],
            sprite: "images/library.png",
            min: 1,
            max: 1,
            lowerClassJobs: 1,
            middleClassJobs: 2,
            upperClassJobs: 0,
            interior: {}
        },
        {
            label: "Middle Class House",
            buildingType: "middleClassHouse",
            groups: ["home"],
            sprite: "images/middleClassHouse.png",
            min: 2,
            max: 8,
            middleClassHome: 5,
            interior: {}
        },
        {
            label: "Lower Class House",
            buildingType: "lowerClassHouse",
            groups: ["home"],
            sprite: "images/lowerClassHouse.png",
            min: 3,
            max: 9,
            lowerClassHome: 7,
            interior: {
                sprite: "images/lowerClassHouseInterior.png",
                nodes: [
                    // entrance + bathroom 0-2
                    {x:1120, y:1380, type:"door"},
                    {x:1120, y:727, connections:[0]},
                    {x:1120, y:267, connections:[1], type:"bathroom"},
                    // corridor 3
                    {x:590, y:727, connections:[1]},
                    // kitchen
                    {x:590, y:490, connections:[3], type:"food"},
                    // bedroom
                    {x:590, y:1140, connections:[3], type:"sleep"},
                ]
            }
        },
        {
            label: "Upper Class House",
            buildingType: "upperClassHouse",
            groups: ["workplace", "home"],
            sprite: "images/upperClassHouse.png",
            min: 1,
            max: 4,
            worktime: 7,
            upperClassHome: 10,
            middleClassHome: 2,
            middleClassJobs: 2,
            interior: {}
        },
        {
            label: "Small Store",
            buildingType: "smallStore",
            groups: ["workplace", "store"],
            sprite: "images/smallStore.png",
            min: 1,
            max: 7,
            worktime: 17,
            lowerClassJobs: 2,
            middleClassJobs: 1,
            upperClassJobs: 0,
            interior: {
                sprite: "images/shopInterior.png",
		nodes: [
		    {x:400, y:780, type:"door"},
		    // block 1 (1-3)
		    {x:400, y:80, connections:[0], type:"buy"},
		    {x:250, y:780, connections:[0], type:"buy"},
		    {x:250, y:80, connections:[1,2], type:"buy"},
		    // block 2 (4-5)
		    {x:100, y:80, connections:[3], type:"buy"},
		    {x:100, y:780, connections:[2,4], type:"buy"},
		]
	    }
        },
        {
            label: "Office",
            buildingType: "office",
            groups: ["workplace"],
            sprite: "images/office.png",
            min: 1,
            max: 2,
            worktime: 14,
            lowerClassJobs: 2,
            middleClassJobs: 5,
            upperClassJobs: 2,
            interior: {}
        }
        
    ]

}
