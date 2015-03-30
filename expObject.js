// Store the experiment in a JavaScript object; experiment gets started by method start, which calls startExp()
// to do: make html canvas the basis of all stimulus presentation. Experiment object will initialize a canvas on 

function Experiment(container) {
	this.container = container || "body"; // add jQuery selector as container. Not id!
	this.contains = 0; // Property: how many Stimuli are contained in the experiment. Gets increased by add()
	this.expArr = []; // Array: contains all stimuli of the experiment; add and addBlock push Stimuli to this array		
	// methods: to be added later
	this.addBlock = undefined; // Method: Adds a block of Stimuli to the experiment. Pass a block of stimuli and a repetition number	
	this.printResults = undefined; // Method: print results of the experiment; especially correctness and RT of responses
	
};

// add Stimulus to experiment
Experiment.prototype.add = function(stim) {
	var that = this;
	stim.experiment = that; // adds experiment as property to the stimulus
	that.expArr.push(stim);
	that.contains = that.contains + 1;
};

// clear stimulus
Experiment.prototype.clear = function() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

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
	$(this.container).append("<canvas id='myCanvas' width='" + $(window).width() + "'height= '" + $(window).height() + "'></canvas>");
	this.canvas = document.getElementById("myCanvas");
	this.context = this.canvas.getContext("2d");
};

// call this to finally execute the experiment
Experiment.prototype.start = function() {
	this.createCanvas();
	startExp(this.expArr);
};

Experiment.prototype.printStimuli = function() {
	for (var i = 0; i < this.expArr.length; i++) {
		console.log("stimulus" + i + ", " + this.expArr[i].toString());
	}
};
