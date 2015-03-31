
// Stimulus: basic of all presentations on screen
function Stimulus(duration, ISI, listening, listenTo) {
	this.duration = duration; // presentation time of the stimulus. Specify in ms.
	this.ISI = ISI; // inter-stimulus-intervall = pause after stimulus before next stimulus is shown
	this.listening = listening; // should a reaction be recorded?
	this.listenTo = listenTo;
	
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
	$(document).on("keypress click", function(e) {
		// record reaction time
		RT = performance.now() - t0;
		if (RT > that.duration + that.ISI && that.duration > 0) { // only stop listening to event if duration is not 0
			that.RT = 0; // no reaction after duration + ISI
		} 
		else {
			that.RT = RT;
		}
		
		// record response
		// how to implement
		that.event = e.which; // store key pressed
		console.log(e.which + " " + e.type);
		
		console.log(that.toString());
		$(document).off();
	});
	if (this.duration !== 0) { // listen until duration + ISI is over
		var timeLeft = (that.duration+that.ISI)/10;
		var countdown = setInterval(function() {
			timeLeft--; // countdown
			if (timeLeft <= 0) {
				clearInterval(countdown);
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
Stimulus.prototype.addText = function(text, size, color, x1, y1) { // name feature type and coordinates, radius, size etc. Overloading is necessary here; see how to best implement it
	var that = this;
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


Stimulus.prototype.toString = function() {
	return("type: " + this.presentType + ", duration: " + this.duration + ", ISI: " + this.ISI + ", RT: " + this.RT);
};
