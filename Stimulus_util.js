/* 
   This file contains methods of the Stimulus object that define its functioning.
   When instantiated, a Stimulus will only delay an experiment for the duration 
   of its duration + ISI, but will not do anything else. For the stimulus to function
   in the wanted way, features need to be added by calling the methods in this file. 
   Feature adding methods define the appearance of a stimulus, or add experimental utility.
   
   * Examples:
   * The addText() method will add text to the Stimulus to be shown on screen
   * The addCode() method can be used to execute JavaScript Code
   at a specific time during the experiment.
   * The addLogger method will save specified data to the Experiment.data object

   * Feature adding methods should have names like addAppearance or addUtility. 
   * They must contain a function containing code to be executed when the 
   stimulus is presented. This function must get pushed to the features array property
   of the Stimulus.
   
*/

// add a text that is displayed on the screen
Stimulus.prototype.addText = function(text, size, color, x1, y1) { // name feature type and coordinates, radius, size etc. Overloading is necessary here; see how to best implement it
	var that = this;
	that.text = text;
	var draw = function () {
		that.experiment.context.font = ""+size + "px Arial" || "30px Arial";
		that.experiment.context.fillStyle = color || "black";
		that.experiment.context.textAlign = "center";
		that.experiment.context.fillText(that.text, that.experiment.canvas.width/2, (that.experiment.canvas.height/2)+(size/2.5)); // trying to vertically align text
	};
	that.features.push(draw);
};

// add a fixation cross to the center of the experimental canvas
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
	that.features.push(draw);	
};

// add JavaScript code that is executed when the stimulus is called
Stimulus.prototype.addCode = function(code) {
	var draw = function() { 
		eval(code); 
	};
	that.features.push(draw);
};

// store specified results in an object
// arguments must be of type Stimulus
Stimulus.prototype.addLogger = function(toBeSavedStimuli) {
	
	saveMe = arguments;
	var that = this;
	
	var save = function() {
		var saveData = ["id", "repetition", "RT", "event", "correct"];
		
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
	that.features.push(save);
};

// remove all features from a Stimulus.
Stimulus.prototype.removeFeatures = function() { 
	this.features = [];
};

// deprecated toString method. To show data, rather use Experiment.saveResults and log it
Stimulus.prototype.toString = function() {
	if (this.event) {
		return("id: " + this.id + ",\n RT: " + this.RT + ",\n event: " + this.event + ",\n correct: " + this.correct);
	}
	else {
		return("id: " + this.id);
	}
};

