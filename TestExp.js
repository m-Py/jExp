
$(document).ready(function() {
	
	// Create a dummy experiment

	// fill an array with stimuli
	var fixationCross = new Cross("stim", "cross", 20, 150, 300, 2);
	expArr = [];
	expArr.push(new Text("stim", "start", 50, 0, 0, "Start the experiment"));
	for (var i = 0; i < 6; i++) {
		if (i % 2 === 0) {
			expArr.push(fixationCross);
		}
		else {
			expArr.push(new Square("stim", "st"+i, rndSize(), 800, 1000, rndCol())); // Parent div is always the same, but each new Square object has a seperate div which contains the stimulus
		}
	}
	
	for (var t = 0; t < 5; t++) {
		expArr.push(new Text("stim", "shub", 50, 0, 0, "Go for next trial")); 
		expArr.push(new Text("stim", "mup", 50, 500, 500, "wait for it...")); 
		for (var i = 0; i < 6; i++) {
			if (i % 2 === 0) {
				expArr.push(fixationCross);
			}
			else {
				expArr.push(new Square("stim", "st"+i, rndSize(), 800, 1000, rndCol())); // Parent div is always the same, but each new Square object has a seperate div which contains the stimulus
			}
		}
	}
	
	expArr.push(new Text("stim", "zzt", 50, 0, 500, "Over!"));
	
	 	
	// start the experiment!
	startExp((expArr));
	console.log(partExp(expArr));
	
});
