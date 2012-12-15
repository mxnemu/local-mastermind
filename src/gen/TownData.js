G.defaultTownSettings = {
    // stupid hard coded classes
    lowerClassData: {
        maxSize: 7,
        thug: [1,5],
        worker:[1,3],
        neet:[0,2]
    },
    middleClassData: {
        maxSize: 5,
        thug: [0,3],
        worker:[2,3],
        neet:[1,1]
    },
    upperClassData: {
        maxSize: 10,
        thug: [0,2],
        worker:[1,4],
        neet:[1,10]
    },

    buildings: [
        {
            label: "Park",
            sprite: "images/park.png",
            min: 1,
            max: 1,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ]
        },
        {
            label: "Town Hall",
            sprite: "images/townhall.png",
            min: 1,
            max: 1,
        },
        {
            label: "Library",
            sprite: "images/library.png",
            min: 1,
            max: 1,
            nodes: [
                
            ],
            lowerClassJobs: 1,
            middleClassJobs: 2,
            upperClassJobs: 0
        },
        {
            label: "Middle Class House",
            sprite: "images/middleClassHouse.png",
            min: 1,
            max: 7,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ],
            middleClassHome: 5
        },
        {
            label: "Lower Class House",
            sprite: "images/lowerClassHouse.png",
            min: 1,
            max: 10,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ],
            lowerClassHome: 7
        },
        {
            label: "Upper Class House",
            sprite: "images/upperClassHouse.png",
            min: 1,
            max: 3,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ],
            upperClassHome: 10,
            middleClassHome: 2,
            middleClassJobs: 2
        },
        {
            label: "Small Store",
            sprite: "images/smallStore.png",
            min: 1,
            max: 7,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ],
            lowerClassJobs: 3,
            middleClassJobs: 1,
            upperClassJobs: 0
        },
        {
            label: "Office",
            sprite: "images/office.png",
            min: 1,
            max: 2,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ],
            lowerClassJobs: 5,
            middleClassJobs: 10,
            upperClassJobs: 3
        },
        {
            label: "Factory",
            sprite: "images/factory.png",
            min: 1,
            max: 3,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ],
            lowerClassJobs: 15,
            middleClassJobs: 5,
            upperClassJobs: 1
        }
    ]

}
