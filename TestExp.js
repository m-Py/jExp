
	// Create a dummy experiment
	
	var allowedKeys = [115, 108]; // keys: ['s', 'l']
	var leftID = "leftStim";
	var rightID = "rightStim";
	var nogoID = "nogo";
	
	myExp = new Experiment("#stim");
	
	var cross = new Stimulus("cross", 250, 300, true);
	cross.addCross(30, 2);	
	
	var stim0 = new Stimulus("startscreen", 0, 0, true, [32]);
	stim0.addText("Press space to start", 100, rndCol());
	
	var stim1 = new Stimulus(leftID,1000, 500, true, allowedKeys, 115);
	stim1.addText("left", 100, rndCol());
	

	var stim1_1 = new Stimulus(nogoID, 1000, 500, true, allowedKeys, "nogo");
	stim1_1.addText("DON'T", 100, rndCol());		
	
	var stim2 = new Stimulus(rightID, 1000, 500, true, allowedKeys, 108);	
	stim2.addText("right", 100, rndCol());	 

	var stim2_1 = new Stimulus(nogoID, 1000, 500, true, allowedKeys, "nogo");
	stim2_1.addText("DON'T", 100, rndCol());	

	var stim3 = new Stimulus(leftID, 1000, 500, true, allowedKeys, 115);
	stim3.addText("left", 100, rndCol());		

	var stim4 = new Stimulus(rightID, 1000, 500, true, allowedKeys, 108);
	stim4.addText("right", 100, rndCol());			
	
	var stim5 = new Stimulus(nogoID, 1000, 500, true, allowedKeys, "nogo");
	stim5.addText("DON'T", 100, rndCol());	
	
	var stim6 = new Stimulus("endScreen", 0, 0, true);
	stim6.addText("The experiment is over.", 100, rndCol());
	
	var breakStim = new Stimulus("pause", 0, 0, true);
	breakStim.addText("relax dude.", 100, rndCol());
	
	myExp.add(stim0);
	myExp.add(cross);		
	myExp.add(stim1);	
	myExp.add(cross);
	myExp.add(stim1_1);
	myExp.add(cross);
	myExp.add(stim2);
	myExp.add(cross);
	myExp.add(stim2_1);
	myExp.add(breakStim);
	myExp.add(cross);	
	myExp.add(stim3);
	myExp.add(cross);
	myExp.add(stim4);	
	myExp.add(cross);	
	myExp.add(stim5);
	myExp.add(stim6);

$(document).ready(function() {

	myExp.start();

});
