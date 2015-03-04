	// Stimulus-object. Super class of all stimuli. In itself it only creates an empty div with a specified height.
	function Stimulus(Parent, Name, size, duration, ISI) {
		this.Parent = Parent;
		this.Name = Name;
		this.dummyParent = "#"+Parent;
		// create dummy divs that will contain the stimulus
		this.dummyDiv = "#"+Name;
		this.subDummy = "#"+Name+Name;
		this.size = size;
		this.duration = duration; // presentation time of the stimulus. Specify in ms.
		this.ISI = ISI; // inter-stimulus-intervall = pause after stimulus before next stimulus is shown
	}
	Stimulus.prototype.showStimulus = function() {
		// create stimulus
		$(this.dummyParent).append("<div id="+this.Name+"></div>");
		$(this.dummyDiv).append("<div id="+this.Name+this.Name+"></div>");
		$(this.dummyDiv).height(this.size+"px");	
	};	
	Stimulus.prototype.present = function() { // should not be changed; Can be called from subclasses.
		this.showStimulus();
		if (this.duration != 0) {
			countdown(this.duration, this.dummyDiv);
		}
	};			
	
	
	// Textstimulus. Text und color (default "black") as specialized properties. Inherits from Stimulus
	function Text(Parent, Name, size, duration, ISI, text, color) {
		Stimulus.call(this, Parent, Name, size, duration, ISI); //  call constructor from super class
		// add special properties
		this.text = text; 
		this.color = color || "black";
	}
	Text.prototype = Object.create(Stimulus.prototype, {
		contructor: {
			configurable: true,
			enumerable: true,
			value: Text,
			writable: true
		}
	});
	Text.prototype.showStimulus = function() {
		Stimulus.prototype.showStimulus.call(this);
		// show text in center alignment
		$(this.dummyDiv).css("text-align", "center");
		// position text stimulus horizontally
		var width = $(window).width();
		$(this.dummyDiv).css("position", "absolute");
		$(this.dummyDiv).css("left", "50%");
		$(this.subDummy).css("position", "relative");
		$(this.subDummy).css("left", "-50%");
		// position text stimulus vertically
		var height = $(window).height();
		$(this.dummyDiv).css("top", (height-this.size)/2);
		// show text stimulus
		$(this.subDummy).css("color", this.color);
		$(this.subDummy).css("font-size", this.size);
		$(this.subDummy).html(this.text);
	};
	Text.prototype.present = function() {
		Stimulus.prototype.present.call(this);
	};
	
	
	// Square-stimulus. Has color as special property. Inherits from Stimulus.
	function Square(Parent, Name, size, duration, ISI, color) {
		Stimulus.call(this, Parent, Name, size, duration, ISI); 
		this.color = color || "black";
	}
	Square.prototype = Object.create(Stimulus.prototype, { 
		contructor: {
			configurable: true,
			enumerable: true,
			value: Square,
			writable: true
		}
	});
	Square.prototype.showStimulus = function() {
		Stimulus.prototype.showStimulus.call(this);
		$(this.dummyDiv).css("width", this.size);
		// position square stimulus
		var height = $(window).height();
		var width = $(window).width();
		$(this.dummyDiv).css("position", "absolute");
		$(this.dummyDiv).css("top", (height-this.size)/2);
		$(this.dummyDiv).css("left", (width-this.size)/2);
		// show square stimulus
		$(this.dummyDiv).css("width", this.size);
		$(this.dummyDiv).css("background-color", this.color);
	};
	Square.prototype.present = function() {
		Stimulus.prototype.present.call(this);
	};	
	
	
	// Fixation-cross. Inherits from Stimulus. Has line-width as special property  (width = 1 as default)
	function Cross(Parent, Name, size, duration, ISI, width) {
		Stimulus.call(this, Parent, Name, size, duration, ISI); 
		this.width = width || 1;
	}
	Cross.prototype = Object.create(Stimulus.prototype, { 
		contructor: {
			configurable: true,
			enumerable: true,
			value: Cross,
			writable: true
		}
	});
	Cross.prototype.showStimulus = function() {
		// fixation cross is drawn using HTML canvas
		$(this.dummyParent).append("<canvas id="+this.Name+"></canvas>");
		var canvas = document.getElementById(this.Name);
		canvas.width = this.size;
		canvas.height = this.size;
		var context = canvas.getContext('2d');
		// center stimulus		
		var height = $(window).height();
		var width = $(window).width();
		$(this.dummyDiv).css("position", "absolute");
		$(this.dummyDiv).css("top", (height-this.size)/2);
		$(this.dummyDiv).css("left", (width-this.size)/2);
		// draw cross
		context.beginPath();
		context.lineWidth = this.width;
		context.moveTo(this.size/2, 0);
		context.lineTo(this.size/2, this.size);
		context.moveTo(0, this.size/2);
		context.lineTo(this.size, this.size/2);
		context.stroke();
	};
	Cross.prototype.present = function() {
		Stimulus.prototype.present.call(this);
	};


	// dummy code: implement several stimuli as an stimulus Object
	function MultiStim() {
		var _longestDuration = 0;
		var _longestISI = 0;
		for (var i = 0; i < arguments.length; i++) { 
			this["stimulus"+i] = arguments[i]; // might work?
			if (arguments[i].duration >= _longestDuration) { _longestDuration = arguments[i].duration; }
			if (arguments[i].ISI >= _longestISI) { _longestISI = arguments[i].ISI; }
		}
		this.duration = _longestDuration
		this.ISI = _longestISI
	}
	MultiStim.prototype = Object.create(Stimulus.prototype, { 
		contructor: {
			configurable: true,
			enumerable: true,
			value: MultiStim,
			writable: true
		}
	});
	MultiStim.prototype.showStimulus = function() {
		for (var property in this) {
			if (property.indexOf("stimulus") > -1) { // call stimuli that are bound in this object
				this[property].showStimulus();
			}
		}
	};
	MultiStim.prototype.present = function() {
		for (var property in this) {
			if (property.indexOf("stimulus") > -1) { // call stimuli that are bound in this object
				this[property].present();
			}
		}
	};
					 

