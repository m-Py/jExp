
$(document).ready(function() {
	
	// Create a dummy experiment

	// fill an array with stimuli
	expArr = [];
	var fixationCross = new Cross("stim", "cross", 20, 150, 300, 2);
	for (var i = 0; i < 4; i++) {
		if (i % 2 === 0) {
			expArr.push(fixationCross);
		}
		else {
			expArr.push(new Square("stim", "st"+i, rndSize(), 800, 1000, rndCol())); // Parent div is always the same, but each new Square object has a seperate div which contains the stimulus
		}
	}
	expArr.push(new Text("stim", "end", 50, 0, 0, "The experiment is over")); 
	expArr.push(new Text("stim", "bla", 50, 500, 500, "But wait...")); 
	expArr.push(new Text("stim", "moe", 50, 500, 500, "I think...")); 
	expArr.push(new Text("stim", "shu", 50, 500, 500, "I still got it!"));
	for (var i = 0; i < 4; i++) {
		if (i % 2 === 0) {
			expArr.push(fixationCross);
		}
		else {
			expArr.push(new Square("stim", "st"+i, rndSize(), 800, 1000, rndCol())); // Parent div is always the same, but each new Square object has a seperate div which contains the stimulus
		}
	}	
	expArr.push(new Text("stim", "end", 50, 0, 0, "Now it's really over ;-)")); 
	expArr.push(new Text("stim", "end", 50, 1000, 500, "Or is it.....")); 
	for (var i = 0; i < 20; i++) {
		if (i % 2 === 0) {
			expArr.push(fixationCross);
		}
		else {
			expArr.push(new Square("stim", "st"+i, rndSize(), 800, 1000, rndCol())); // Parent div is always the same, but each new Square object has a seperate div which contains the stimulus
		}
	}		
	expArr.push(new Text("stim", "end", 50, 0, 500, "=)"));
	
	 	
	// start the experiment!
	startExp((expArr));
	console.log(partExp(expArr));
	
});
