// Store the experiment in a JavaScript object; experiment gets 
// started by method start
function Experiment(container) {
    // add jQuery selector as container. Not id!  
    this.container = container || "body"; 
    // Array stimuli: contains all stimuli of the experiment; add and addBlock
    // push Stimuli to this array. Experiment.start() calls the stimuli that are
    // contained in this array    
    this.stimuli = []; 
    this.nextStim = 0; // keeps track of presented stimuli
    this.CANVAS_AVAILABLE = false;
};

// Create canvas on which the experiment can be shown
Experiment.prototype.createCanvas = function() {
    $(this.container).append("<canvas id='myCanvas' width='" +
    ($(window).width()-30) + "'height= '" + ($(window).height()-30) +
    "'></canvas>");
    this.canvas = document.getElementById("myCanvas");
    this.context = this.canvas.getContext("2d");
    this.CANVAS_AVAILABLE = true;
};
// remove canvas - can be used in experiments where some stimuli are not to be presented on the canvas
// if a stimulus call is accompanied by removing the experimental canvas, the canvas should be restored if it is needed again later
Experiment.prototype.removeCanvas = function() {
    $("#myCanvas").remove();
    this.CANVAS_AVAILABLE = false;
};

// Start the experiment
Experiment.prototype.start = function() {
    this.stimuli[this.nextStim].present();
};

// Add Stimulus to experiment
Experiment.prototype.add = function(stim) {
    stim.experiment = this; // adds experiment as property to the stimulus
    this.stimuli.push(stim);
};

// Clear experimental canvas
Experiment.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

// Two functions that operate on the canvas coordinate system - aim is to make the center of the canvas (0,0) coordinate
// add function that takes a coordinate with 0, 0 = center and turns it into html canvas coordinates
Experiment.prototype.getNewX = function(coordinate) {
    return coordinate + this.canvas.width/2;
};

// add function that takes a coordinate with 0, 0 = center and turns it into html canvas coordinates
Experiment.prototype.getNewY = function(coordinate) {
    return this.canvas.height/2 - coordinate;
};

// simple data storing function; uses Stimulus method slimObject
Experiment.prototype.storeData = function() {
    var data = [];
    for (var t = 0; t < this.stimuli.length; t++) {
            data[t] = this.stimuli[t].slimObject();
    }
    data = JSON.stringify(data)
    return data;
};
