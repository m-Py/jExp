
// Stimulus: basic of all presentations on screen
function Stimulus(id, duration, ISI, saveData, listenTo, correctResponse) {
	
	
	// throw some errors that can occur when a Stimulus is instantiated
	if (id === undefined) {
		throw "error: created object of type Stimulus must have property id";
	}
	else if (typeof id  !== "string" ) {
		throw "error: Stimulus 'id' must be a string";
	}
	
	if (duration === undefined) {
		throw "error: created object of type Stimulus must have property 'duration'";
	}
	else if (typeof duration  !== "number" ) {
		throw "error: property 'duration' of created Stimulus must be a number";
	}	
	
	if (ISI === undefined) {
		throw "error: created object of type Stimulus must have property 'ISI'";
	}
	else if (typeof ISI  !== "number" ) {
		throw "error: property 'ISI' of created Stimulus must be a number";
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
	
	
	// instantiate Stimulus object properties
	this.id = id; // give your stimulus a name. Handy for data storage
	this.duration = duration; // presentation time of the stimulus. Specify in ms.
	this.ISI = ISI; // inter-stimulus-intervall = pause after stimulus before next stimulus is shown
	
	this.saveData = saveData;
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
		if (that.correctResponse === undefined) { // no correct response was specified: this.correct = undefined
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
		that.event = 0;
		if (that.correctResponse === undefined) { // no correct response was specified: this.correct = undefined

			that.correct = undefined;
		}		
		else if (that.event === that.correctResponse) {
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
				
				/* example how to send data send to server; here an example JBOSS Server
				$.ajax({
					  url: "/JexpWebApp/resources/jexpService",
					  type: "POST",
					  data: JSON.stringify({"correct":that.correct, "duration":that.RT, "event": that.event, "stimName": that.id}),
					  contentType: "application/json; charset=utf-8",
					  dataType: "json",
					}).done(function(data) {
						console.log("jo " + data);
					}); */
				
			}
			
		}, 10); // timing precision of 10ms
	}
};
Stimulus.prototype.present = function() {
	this.experiment.currentStim++;
	// 1) show 
	this.showStimulus();
	// 2) listen to reaction
	if (this.saveData === true) {
		this.listen();
	}
	// 3) remove stimulus after its specified duration
	if (this.duration !== 0) {
		this.experiment.countdown(this.duration);
	}
};
