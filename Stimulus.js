
// Stimulus: basic of all presentations on screen
function Stimulus(id, duration, ISI, listenTo, correctResponse) {
	
	this.id = id; // give your stimulus a name. Handy for data storage
	this.duration = duration; // presentation time of the stimulus. Specify in ms.
	this.ISI = ISI; // inter-stimulus-intervall = pause after stimulus before next stimulus is shown
	this.repetition = 0; // how many times has the stimulus been presented? get increased when .present() is executed
	
	this.listenTo = listenTo; // should be an array containing the allowed keypresses
	this.correctResponse = correctResponse;
	
	
	this.RT; // written to by listen(), which is called by present.
	this.correct; // written to by listen(), which is called by present.
	this.event; //  written to by listen(), which is called by present.
	
	this.features = []; // features of the stimulus that will be called by showStimulus()
	this.experiment; // points to the experiment, which calls the Stimulus. This property is added to the stimulus, when it is added to an Experiment via .add() or .addBlock()
}

Stimulus.prototype.showStimulus = function() {
	for (var i = 0; i < this.features.length; i++) {
		this.features[i](); // show all Stimulus features
	}
};
Stimulus.prototype.listen = function () {
	var that = this; // save reaction time value into RT property of each object
	var RT = 0;
	var t0 = performance.now();
	var recorded = false; // keeps track whether response has been recorded
	
	var recordResponse = function(e) {
		$(document).off();		
		that.event = e; // store key pressed as stimulus property
		that.RT = RT;
		recorded = true;
		if (!that.correctResponse) { // no correct response was specified: this.correct = undefined
			that.correct = undefined;
		}			
		else if (that.event === that.correctResponse) {
			that.correct = 1;
		}
		else {
			that.correct = 0;
		}
	};
	
	var recordNonresponse = function() {
		that.RT = 0; // no reaction after duration + ISI
		that.event = "nonresponse";
		if (!that.correctResponse) { // no correct response was specified: this.correct = undefined
			that.correct = undefined;
		}		
		else if (that.correctResponse === "nogo") {
			that.correct = 1;
		}
		else {
			that.correct = 0;
		}
	};
	
	$(document).off(); // 
	$(document).on("keypress click", function(e) {
		
		// get RT and event
		RT = performance.now() - t0;
		event = e.which;
		console.log(event);
		
		// store reaction time and response
		if (!that.listenTo) { // no allowed response was specified: just record any key press that comes
			recordResponse(event);
		}
		else if (event) { // define listening to specific key
			for (var i = 0; i < that.listenTo.length; i++) {
				if (e.which === that.listenTo[i]) {
					recordResponse(event);
				}
			}
		}
		
	});
	// set countdown for listening
	if (that.duration !== 0) { 
		var timeLeft = (that.duration+that.ISI)/10;
		var countdown = setInterval(function() {
			timeLeft--; // countdown
			if (timeLeft <= 0) {
				clearInterval(countdown);
				if (!recorded) { // no response was given
					recordNonresponse();
				} 
			}
		}, 10); // timing precision of 10ms
	}
};
Stimulus.prototype.present = function() {
	this.repetition++; // store that this stimulus has been presented
	// 1) show 
	this.showStimulus();
	// 2) listen to reaction
	this.listen();
	// 3) remove stimulus after its specified duration
	if (this.duration !== 0) {
		this.experiment.countdown(this.duration);
	}
};
