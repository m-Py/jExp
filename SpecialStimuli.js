	// Text stimulus. During presentation a countdown is shown; so use even seconds as durations 
	function CountdownText(Parent, Name, size, duration, ISI, text, color, cdSize) {
		Text.call(this, Parent, Name, size, duration, ISI, text, color); //  call constructor from super class
		this.cdSize = cdSize;
	}
	CountdownText.prototype = Object.create(Text.prototype, {
		contructor: {
			configurable: true,
			enumerable: true,
			value: CountdownText,
			writable: true
		}
	});
	// adds countdown to text displayed
	CountdownText.prototype.showStimulus = function() {
		Text.prototype.showStimulus.call(this);			
		$(this.dummyDiv).prepend("<div id='countdown'></div>");
		$("#countdown").css("position", "relative");
		$("#countdown").css("left", "-50%");
		var height = $(window).height();
		$("#countdown").css("top", (height-this.size*2)/2);
		$("#countdown").css("font-size", this.cdSize);
	};
	CountdownText.prototype.present = function() {
		Stimulus.prototype.present.call(this);
	};	



	// Stimulus Object that can consist of multiple stimuli
	function MultiStim() {
		var _longestDuration = 0;
		var _longestISI = 0;
		for (var i = 0; i < arguments.length; i++) {
			this["stimulus"+i] = arguments[i];
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
