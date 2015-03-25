// Store the experiment in a JavaScript object; experiment gets started by method start, which calls startExp()


var Experiment = {
	container: "body", // either body or specified id of a div
	start: startExp, // Method: call to start experiment
	printResults: undefined, // Method: print results of the experiment; especially correctness and RT of responsescreate function for this
	contains: 0, // Method: returns how many Stimuli are contained in the experiment. Gets increased by add()
	add: undefined, // Method: Adds 1 Stimulus to the experiment. 
	addBlock: undefined, // Method: Adds a block of Stimuli to the experiment. Pass a block of stimuli and a repetition number
	expArr: [], // Array: contains all stimuli of the experiment; add and addBlock push Stimuli to this array
};	
	
	
// add function that returns a Stimulus?
