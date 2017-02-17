
// Stimulus: basic experimental unit
// Stimulus constructor
function Stimulus(id, type, duration, saveData, listenTo, correctResponse) {
    
    /* throw some errors that can occur when a Stimulus is instantiated
    if (id === undefined) {
        throw "error: created object of type Stimulus must have 'id' property";
    }
    else if (typeof id  !== "string" ) {
        throw "error: Stimulus 'id' must be a string";
    }
    
    if (duration === undefined) {
        throw "error: created object of type Stimulus must have 'duration'" +
        "property ";
    }
    else if (typeof duration  !== "number" ) {
        throw "error: property 'duration' of created Stimulus must be a number";
    }	
    
    if (saveData !== undefined) {
        if (saveData.constructor.name !== "Boolean") {
            throw "error: saveData parameter of created Stimulus object must be Boolean or left out";
        }
    }
    
    if (listenTo !== undefined) {
        if (listenTo.constructor.name !== "Array") {
            throw "error: listenTo parameter of created Stimulus object must either be 'Array' or left out";
        }
    }
    
    if (correctResponse !== undefined) {
        if (typeof correctResponse !== "number") {
            throw "error: correctResponse parameter of created Stimulus object must either be 'number' or left out";
        }
    }
    */
    
    // each instantiated Stimulus needs an id:
    this.id = id; 
    // must be: 'html' or 'canvas', defaults to canvas
    this.type = type || 'canvas'; 
    // presentation time of the stimulus. Specify in ms (can be negative!)
    this.duration = duration;
    // logical - should response be stored?
    this.saveData = saveData || false;
    // array containing the allowed keypresses (default: all allowed)
    this.listenTo = listenTo || [];
    // which is the correct response?
    this.correctResponse = correctResponse; 
    this.RT; // written to by listen() if saveData === true; response time
    // written to by listen() if saveData === true; which response was given
    this.event; 
    // written to by listen() if saveData === true; correctness of response    
    this.correct;
    // array containing functions that are called when the stimulus is called 
    this.features = []; 
    // points to the Experiment object which calls all Stimuli in a 
    //sequential fashion. This property is added to the stimulus, when it 
    // is added to an Experiment via .add()
    this.experiment; 

}
// Call all functions that are contained in the Stimulus.features array - this is how the functionality of the Stimulus is realized
Stimulus.prototype.showStimulus = function() {
    for (var i = 0; i < this.features.length; i++) {
        this.features[i](); // show all Stimulus features
    }
};
// store reactions and reaction time
// listen() in its current form is deprecated and will not work - is to be reworked
Stimulus.prototype.listen = function () {
    var that = this; // save reaction time value into RT property of each object
    var RT = 0;
    var t0 = performance.now(); // take initial time stamp
    // default: if no response is made, the correctness is not evaluated
    that.correct = undefined;  
    
    var recordResponse = function(key, rt) {
        $(document).off();
        that.event = key; // store key pressed as stimulus property
        that.RT = RT;
        if (that.event === that.correctResponse) {
            that.correct = 1;
        }
        else {
            that.correct = 0;
        }
    };
    $(document).off();
    $(document).on("keypress click", function(e) {
        // get RT and event
        RT = performance.now() - t0;
        event = e.which;
        console.log(event);
        // store reaction time and response
        // if no allowed response was specified: just record any 
        // key press that comes
        if (!that.listenTo) { 
            recordResponse(event);
        }
        else { // define listening to specific key
            for (var i = 0; i < that.listenTo.length; i++) {
                if (e.which === that.listenTo[i]) {
                        recordResponse(event);
                }
            }
        }
});
};

// present() is called for each experiment Stimulus in sequential order
// shows stimulus, records response (currently not working), removes it after `duration` and calls the next Stimulus
Stimulus.prototype.present = function() {
    this.experiment.nextStim++; // index that points to 
    // 1) show the stimulus
    this.showStimulus();
    // 2) listen to reaction
    if (this.saveData === true) {
        this.listen();
    }
    // 3a) remove stimulus after its specified duration
    if (this.duration > 0) {
        this.waitCountdown(this.duration);
    }
    // 3b) OR: remove after event has occured
    else if (this.duration === 0) {
        this.waitEvent();
    }
   // this leaves the possibility for negative numbers if showNext is to 
   // be called directly
};
// waitCountdown: remove Stimulus after Stimulus.duration 
Stimulus.prototype.waitCountdown = function(duration) {
    var that = this;	
    var timeLeft = duration/10;
    var countdown = setInterval(function() {
        timeLeft--; // countdown
        if (timeLeft <= 0) {
            clearInterval(countdown);
            that.showNext(); // call next stimulus in Experiment
        }
    }, 10); // timing precision of 10ms
};
// waitEvent: remove stimulus after a certain event has occured (if Stimulus.duration === 0!)
// TO DO: implement more possibilies than just keypress and mouse click
Stimulus.prototype.waitEvent = function() {
    that = this;
    $(document).on("keypress click", function(e) {
        if (that.listenTo[0] !== undefined) { // allowed keys are specified
            // check if pressed key was allowed
            for (var i = 0; i < that.listenTo.length; i++) {
                if (e.which === that.listenTo[i]) {
                    $(document).off();
                    that.showNext();
                }
            }
        } else {
            $(document).off();
            that.showNext();
        }
    });
};
// function: show next stimulus of experiment
Stimulus.prototype.showNext = function() {
    // clear canvas if there is one
    if (this.experiment.CANVAS_AVAILABLE === true) {
        this.experiment.clear();
    }
    // show next stimulus; only show next if there is a next stimulus
    if (this.experiment.nextStim < this.experiment.stimuli.length) {
        this.experiment.stimuli[this.experiment.nextStim].present();
    }
};
