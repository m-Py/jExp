
	// Create a dummy experiment
	
	myExp = new Experiment("#stim"); // this is the only place where you find a DOM selector	
	

	
	var allowedKeys = [115, 108]; // keys: ['s', 'l']
		
	var cross = new Stimulus("cross", 250, 300);
	cross.addCross(30, 2);	
	cross.addText("moep", 50, rndCol(), 0, 100);
	cross.addText("Schaf", 50, rndCol(), 0, -100);
	cross.addText("*", 100, rndCol(), 400, 150); 
	
	var start = new Stimulus("startscreen", 0, 0, false, [32]);
	start.addText("Press space to start experiment", 50, rndCol(), 0, 0);
	// test adding variables to Experiment object; variables that are added this way get stored by the logger
	start.addExpVar("moep", "moep");
	
	var startTrial = new Stimulus("trial_begin", 0, 0, false, [32]);
	startTrial.addText("Press space to start trial", 50, rndCol());	
	
	// the countdown function which removes the stimulus after "duration" has a timing precision of 10ms
	// so you must always specify an ISI (20ms is reliable) to make sure that the sequential presentation of stimuli runs smoothly
	var stim1 = new Stimulus("left" ,1000, 500, true, allowedKeys, 115);
	stim1.addText("left", 100, rndCol());	
	
	var stim2 = new Stimulus("right", 1000, 500, true, allowedKeys, 108);	
	stim2.addText("right", 100, rndCol());	 	

	var stim3 = new Stimulus("nogo", 1000, 500, true, allowedKeys, 0);
	stim3.addText("DON'T", 100, rndCol());
	
	var end = new Stimulus("endScreen", 0, 0);
	end.addText("The experiment is over.", 50, rndCol());


	// test addBlock functioning
	myExp.add(start);
	myExp.addBlock(1, startTrial, cross, stim1, cross, stim2, cross, stim3); // 3 repetitions for this block
	myExp.add(end);

	// test error throwing
	muh = new Stimulus("83", 99, 200, true);
	
$(document).ready(function() {

	myExp.start();

});
