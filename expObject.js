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
	
	createCanvas(); // Method: when experiment is initialized, create a canvas element in container element in browser		
	
};
	
	
// add function that returns a Stimulus?
Experiment.prototype.createStim(duration, ISI, listening) {
	
	Experiment.contains = Experiment.contains + 1;
	
	return new Stimulus(Experiment.container, "st"+Experiment.contains, duration, ISI, listening);
	
};

Stimulus.prototype.addFeature(type, size, x1, y1, x2, y2) { // name feature type and coordinates, radius, size etc. Overloading is necessary here; see how to best implement it
	switch(type) {
		case "cross":
		// doStuff()
		break;
		
		case: "rectangle":
		// doStuff()
		break;	
		
		case: "rectangle":
		// doStuff()
		break;		
		
		this.features[featureNumber] = doStuff();
		this.featureNumber = this.featureNumber + 1;
};

Stimulus.prototype.loadFeatures() { // I want this: a function that adds a feature to the stimulus. This code should get called by showStimulus()

};
