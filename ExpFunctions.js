
	// Function that runs the experiment. Calls the stimuli from an array one after another.
	var startExp = function(arr) { 
		// var that controls the timing of the experiment
		var ExperimentalDelay = 0;
		
		// present 1. stimulus
		arr[0].present(arr[0].duration);

		// present the other stimuli
		for (var i = 1; i < arr.length; i++ ) {
			var j = 1;
			ExperimentalDelay = ExperimentalDelay + arr[i-1].duration + arr[i-1].ISI; 
			
			var magic = function() { 
				arr[j].present(arr[j].duration);
				j++;
			};
			setTimeout(magic, ExperimentalDelay); // calls a new stimulus after duration and ISI of the previous stimulus
		}
		return(ExperimentalDelay + arr[arr.length-1].duration + arr[arr.length-1].ISI) // returns how long the experiment runs
	};


	// function that removes a given div after a specified duration
	var countdown = function(duration, div) {
		var timeLeft = duration/10;
		var countdown = setInterval(function() {
		timeLeft--; // countdown
		if (timeLeft <= 0) {
			clearInterval(countdown)
			$(div).remove();
		}
		}, 10); // timing precision of 10ms
	};
	
	
	// create a random rgb color: "rgb(x,y,z)"
	var rndCol = function() {
		return("rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
	};	
	
	
	// create a random number, max 350. Can be used in order to randomize the size of a stimulus
	var rndSize = function() {
		return(Math.floor(Math.random()*340)+10);
	};
