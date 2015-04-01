
// Stimulus: basic of all presentations on screen
function Stimulus(id, duration, ISI, listenTo, correctResponse) {
	
	this.id = id; 
	this.duration = duration; // presentation time of the stimulus. Specify in ms.
	this.ISI = ISI; // inter-stimulus-intervall = pause after stimulus before next stimulus is shown
	this.repetition = 0;
	
	this.listenTo = listenTo; // should be an array containing the allowed keypresses
	this.correctResponse = correctResponse;
	
	this.RT; // will be written to if listen method is executed
	this.correct; // was given response correct
	this.event;
	
	this.featureNumber = 0;
	this.features = []; // features of the stimulus that will be called by showStimulus()
	this.experiment; // property gets added when stimulus is added to experiment
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


// prototype methods to add features to Stimuli
// add text
Stimulus.prototype.addText = function(text, size, color, x1, y1) { // name feature type and coordinates, radius, size etc. Overloading is necessary here; see how to best implement it
	var that = this;
	that.text = text;
	var draw = function () {
		that.experiment.context.font = ""+size + "px Arial" || "100px Arial";
		that.experiment.context.fillStyle = color || "black";
		that.experiment.context.textAlign = "center";
		that.experiment.context.fillText(that.text, that.experiment.canvas.width/2, (that.experiment.canvas.height/2)+(size/2.5)); // trying to vertically align text
	};
	that.features[that.featureNumber] = draw;
	that.featureNumber = that.featureNumber + 1;
};
// add fixation cross
Stimulus.prototype.addCross = function(size, width) {
	var that = this;
	var draw = function() {
		that.experiment.context.beginPath();
		that.experiment.context.lineWidth = width;
		// horizontal line
		that.experiment.context.moveTo((that.experiment.canvas.width/2) + size/2, (that.experiment.canvas.height/2));
		that.experiment.context.lineTo((that.experiment.canvas.width/2) - size/2, (that.experiment.canvas.height/2));
		// vertical line
		that.experiment.context.moveTo((that.experiment.canvas.width/2), (that.experiment.canvas.height/2) + size/2);
		that.experiment.context.lineTo((that.experiment.canvas.width/2), (that.experiment.canvas.height/2) - size/2);
		that.experiment.context.stroke();
	};
	that.features[that.featureNumber] = draw;
	that.featureNumber = that.featureNumber + 1;	
};
// use the prototype addCode function to execute code during runtime of the experiment
Stimulus.prototype.addCode = function(code) {
	var draw = function() { eval(code); };
	this.features[this.featureNumber] = draw;
	this.featureNumber = this.featureNumber + 1;	
};
// store specified results in an object
Stimulus.prototype.addLogger = function(toBeSavedStimuli) {
	
	saveMe = arguments;
	var that = this;
	
	var save = function() {
		var saveData = ["id", "repetition", "RT", "event", "correct", "duration", "ISI"];
		
		for (var i = 0; i < saveMe.length; i++) {
			var data = {};
			for (key in saveMe[i]) {
				if ( $.inArray(key, saveData) !== -1 ) { 
					data[key] = saveMe[i][key];
				}
			}
			that.experiment.data.push(data);
		}
	};
	this.features[this.featureNumber] = save;
	this.featureNumber = this.featureNumber + 1;
};


Stimulus.prototype.removeFeatures = function() { // add functionality to replace the content of a stimulus by other content; remove all features!
	var that = this;
	that.featureNumber = 0;
	that.features = [];
};

Stimulus.prototype.toString = function() {
	
	if (this.event) {
		return("id: " + this.id + ",\n RT: " + this.RT + ",\n event: " + this.event + ",\n correct: " + this.correct);
	}
	else {
		return("id: " + this.id);
	}
};
