
// Stimulus: basic of all presentations on screen
function Stimulus(duration, ISI, listening, listenTo, correctResponse) {
	this.duration = duration; // presentation time of the stimulus. Specify in ms.
	this.ISI = ISI; // inter-stimulus-intervall = pause after stimulus before next stimulus is shown
	
	this.listening = listening; // should a reaction be recorded?
	this.listenTo = listenTo; // should be an array containing the allowed keypresses
	this.correctResponse = correctResponse;
	
	this.RT; // will be written to if listen method is executed
	this.correct; // was given response correct
	this.event;
	
	this.featureNumber = 0;
	this.features = []; // features of the stimulus that will be called by showStimulus()
	this.presentType; // gets added by add methods
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
		if (e === that.correctResponse) {
			that.correct = 1;
		}
		else {
			that.correct = 0;
		}
	};
	
	var recordNonresponse = function() {
		$(document).off();		
		that.RT = 0; // no reaction after duration + ISI
		that.event = "nonresponse";
		if (that.correctResponse === "nogo") {
			that.correct = 1;
		}
		else {
			that.correct = 0;
		}
	};
	
	$(document).on("keypress click", function(e) {
		
		// get RT and event
		RT = performance.now() - t0;
		event = e.which;
		
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
	if (this.duration !== 0) { 
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
	// 1) show 
	this.showStimulus();
	// 2) listen to reaction
	if (this.listening === true) {
		this.listen();
	}
	// 3) remove after duration
	if (this.duration !== 0) {
		this.experiment.countdown(this.duration); // remove stimulus after countdown
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
		that.experiment.context.fillText(text, that.experiment.canvas.width/2, (that.experiment.canvas.height/2)+(size/2.5)); // trying to vertically align text
	};
	that.features[that.featureNumber] = draw;
	that.featureNumber = that.featureNumber + 1;
	that.presentType = "text";
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
	that.presentType = "fixation-cross";		
};
Stimulus.prototype.removeFeatures = function() { // add functionality to replace the content of a stimulus by other content; remove all features!
	var that = this;
	that.featureNumber = 0;
	that.features = [];
};

Stimulus.prototype.toString = function() {
	
	/*for ( var p in this ) {
		if (this.hasOwnProperty(p)) {
			console.log(p + ": " + this[p]);
		}
	}*/
	
	var that = this;
	if (that.event) {
		return("type: " + this.presentType + ",\n duration: " + this.duration + ",\n ISI: " + this.ISI + ",\n RT: " + this.RT + ",\n event: " + this.event + ",\n correct: " + this.correct);
	}
	else {
		return("type: " + this.presentType + ",\n duration: " + this.duration + ",\n ISI: " + this.ISI);
	}
};
