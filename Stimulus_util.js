/* 
   This file contains Stimulus methods that define its functioning.
   When instantiated, a Stimulus will only delay an experiment for the duration 
   of its duration, but will not do anything else. For the stimulus to function
   in the wanted way, features need to be added by calling the methods in this file. 
   Feature adding methods define the appearance of a stimulus, or add experimental utility.
   
   * Examples:
   * addFeature() takes a function as argument and executes it when the Stimulus is called
   * The addText() method will add text to the Stimulus to be shown on screen

   * Feature adding methods should have names like addAppearance or addUtility. 
   * They must contain a function containing code to be executed when the 
   stimulus is presented. This function must get pushed to the `features` array property
   of the Stimulus.
   
*/

// generic addFeature function. Takes a function as argument, which is evaluated as soon as the Stimulus is called
// how to access Experiment and Stimulus prototype from within `somecode` though...
Stimulus.prototype.addFeature = function(somecode) {
	this.features.push(somecode);
};

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

// returns a slim Stimulus object, that does not contain functions, the pointer to the experiment and arrays as values
Stimulus.prototype.slimObject = function() {
	data = {};
	for (key in this) {
		if (this[key] !== undefined) {
			if (this[key].constructor.name !== "Function" && this[key].constructor.name !== "Experiment" && this[key].constructor.name !== "Array") {
				data[key] = this[key];
			}
		}
	}
	return data;
};
