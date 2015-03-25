
$(document).ready(function() {
	
	// Create a dummy experiment

	// create stimuli that are called multiple times during the experiment
	
	var waitForIt = new Text("stim", "mup", 50, 500, 500, "wait for it..."); 
	var goNext = new Text("stim", "shub", 50, 0, 0, "Go for next trial"); 
	
	// set up array & fill with stimuli
	expArr = [];
	for (var t = 0; t < 5; t++) {
		if (t === 0) {
			expArr.push(new Text("stim", "start", 50, 0, 0, "Start the experiment"));
			expArr[t].next = "keypress"; // specify continuation event for zero duration stimulus
		}
		else {
			expArr.push(goNext);
		}
		expArr.push(waitForIt);
		for (var i = 0; i < 12; i++) {
			if (i % 2 === 0) {
				expArr.push(new Cross("stim", "st"+i, 20, 150, rndInt(500, 800), 2));
			}
			else {
				expArr.push(new Square("stim", "st"+i, rndInt(10, 300), 800, rndInt(800, 2000), rndCol()));
			}
		}
	}
	expArr.push(new Results("stim", "zzt", 50, 0, 500, "Over!", "black", expArr));
	
	
	
	 	
	// start the experiment!
	startExp((expArr));
	console.log(partExp(expArr));
	
});
