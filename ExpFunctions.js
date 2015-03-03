
// function that partitions the passed array into an array containing > 0 arrays. 
// Partitition is made so that only the last stimulus object in each nested array has a duration of 0.
var partExp = function(arr) {
	var j = 0; // count the partial arrays that we need
	var partArr = [[]];
	for (var i = 0; i < arr.length; i++ ) {
		if (arr[i].duration === 0) { 
			partArr[j].push(arr[i]);
			if (i < arr.length-1) { // do not add unnecessary empty array if the last stimulus in the passed array has a duration of 0
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


// runStimuli is the function used to actually present the stimuli: takes an array containing stimuli objects as argument and presents all stimuli
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
// uses the functions partExp(), runStimuli() and getExpTime() to run an experiment.
var startExp = function(arr) { 
	var Stimuli = partExp(arr); // partition passed array into several units. Partition is at each stimulus that has a duration of 0!

	// startOnClick and startTimer recursively call each other to ensure correct timing of stimulus presentation
	var startTimer = function(arr, counter) {
		setTimeout(function() { startOnClick(arr, counter); }, getExpTime(arr[counter-1])); 
	};
	
	var startOnClick = function(arr, counter) {
		if (counter < arr.length) {
			// there must be a better way to get an event handler that only works in this situation
			$("body").append("<div id='startMe'></div>");
			$("#startMe").css("height", $(window).height());
			$("#startMe").css("width", $(window).width());
			$("#startMe").click(function() {
				$("#startMe").remove();
				if (counter > 0 && counter < arr.length) { // dont do this before the first and after the last stimulus
					$(arr[counter-1][arr[counter-1].length-1].dummyDiv).remove(); // probably the most ugly code ever; but it does remove the most recently presented stimulus ;-)
				}
				runStimuli(arr[counter]);
				startTimer(arr, counter+1); 
			});
		}
	};
	startOnClick(Stimuli, 0); // start experiment with first nested array that was created with the partExp function
};


// countdown: function that removes a given div after a specified duration. Pass duration in ms.
// is called by the present method of the stimulus objects
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
