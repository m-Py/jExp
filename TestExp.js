
	// Create a dummy experiment
	
	myExp = new Experiment("#stim");	
	
	var allowedKeys = [115, 108]; // keys: ['s', 'l']
		
	var cross = new Stimulus("cross", 250, 300);
	cross.addCross(30, 2);	
	
	var start = new Stimulus("startscreen", 0, 0, [32]);
	start.addText("Press space to start experiment", 100, rndCol());
	
	var startTrial = new Stimulus("trial_begin", 0, 0, [32]);
	startTrial.addText("Press space to start trial", 100, rndCol());	
	
	var stim1 = new Stimulus("left" ,1000, 500, allowedKeys, 115);
	stim1.addText("left", 100, rndCol());	
	
	var stim2 = new Stimulus("right", 1000, 500, allowedKeys, 108);	
	stim2.addText("right", 100, rndCol());	 	

	var stim3 = new Stimulus("nogo", 1000, 500, allowedKeys, "nogo");
	stim3.addText("DON'T", 100, rndCol());
	
	var end = new Stimulus("endScreen", 0, 0);
	end.addText("The experiment is over.", 100, rndCol());
	
	var anyKey = new Stimulus("react to all", 0, 0);
	anyKey.addText("press any key", 100, rndCol());
	anyKey.addLogger(stim1, stim2, stim3); // logs data of the 3 stimuli to the Experiment.data object


	// test addBlock functioning
	myExp.add(start);
	myExp.addBlock(3, startTrial, cross, stim1, cross, stim2, cross, stim3, anyKey);
	myExp.add(end);
	
	// JSON.stringify(myExp.data) can be used to store saved data as a json string :-)

$(document).ready(function() {

	myExp.start();

});
