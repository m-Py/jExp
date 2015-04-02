// Store the experiment in a JavaScript object; experiment gets started by method start, which calls startExp()

function Experiment(container) {
	this.container = container || "body"; // add jQuery selector as container. Not id!
	this.contains = 0; // Property: how many Stimuli are contained in the experiment. Gets increased by add()
	this.expArr = []; // Array: contains all stimuli of the experiment; add and addBlock push Stimuli to this array. Experiment.start() calls the stimuli that are contained in this array
	this.data = [];
	this.UserDefinedVars = {};
};

// add Stimulus to experiment
Experiment.prototype.add = function(stim) {
	var that = this;
	stim.experiment = that; // adds experiment as property to the stimulus
	that.expArr.push(stim);
	that.contains = that.contains + 1;
};

// block several stimuli into one unit; this block of stimuli is presented as many times as specified in repetition argument
Experiment.prototype.addBlock = function(repetition) { 
	for (var t = 0; t < repetition; t++) {
		for (var i = 1; i < arguments.length; i++) {
			this.add(arguments[i]);
		}
	}
};

// clear stimulus
Experiment.prototype.clear = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

// method to remove stimulus after Stimulus.duration 
Experiment.prototype.countdown = function(duration) {
	var that = this;	
	var timeLeft = duration/10;
	var countdown = setInterval(function() {
		timeLeft--; // countdown
		if (timeLeft <= 0) {
			clearInterval(countdown);
			that.clear(); // removes shown stimulus
		}
	}, 10); // timing precision of 10ms
};

// create canvas in which the experiment is shown
Experiment.prototype.createCanvas = function() { // Method: when experiment is initialized, create a canvas element in container element in browser		
	$(this.container).append("<canvas id='myCanvas' width='" + ($(window).width()-30) + "'height= '" + ($(window).height()-30) + "'></canvas>");

	this.canvas = document.getElementById("myCanvas");
	this.context = this.canvas.getContext("2d");
};

// call this to finally execute the experiment
Experiment.prototype.start = function() {
	this.createCanvas();
	startExp(this.expArr);
};

// method to log results of stimuli
Experiment.prototype.saveResults = function() {
	return(JSON.stringify(this.data));
};

// add function that takes a coordinate with 0, 0 = center and turns it into html canvas coordinates
Experiment.prototype.getNewX = function(coordinate) {
	return coordinate + this.canvas.width/2;
};

// add function that takes a coordinate with 0, 0 = center and turns it into html canvas coordinates
Experiment.prototype.getNewY = function(coordinate) {
	return this.canvas.height/2 - coordinate;
};



