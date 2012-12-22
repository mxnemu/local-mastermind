function PopulationGenerator(data, buildings) {
    this.buildings = buildings;
    this.data = data;
    
}

PopulationGenerator.inherit(Object, {

    create: function(map) {
        var _this = this;
        this.households = [];
        $.each(this.buildings, function() {
            var household;
            
            if (this.upperClassHome > 0) {
                household = _this.createUpperClassHousehold(this);
            } else if (this.lowerClassHome > 0) {
                household = _this.createLowerClassHousehold(this);
            } else if (this.middleClassHome > 0) {
                household = _this.createMiddleClassHousehold(this);
            }
            
            if (household) {
                _this.households.push(household);
            }
        });
        
        this.asignJobs();
        this.addToMap(map);
    },
    
    asignJobs: function() {
        var _this = this;
        // find jobs you lazy scum!
        $.each(this.households, function() {
            var household = this;
            for(var i=0; i < this.actors.length; ++i) {
                var actor = this.actors[i];
                
                // asign workers
                if (actor.role == "worker") {

                    // asign to first best free job
                    $.each(_this.buildings, function() {
                        if (!actor.job && this.hire(actor)) {
                            return;
                        }
                    });
                    
                    // kill workers who can't get a job - life is harsh
                    if (!actor.job) {
                        console.log("could not hire " + actor.socialClass +
                                    " so he commited sodoku");
                        household.removeActor(actor);
                        --i;
                    }
                }
            };
        });
    },
    
    addToMap: function(map) {
        $.each(this.households, function() {
            $.each(this.actors, function() {
                map.addActor(this);
            });
        });
    },
    
    createUpperClassHousehold: function(home) {
        return this.createHousehold(home, this.data.upperClassData);
    },
    
    createMiddleClassHousehold: function(home) {
        return this.createHousehold(home, this.data.middleClassData);
    },
    
    createLowerClassHousehold: function(home) {
        return this.createHousehold(home, this.data.lowerClassData);
    },
    
    createHousehold: function(home, data) {
        var household = new Household(home);
        
        var numberOfThugs = randomInRangearray(data.thug);
        for (var i=0; i < numberOfThugs; ++i) {
            household.addActor(this.createThug(household, data));
        }
        var numberOfWorkers = randomInRangearray(data.worker);
        for (var i=0; i < numberOfWorkers; ++i) {
            household.addActor(this.createWorker(household, data))
        }
        var numberOfNeets = randomInRangearray(data.neet);
        for (var i=0; i < numberOfNeets; ++i) {
            household.addActor(this.createNeet(household, data))
        }
        
        if (home.destinatedWorkplace) {
            household.destinatedWorkplace = home.destinatedWorkplace;
            delete home.destinatedWorkplace;
        }
        
        this.nameHouseholdMembers(household, data);
        //console.log(household.familyName+" "+household.actors.length);
        return household;
    },
    
    createThug: function(household, data) {
        var actor = new Actor(household.home.node, "images/thug.png", household);
        actor.role = "thug";
        actor.socialClass = data.socialClass;
        actor.behaviour = new ThugBehaviour(actor);
        return actor;
    },
    
    createWorker: function(household, data) {
        var actor = new Actor(household.home.node, "images/worker.png", household);
        actor.role = "worker";
        actor.socialClass = data.socialClass;
        actor.behaviour = new WorkerBehaviour(actor);
        return actor;
    },
    
    createNeet: function(household, data) {
        var actor = new Actor(household.home.node, "images/neet.png", household);
        actor.role = "neet";
        actor.socialClass = data.socialClass;
        actor.behaviour = new NeetBehaviour(actor);
        return actor;
    },
    
    // avoid duplicate family names and duplicate first names in 1 household
    nameHouseholdMembers: function(household, data) {
        if (!data.freeLastNames || data.freeLastNames.length == 0) {
            data.freeLastNames = data.familyNames.slice();
        }
        var familyNameIndex = Math.floor(randomInRange(0, data.freeLastNames.length));
        household.familyName = data.freeLastNames[familyNameIndex];
        data.freeLastNames.splice(familyNameIndex,1);
        
        var freeNames = data.firstNames.slice();
        $.each(household.actors, function() {
            if (freeNames.length == 0) {
                freeNames = data.firstNames.slice();
            }
            var nameIndex = Math.floor(randomInRange(0, freeNames.length));
            this.firstName = freeNames[nameIndex];
            freeNames.splice(nameIndex,1);
            
            this.familyName = household.familyName;
        });
    },

});
