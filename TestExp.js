
	// Create a dummy experiment
	
	myExp = new Experiment("#stim");	
	
	var allowedKeys = [115, 108]; // keys: ['s', 'l']
		
	var cross = new Stimulus("cross", 250, 300);
	cross.addCross(30, 2);	
	
	var start = new Stimulus("startscreen", 0, 0, [32]);
	start.addText("Press space to start", 100, rndCol());
	
	var stim1 = new Stimulus("left" ,1000, 500, allowedKeys, 115);
	stim1.addText("left", 100, rndCol());	
	
	var stim2 = new Stimulus("right", 1000, 500, allowedKeys, 108);	
	stim2.addText("right", 100, rndCol());	 	

	var stim3 = new Stimulus("nogo", 1000, 500, allowedKeys, "nogo");
	stim3.addText("DON'T", 100, rndCol());
	
	var end = new Stimulus("endScreen", 0, 0);
	end.addText("The experiment is over.", 100, rndCol());
	
	var breakStim = new Stimulus("pause", 0, 0);
	breakStim.addText("relax dude.", 100, rndCol());


	// test addBlock functioning
	myExp.addBlock(0, start, cross, stim1, cross, stim2, cross, stim3, end);

$(document).ready(function() {

	myExp.start();

});
