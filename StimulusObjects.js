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
		this.ISI = ISI; // inter-stimulus-intervall
	}
	Stimulus.prototype.showStimulus = function() {
		// create stimulus
		$(this.dummyParent).append("<div id="+this.Name+"></div>");
		$(this.dummyDiv).append("<div id="+this.Name+this.Name+"></div>");
		$(this.dummyDiv).height(this.size+"px");	
	};	
	Stimulus.prototype.present = function() {
		this.showStimulus();
		if (this.duration != 0) {
			countdown(this.duration, this.dummyDiv);
		}
	};			
	
	
	// Textstimulus. Text und color as specialized properties. Inherits from Stimulus
	function Text(Parent, Name, size, duration, ISI, text, color) {
		Stimulus.call(this, Parent, Name, size, duration, ISI); //  call constructor from super class
		this.text = text; // add special properties
		this.color = color;
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
		this.color = color;
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
	