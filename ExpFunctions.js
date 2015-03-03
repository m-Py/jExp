
// create partial arrays. Presentation of stimuli must be stopped when the duration of 1 stimulus is 0.
var partExp = function(arr) {
	var j = 0; // count the partial arrays that we need
	var partArr = [[]];
	for (var i = 0; i < arr.length; i++ ) {
		if (arr[i].duration === 0) { 
			partArr[j].push(arr[i]);
			if (i < arr.length-1) {
				partArr.push([]);
				j++;
			}
		}
		else { 
			partArr[j].push(arr[i]);
		}
	}
	return partArr;
};


// runStimuli actually presents the stimuli: takes an array containing stimuli objects as argument and presents all stimuli
var runStimuli = function(partArr) {
	// var that controls the timing of the experiment
	var ExperimentalDelay = 0;
	// present the stimuli
	for (var i = 0; i < partArr.length; i++ ) {
		var j = 0;
		setTimeout(function() { partArr[j].present(partArr[j].duration); j++}, ExperimentalDelay); // calls a new stimulus after duration and ISI of the previous stimulus
		ExperimentalDelay = ExperimentalDelay + partArr[i].duration + partArr[i].ISI;
	}
};

	
// function that computes the time that an experimental unit needs to finish
var getExpTime = function(partArr) {
	var currentDelay = 0;
	// to consider: ignore ISI of last stimulus?
	for (var t = 0; t < partArr.length; t++) {
		currentDelay = currentDelay + partArr[t].duration + partArr[t].ISI;
	}		
	return currentDelay
};			


// Function that runs the experiment. TO RUN YOUR EXPERIMENT, CALL THIS FUNCTION AND PASS THE ARRAY THATS CONTAINS ALL STIMULI
var startExp = function(arr) { 
	var Stimuli = partExp(arr); // partition passed array into several units. Partition is at each stimulus that has a duration of 0!

	var startTimer = function(arr, counter) {
		setTimeout(function() { startOnClick(arr, counter); }, getExpTime(arr[counter-1])); // calls startsOnClick after the stimuli of the current set have been presented
	};
	
	var startOnClick = function(arr, counter) {
		// there must be a better way to get an event handler that only works in this situation
		$("body").append("<div id='startMe'></div>");
		$("#startMe").css("height", $(window).height());
		$("#startMe").css("width", $(window).width());
		$("#startMe").click(function() {
			$("#startMe").remove();
			if (counter > 0 && counter < arr.length-1) {
				$(arr[counter-1][arr[counter-1].length-1].dummyDiv).remove(); // probably the most ugly code ever; but it does remove the most recently presented stimulus ;-)
			}
			runStimuli(arr[counter]);
			startTimer(arr, counter+1); // call startOnClick again after a timer has run out: then, the next stimuli are called
		});
	};
	startOnClick(Stimuli, 0); // start experiment with first experimental unit
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
