
$(document).ready(function() {
	
	// Create a dummy experiment

	// create stimuli that are called multiple times during the experiment
	var fixationCross = new Cross("stim", "cross", 20, 150, 300, 2);
	var waitForIt = new Text("stim", "mup", 50, 500, 500, "wait for it..."); 
	var goNext = new Text("stim", "shub", 50, 0, 0, "Go for next trial"); 
	
	/* test multiStim
	var dmmyStim = new Text("stim", "fu", 30, 1000, 2200, "WILL THIS WORK");
	var shuba = new Square("stim", "st2323", rndSize(), 800, 1000, rndCol())
	var shube = new Square("stim", "st232", 20, 3000, 1000, rndCol())
	var testMult = new MultiStim(shuba, dmmyStim, shube);
	testMult.present();
	test MultiStim over:: works! =) Now go for different positionings*/
	
	
	// set up array & fill with stimuli
	expArr = [];
	expArr.push(new Text("stim", "start", 50, 0, 0, "Start the experiment"));
	expArr.push(waitForIt);
	for (var i = 0; i < 6; i++) {
		if (i % 2 === 0) {
			expArr.push(fixationCross);
		}
		else {
			expArr.push(new Square("stim", "st"+i, rndSize(), 800, 1000, rndCol()));
		}
	}
	for (var t = 0; t < 3; t++) {
		expArr.push(goNext);
		expArr.push(waitForIt);
		for (var i = 0; i < 6; i++) {
			if (i % 2 === 0) {
				expArr.push(fixationCross);
			}
			else {
				expArr.push(new Square("stim", "st"+i, rndSize(), 800, 1000, rndCol()));
			}
		}
	}
	expArr.push(new Text("stim", "zzt", 50, 0, 500, "Over!"));
	
	
	
	 	
	// start the experiment!
	startExp((expArr));
	console.log(partExp(expArr));
	
});
