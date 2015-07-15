// Store the experiment in a JavaScript object; experiment gets started by method start, which calls startExp()

function Experiment(container) {
	this.container = container || "body"; // add jQuery selector as container. Not id!
	this.stimuli = []; // Array: contains all stimuli of the experiment; add and addBlock push Stimuli to this array. Experiment.start() calls the stimuli that are contained in this array
	this.currentStim = 0;
};

// create canvas in which the experiment is shown
Experiment.prototype.createCanvas = function() { // Method: when experiment is initialized, create a canvas element in container element in browser		
	$(this.container).append("<canvas id='myCanvas' width='" + ($(window).width()-30) + "'height= '" + ($(window).height()-30) + "'></canvas>");
	this.canvas = document.getElementById("myCanvas");
	this.context = this.canvas.getContext("2d");
};

// start the experiment
Experiment.prototype.start = function() {
	this.createCanvas();
	this.stimuli[0].present();
};

// add Stimulus to experiment
Experiment.prototype.add = function(stim) {
	stim.experiment = this; // adds experiment as property to the stimulus
	this.stimuli.push(stim);
};

// clear experimental canvas
Experiment.prototype.clear = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

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
