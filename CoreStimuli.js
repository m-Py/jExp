	
	// Stimulus-object. Super class of all stimuli. In itself it only creates an empty div with a specified height.
	function Stimulus(duration, ISI, listening) {

		this.duration = duration; // presentation time of the stimulus. Specify in ms.
		this.ISI = ISI; // inter-stimulus-intervall = pause after stimulus before next stimulus is shown
		this.listening = listening; // should a reaction be recorded?
		
		this.RT; // initialize; will be written to if listen() is executed
		this.features = []; // features of the stimulus that will be called by showStimulus()

	}
	Stimulus.prototype.toString = function() {
		return("Type: Stimulus, duration: " + this.duration + ", ISI: " + this.ISI + ", RT: " + this.RT); 
	};
	Stimulus.prototype.addFeature(type, size, x1, y1, x2, y2) { // name feature type and coordinates, radius, size etc. Overloading is necessary here; see how to best implement it
		switch(type) {
			case "text":
			// var doStuff = function () {};
			break;
			
			case "cross":
			// var doStuff = function () {};
			break;
			
			case: "rectangle":
			// var doStuff = function () {};
			break;	
			
			case: "triangle":
			// var doStuff = function () {};
			break;	
			
			case: "circle":
			// var doStuff = function () {};
			break;					
		}
			this.features[featureNumber] = doStuff();
	};	
	Stimulus.prototype.showStimulus = function() {
		for (var i = 0; i < this.features.length; i++) {
			this.features[i].doStuff(); // load all the features
		}
	};
	Stimulus.prototype.listen = function () {
		var t0 = performance.now();
		var that = this; // save reaction time value into RT property of each object
		that.RT = 0;
		$("*").on("keypress click", function() {
			that.RT = performance.now() - t0;
			console.log(that.RT);
			$("*").off();
		});	
		var timeLeft = (this.duration+this.ISI)/10;
		var countdown = setInterval(function() {
			timeLeft--; // countdown
			if (timeLeft <= 0) {
				clearInterval(countdown);
				$("*").off();
			}
		}, 10); // timing precision of 10ms
	};
	Stimulus.prototype.present = function() {
		// 1) show 
		this.showStimulus();
		// 2) listen to reaction
		if (this.listening === true) { 
			this.listen(); 
		}
		// 3) remove after duration
		if (this.duration != 0) {
			countdown(this.duration, this.dummyDiv); // to do: remove event listener after countdown; maybe countdown should be implemented as an stimulus method
		}
	};
	
	
	
	// Textstimulus. Text und color (default "black") as specialized properties. Inherits from Stimulus
	function Text(Parent, Name, size, duration, ISI, text, color) {
		Stimulus.call(this, Parent, Name, size, duration, ISI); //  call constructor from super class
		// add special properties
		this.text = text; 
		this.color = color || "black";
		this.subDummy = "#"+Name+Name; // for positioning of text stimulus
	}
	Text.prototype = Object.create(Stimulus.prototype, {
		contructor: {
			configurable: true,
			enumerable: true,
			value: Text,
			writable: true
		}
	});
	Text.prototype.toString = function() {
		return("Type: Text, duration: " + this.duration + ", ISI: " + this.ISI + ", RT: " + this.RT); 
	};
	Text.prototype.showStimulus = function() {
		Stimulus.prototype.showStimulus.call(this);
		$(this.dummyDiv).append("<div id="+this.Name+this.Name+"></div>");		
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
		$(this.subDummy).css("top", (height-this.size)/2);
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
	Square.prototype.toString = function() {
		return("Type: Square, duration: " + this.duration + ", ISI: " + this.ISI + ", RT: " + this.RT); 
	};
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
	Square.prototype.listen = function() {
		Stimulus.prototype.listen.call(this);
	};
	Square.prototype.present = function() {
		Stimulus.prototype.present.call(this);
		this.listen();
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
	Cross.prototype.toString = function() {
		return("Type: Fixationcross, duration: " + this.duration + ", ISI: " + this.ISI); 
	};	
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
	
	
	// log results in the end of the experiment
	function Results(Parent, Name, size, duration, ISI, text, color, expArr) {
		Text.call(this, Parent, Name, size, duration, ISI, text, color); 
		this.expArr = expArr;
	}
	Results.prototype = Object.create(Text.prototype, {
		contructor: {
			configurable: true,
			enumerable: true,
			value: Results,
			writable: true
		}
	});
	Results.prototype.showStimulus = function() {
		Text.prototype.showStimulus.call(this);	
		for (var i = 0; i < this.expArr.length; i++) {
			console.log("Stimulus " + (i+1) + ", " + this.expArr[i].toString());
		}
	};
	Results.prototype.present = function() {
		Stimulus.prototype.present.call(this);
	};


