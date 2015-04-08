

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
	return currentDelay;
};			


// startExp() calls the functions partExp(), runStimuli() and getExpTime() to run the complete experiment.
// gets called by the Experiment method .start()
var startExp = function(arr) { 
	// $("*").css("cursor", "none"); // let cursor disappear when experiment starts
	var Stimuli = partExp(arr);
	
	// startTrial and startTimer recursively call each other to ensure correct timing of stimulus presentation
	var startTimer = function(arr, counter) {
		setTimeout(function() { startTrial(arr, counter); }, getExpTime(arr[counter-1])); 
	};
	
	var startTrial= function(arr, counter) { // part arr is passed; last stimulus of this array is always a 0-duration stimulus
		if (counter === 0) {
			runStimuli(arr[counter]);
			startTimer(arr, counter+1); 
		}
		else if (counter < arr.length) { // stopping condition for recursion!
			var currentlyShownStimulus = arr[counter-1][arr[counter-1].length-1];
			// how does the experiment proceed when a 0-duration stimulus is shown:
			$(document).on("keypress click", function(e) {
				if (currentlyShownStimulus.listenTo) { // allowed keys are specified
					for (var i = 0; i < currentlyShownStimulus.listenTo.length; i++) {
						if (e.which === currentlyShownStimulus.listenTo[i]) { // proceed if allowed key was pressed
							$(document).off();
							currentlyShownStimulus.experiment.clear();
							runStimuli(arr[counter]);
							startTimer(arr, counter+1);
						}
					}
				}
				else { // allowed keys are not specified 
					$(document).off();
					currentlyShownStimulus.experiment.clear();
					runStimuli(arr[counter]);
					startTimer(arr, counter+1);
				}
			});			
			
			// add code for the implementation of alternative proceeding events
			
		}
	};
	startTrial(Stimuli, 0); // start experiment with first nested array that was created with the partExp function
};

// create a random rgb color: "rgb(x,y,z)"
var rndCol = function() {
	return("rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
};
	
	
// create a random integer, includes passed min and max value
var rndInt = function(min, max) {
	return(Math.floor(Math.random()*(max-min+1))+min);
};



/* 'hack' to save download the experimental data locally by downloading it
 * 
 *  I did not write this function, got it from: http://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
 * 
 */
 
var download = function(strData, strFileName, strMimeType) {
    var D = document,
        A = arguments,
        a = D.createElement("a"),
        d = A[0],
        n = A[1],
        t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

    if (window.MSBlobBuilder) { // IE10
        var bb = new MSBlobBuilder();
        bb.append(strData);
        return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */

    if ('download' in a) { //FF20, CH19
        a.setAttribute("download", n);
        a.innerHTML = "downloading...";
        D.body.appendChild(a);
        setTimeout(function() {
            var e = D.createEvent("MouseEvents");
            e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
            D.body.removeChild(a);
        }, 66);
        return true;
    }; /* end if('download' in a) */

    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function() {
        D.body.removeChild(f);
    }, 333);
    return true;
};


var rndShuffleArray = function(array) {
	
	// randomly shuffle the numbers 0 to array.length-1 
	// these numbers are the indeces
	var random_sequence = [];
	for (var i = 0; i < array.length; i++) {
		if (random_sequence.length === 0) {
			var rnd = Math.floor(Math.random()*array.length);
			random_sequence.push(rnd);
		}
		else if (random_sequence.length > 0) {
			var rnd = Math.floor(Math.random()*array.length);
			while (random_sequence.indexOf(rnd) != -1) { 
				var rnd = Math.floor(Math.random()*array.length);
			}
			random_sequence.push(rnd);
		}
	}
	
	// create new array, in which the randomized indeces from random_sequence are used
	var shuffledArr = [];
	for (var t = 0; t < array.length; t++) {
		shuffledArr[t] = array[random_sequence[t]];
	}
		
	return shuffledArr;
};
