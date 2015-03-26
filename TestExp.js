
$(document).ready(function() {
	
	// Create a dummy experiment
	
	myExp = new Experiment("stim");
	
	HelloWorld = new Stimulus(0, 0, false);
	HelloWorld.addFeature("text");
	
	myExp.add(HelloWorld);
	myExp.createCanvas();
	myExp.start();
	
	// create stimuli that are called multiple times during the experiment
	

	/* start the experiment!
	startExp((expArr));
	console.log(partExp(expArr));*/
	
});
