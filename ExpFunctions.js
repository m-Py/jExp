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

		// runStimuli takes an array containing stimuli objects and runs all stimuli. This is the old startExp function 
		// is still called by startExp; if my restructuring of startExp fails, use this function
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
		var ExperimentalDelay = 0;
		for (var i = 0; i < Stimuli.length; i++ ) {
			var j = 0;
			// how long do the Stimuli run
			var currentDelay = 0;
			for (var t = 0; t < Stimuli[i].length; t++) {
				currentDelay = currentDelay + Stimuli[i][t].duration + Stimuli[i][t].ISI;
			}
			setTimeout(function() {
				$("body").append("<div id='startMe'></div>");
				$("#startMe").css("height", $(window).height());
				$("#startMe").css("width", $(window).width());
				$("#startMe").click(function() {
					$("#startMe").remove();
					runStimuli(Stimuli[j]);
					if (j > 0) {
						var tmp = Stimuli[j-1].length;
						$(Stimuli[j-1][tmp].dummyDiv).remove();
					}
					j++;
					
						
				});
			}, currentDelay)
			
			
		}
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
