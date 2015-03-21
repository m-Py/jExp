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
		// Anzeige des Countdowns
		var timeLeft = (this.duration/1000)+1;
		$("#countdown").html(--timeLeft);
		var countdown = setInterval(function() {
			$("#countdown").html(--timeLeft);
			if (timeLeft <= 0) {
				$("#countdown").css("color", "transparent");
				clearInterval(countdown)
			}
		}, 1000);
	};
	CountdownText.prototype.present = function() {
		Stimulus.prototype.present.call(this);
	};	
