
$(document).ready(function() {
	
	// Create a dummy experiment

	// create stimuli that are called multiple times during the experiment
	
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
	for (var i = 0; i < 12; i++) {
		if (i % 2 === 0) {
			expArr.push(new Cross("stim", "st"+i, 20, 150, rndInt(500, 800), 2));
		}
		else {
			expArr.push(new Square("stim", "st"+i, rndInt(10, 300), 800, rndInt(800, 2000), rndCol()));
		}
	}
	for (var t = 0; t < 4; t++) {
		expArr.push(goNext);
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
