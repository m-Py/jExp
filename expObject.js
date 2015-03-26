// Store the experiment in a JavaScript object; experiment gets started by method start, which calls startExp()
// to do: make html canvas the basis of all stimulus presentation. Experiment object will initialize a canvas on 

function Experiment(container) {
	
	this.container = container || "body"; // Property: parent element in which the experiment canvas element is created
	this.contains = 0; // Property: how many Stimuli are contained in the experiment. Gets increased by add()
	this.expArr = []; // Array: contains all stimuli of the experiment; add and addBlock push Stimuli to this array	
	
	this.addBlock = undefined; // Method: Adds a block of Stimuli to the experiment. Pass a block of stimuli and a repetition number	
	this.printStimuli = undefined; // Method: prints all Stimuli that are currently contained in the Experiment	
	this.printResults = undefined; // Method: print results of the experiment; especially correctness and RT of responses
	
};

// add Stimulus to experiment
Experiment.prototype.add = function(stim) {
	var that = this;
	stim.experiment = that;
	Experiment.contains = Experiment.contains + 1;	
	that.expArr.push(stim);
	that.contains = that.contains + 1;
};

Experiment.prototype.clear = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Experiment.prototype.countdown = function(duration) {
	var timeLeft = duration/10;
	var countdown = setInterval(function() {
		timeLeft--; // countdown
		if (timeLeft <= 0) {
			clearInterval(countdown);
			this.clear(); // removes shown stimulus
		}
	}, 10); // timing precision of 10ms
};

Experiment.prototype.createCanvas = function() { // Method: when experiment is initialized, create a canvas element in container element in browser		
	$("#"+this.container).append("<canvas id='myCanvas' width=" + $(window).width() + "height= " + $(window).height() + "></canvas>");
	this.canvas = document.getElementById("myCanvas");
	this.context = this.canvas.getContext("2d");
};

Experiment.prototype.start = function() {
	this.createCanvas();
	startExp(this.expArr);
};

