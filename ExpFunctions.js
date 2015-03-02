		// create partial arrays. Presentation of stimuli must be stopped when the duration of 1 stimulus is 0.
		var partExp = function(arr) {
			var j = 0; // count the partial arrays that we need
			var partArr = [[]];
			for (var i = 0; i < arr.length; i++ ) {
				if (arr[i].duration === 0) { 
					partArr[j].push(arr[i]);
					partArr.push([]);
					j++;
				}
				else { 
					partArr[j].push(arr[i]);
				}
			}
			return partArr;
		};

		// runStimuli takes an array containing stimuli objects and runs all stimuli
		var runStimuli = function(arr) {
			// var that controls the timing of the experiment
			var ExperimentalDelay = 0;
			// present the stimuli
			for (var i = 0; i < arr.length; i++ ) {
				var j = 0;
				setTimeout(function() { arr[j].present(arr[j].duration); j++}, ExperimentalDelay); // calls a new stimulus after duration and ISI of the previous stimulus
				ExperimentalDelay = ExperimentalDelay + arr[i].duration + arr[i].ISI;
			}
			return(ExperimentalDelay) // returns how long the experiment runs
		};
		

	// Function that runs the experiment. Calls the stimuli from an array one after another.
	var startExp = function(arr) { 
		var Stimuli = partExp(arr); // partition passed array
		for (var i = 0; i < Stimuli.length; i++) {
			var j = 0;
			ExperimentalDelay = 0;
			setTimeout(function() {
				var clickable = 1;
				j++;
				$(window).click(function() {
					if (clickable === 1) {
						runStimuli(Stimuli[j]);
						// remove last presented stimulus
						var lastStimulus = Stimuli[0].length-1;
						$(Stimuli[0][lastStimulus].dummyDiv).remove();
						// run next stimuli on click. After ISI of last shown stimulus
						setTimeout(function() {
							runStimuli(Stimuli[1]);
						}, Stimuli[0][lastStimulus].ISI)
					}
					clickable = -1;
				});
			}, //insert time here );
	};


	// function that removes a given div after a specified duration. Give duration argument in ms.
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
