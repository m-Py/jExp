
	// Stimulus-object. Super class of all stimuli. In itself it only creates an empty div with a specified height.
	function Stimulus(duration, ISI, listening) {

		this.duration = duration; // presentation time of the stimulus. Specify in ms.
		this.ISI = ISI; // inter-stimulus-intervall = pause after stimulus before next stimulus is shown
		this.listening = listening; // should a reaction be recorded?

		this.RT; // initialize; will be written to if listen() is executed
		this.featureNumber = 0;
		this.features = []; // features of the stimulus that will be called by showStimulus()
		this.next; // can be added to zero duration stimuli to specify press that continues experiment
		
		this.experiment; // property gets added when stimulus is added to experiment

	}
	Stimulus.prototype.toString = function() {
		return("Type: Stimulus, duration: " + this.duration + ", ISI: " + this.ISI + ", RT: " + this.RT);
	};
	Stimulus.prototype.addFeature = function(text, type, size, x1, y1, x2, y2) { // name feature type and coordinates, radius, size etc. Overloading is necessary here; see how to best implement it
		var that = this;
		switch(type) {
			
			case "text":
				var draw = function () {
					that.experiment.context.font="100px Arial";
					that.experiment.context.fillStyle = "blue";
					that.experiment.context.textAlign = "center";
					that.experiment.context.fillText(text, that.experiment.canvas.width/2, that.experiment.canvas.height/2);
				};
			break;

			case "cross":
			// var draw = function () {};
			break;

			case "rectangle":
			// var draw = function () {};
			break;

			case "triangle":
			// var draw = function () {};
			break;

			case "circle":
			// var draw = function () {};
			break;
		}
		that.features[that.featureNumber] = draw;
		that.featureNumber = that.featureNumber + 1;		
	};
	
	Stimulus.prototype.showStimulus = function() {
		var that = this;
		for (var i = 0; i < this.features.length; i++) {
			that.features[i](); // show all the features
		}
	};
	Stimulus.prototype.listen = function () {
		var t0 = performance.now();
		var that = this; // save reaction time value into RT property of each object
		that.experiment.expRT.push(0);
		$("*").on("keypress click", function() {
			var RT = performance.now() - t0;
			that.experiment.expRT.pop(); 
			that.experiment.expRT.push(RT);
			console.log(RT);
			// $("*").off();
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
		var that = this;
		// 1) show 
		that.showStimulus();
		// 2) listen to reaction
		if (that.listening === true) { 
			that.listen(); 
		}
		// 3) remove after duration
		if (that.duration !== 0) {
			that.experiment.countdown(that.duration); // remove stimulus after countdown
		}
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

