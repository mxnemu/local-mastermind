G.defaultTownSettings {
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
            sprite: "iamges/library.png",
            min: 1,
            max: 1,
            nodes: [
                
            ]
            lowerClassJobs: 1,
            middleClassJobs: 2,
            upperClassJobs: 0
        },
        {
            label: "Middle Class House",
            sprite: "iamges/MiddleClassHouse.png",
            min: 1,
            max: 1,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ]
        },
        {
            label: "Lower Class House",
            sprite: "iamges/lowerClassHouse.png",
            min: 1,
            max: 1,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ]
        },
        {
            label: "Upper Class House",
            sprite: "iamges/upperClassHouse.png",
            min: 1,
            max: 1,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ]
        },
        {
            label: "Small Store",
            sprite: "iamges/smallStore.png",
            min: 1,
            max: 7,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ]
            lowerClassJobs: 3,
            middleClassJobs: 1,
            upperClassJobs: 0
        },
        {
            label: "Office",
            sprite: "iamges/office.png",
            min: 1,
            max: 1,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ]
            lowerClassJobs: 5,
            middleClassJobs: 10,
            upperClassJobs: 3
        },
        {
            label: "Factory",
            sprite: "iamges/factory.png",
            min: 1,
            max: 3,
            nodes: [
                {x: 0, y: 100, openTo:["left","south","north"]},
            ]
            lowerClassJobs: 15,
            middleClassJobs: 5,
            upperClassJobs: 1
        }
    ]

}
