// Store the experiment in a JavaScript object; experiment gets started by method start, which calls startExp()
// to do: make html canvas the basis of all stimulus presentation. Experiment object will initialize a canvas on 

function Experiment(container) {
	
	this.container = container || "body"; // Property: parent element in which the experiment canvas element is created
	this.contains = 0; // Property: how many Stimuli are contained in the experiment. Gets increased by add()
	this.addStim = undefined; // Method: Adds 1 Stimulus to the experiment
	this.addBlock = undefined; // Method: Adds a block of Stimuli to the experiment. Pass a block of stimuli and a repetition number
	this.expArr = []; // Array: contains all stimuli of the experiment; add and addBlock push Stimuli to this array	
	this.printStimuli = undefined; // Method: prints all Stimuli that are currently contained in the Experiment	
	this.start = startExp; // Method: call to start experiment	
	this.printResults = undefined; // Method: print results of the experiment; especially correctness and RT of responses
	
	this.createCanvas = function() { // Method: when experiment is initialized, create a canvas element in container element in browser		
		$(container).append("<canvas id='myCanvas' width=" + $(window).width() + "height= " + $(window).height() + "></canvas>");
		this.canvas = document.getElementById("myCanvas");
		this.context = canvas.getContext("2d");
	};

};

Experiment.prototype.clear() {
	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

// add function that returns a Stimulus?
Experiment.prototype.add(duration, ISI, listening) {
	Experiment.contains = Experiment.contains + 1;
	return new Stimulus(duration, ISI, listening);
};

