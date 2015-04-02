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
// add a text that is displayed on the screen
Stimulus.prototype.addText = function(text, size, color, x, y) { // name feature type and coordinates, radius, size etc. Overloading is necessary here; see how to best implement it
	var that = this;
	var draw = function () {
		var x_Cor = that.experiment.getNewX(x) || that.experiment.canvas.width/2;
		var y_Cor = that.experiment.getNewY(y) || that.experiment.canvas.height/2;			
		that.experiment.context.font = (""+size + "px Arial") || "30px Arial";
		that.experiment.context.fillStyle = color || "black";
		that.experiment.context.textAlign = "center";
		that.experiment.context.fillText(text, x_Cor, (y_Cor+size/2.5) ); // trying to vertically align text
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

// store passed Stimulus data in the Experiment.data object
Stimulus.prototype.addLogger = function(toBeSavedStimuli) {
	
	saveMe = arguments;
	var that = this;
	
	var save = function() {
		setTimeout(function() { // makes sure that data storing is done properly! Even for the stimulus that was presented before the stimulus that contains the save function
			var saveData = ["id", "repetition", "RT", "event", "correct"];
			
			for (var i = 0; i < saveMe.length; i++) {
				var data = {};
				for (key in saveMe[i]) {
					if ( $.inArray(key, saveData) !== -1 ) { 
						data[key] = saveMe[i][key];
					}
				}
				console.log(data);
				that.experiment.data.push(data);
			}
		}, 50); // wait 50ms for execution	
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

