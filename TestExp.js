
$(document).ready(function() {
	
	// Create a dummy experiment

	// fill an array with stimuli
	expArr = [];
	var fixationCross = new Cross("stim", "cross", 20, 150, 300, 2);
	for (var i = 0; i < 20; i++) {
		if (i % 2 === 0) {
			expArr[i] = fixationCross;
		}
		else {
			expArr[i] = new Square("stim", "st"+i, rndSize(), 800, 1000, rndCol()); // Parent div is always the same, but each new Square object has a seperate div which contains the stimulus
		}
	}
	expArr.push(new Text("stim", "end", 50, 0, 0, "The experiment is over")); // text is presented in the end. Duration = 0 -> not removed
	
	// start the experiment!
	(startExp(expArr)); 
	
});
