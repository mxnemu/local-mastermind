G.defaultTownSettings = {
    lowerClassData: {
        socialClass:"lower",
        //maxSize: 7,
        thug: [1,3],
        worker:[1,4],
        neet:[0,2],
        
        firstNames:[
            "Kevin", "Justin", "Jenny", "Jaquline", "Kanses", "Sidney",
            "Bart", "Londen", "Bobby", "Charls", "Marilyn", "Ashley"
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
            "Power", "Clark"
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
            policeJobs: 5,
            min: 1,
            max: 1,
            destinatedBuildings: [
                { buildingType: "middleClassHouse", min: 1, max:2},
                { buildingType: "lowerClassHouse", min: 0, max:1},
            ]
        },    
        {
            label: "Park",
            buildingType: "park",
            groups: ["public"],
            sprite: "images/park.png",
            min: 1,
            max: 1,
        },
        {
            label: "Town Hall",
            buildingType: "townhall",
            groups: ["government"],
            sprite: "images/townhall.png",
            min: 1,
            max: 1,
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
            upperClassJobs: 0
        },
        {
            label: "Middle Class House",
            buildingType: "middleClassHouse",
            groups: ["home"],
            sprite: "images/middleClassHouse.png",
            min: 2,
            max: 8,
            middleClassHome: 5
        },
        {
            label: "Lower Class House",
            buildingType: "lowerClassHouse",
            groups: ["home"],
            sprite: "images/lowerClassHouse.png",
            min: 3,
            max: 9,
            lowerClassHome: 7
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
            middleClassJobs: 2
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
            upperClassJobs: 0
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
            upperClassJobs: 2
        },
        {
            label: "Factory",
            buildingType: "factory",
            groups: ["workplace"],
            sprite: "images/factory.png",
            min: 1,
            max: 3,
            worktime: 24,
            lowerClassJobs: 15,
            middleClassJobs: 5,
            upperClassJobs: 1
        }
    ]

}
