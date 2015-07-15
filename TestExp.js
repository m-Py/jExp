
	// Create a dummy experiment
	
	myExp = new Experiment("#stim"); // this is the only place where you find a DOM selector	
	
	var allowedKeys = [115, 107]; // keys: ['s', 'k']
		
	var cross = new Stimulus("cross", 250);
	cross.addCross(30, 2);	
	cross.addText("moep", 50, rndCol(), 0, 100);
	cross.addText("Schaf", 50, rndCol(), 0, -100);
	cross.addText("*", 100, rndCol(), 400, 150); 
	
	var start = new Stimulus("startscreen", 0, false, [32]);
	start.addText("Press space to start experiment", 50, rndCol(), 0, 0);
	// test adding variables to Experiment object; variables that are added this way get stored by the logger
	start.addExpVar("moep", "moep");

	var startTrial = new Stimulus("trial_begin", 0, false, [32]);
	startTrial.addText("Press space to start trial", 50, rndCol());
	
	// the countdown function which removes the stimulus after "duration" has a timing precision of 10ms
	// so you must always specify an ISI (20ms is reliable) to make sure that the sequential presentation of stimuli runs smoothly
	var stim1 = new Stimulus("left" ,1000, true, allowedKeys, 115);
	stim1.addText("left", 100, rndCol());	
	
	var stim2 = new Stimulus("right", 1000, true, allowedKeys, 107);	
	stim2.addText("right", 100, rndCol());	 	

	var stim3 = new Stimulus("nogo", 1000, true, allowedKeys, 0);
	stim3.addText("DON'T", 100, rndCol());
	
	var end = new Stimulus("endScreen", 0);
	end.addText("The experiment is over.", 50, rndCol());
	
	// if you want a blank screen, just create a stimulus without adding features to it!
	var nothing = new Stimulus("nothing", 1000);
	
	myExp.add(start);
	myExp.add(startTrial);
	myExp.add(cross);
	myExp.add(nothing);
	myExp.add(stim1);
	myExp.add(nothing);	
	myExp.add(cross);
	myExp.add(nothing);	
	myExp.add(stim2);
	myExp.add(nothing);	
	myExp.add(stim3);
	myExp.add(nothing);	
	myExp.add(end);

	
$(document).ready(function() {
	myExp.start();
});
