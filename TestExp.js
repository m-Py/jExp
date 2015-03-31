
	// Create a dummy experiment
	
	var allowedKeys = [115, 108]; // keys: ['s', 'l']
	var leftID = "leftStim";
	var rightID = "rightStim";
	var nogoID = "nogo";
	
	myExp = new Experiment("#stim");
	
	var cross = new Stimulus("cross", 250, 300, false);
	cross.addCross(30, 2);	
	cross.addCode("console.log('Woohoo I can code');");
	
	var stim0 = new Stimulus("startscreen", 0, 0, false, [32]);
	stim0.addText("Press space to start", 100, rndCol());
	
	var stim1 = new Stimulus(id = leftID, duration = 1000, ISI = 500, listening = true, listenTo = allowedKeys, correctResponse = 115);
	stim1.addText("left", 100, rndCol());
	

	var stim1_1 = new Stimulus(nogoID, 1000, 500, true, allowedKeys, "nogo");
	stim1_1.addText("DON'T", 100, rndCol());		
	
	var stim2 = new Stimulus(rightID, 1000, 500, true, allowedKeys, 108);	
	stim2.addText("right", 100, rndCol());	 
	stim2.addCode("console.log(stim1.correct);"); // this way I can access the correctness of a previous stimulus for feedback

	var stim2_1 = new Stimulus(nogoID, 1000, 500, true, allowedKeys, "nogo");
	stim2_1.addText("DON'T", 100, rndCol());	

	var stim3 = new Stimulus(leftID, 1000, 500, true, allowedKeys, 115);
	stim3.addText("left", 100, rndCol());		

	var stim4 = new Stimulus(rightID, 1000, 500, true, allowedKeys, 108);
	stim4.addText("right", 100, rndCol());			
	
	var stim5 = new Stimulus(nogoID, 1000, 500, true, allowedKeys, "nogo");
	stim5.addText("DON'T", 100, rndCol());	
	
	var stim6 = new Stimulus("endScreen", 0, 0, false);
	stim6.addText("The experiment is over.", 100, rndCol());	
	

	myExp.add(stim0);
	myExp.add(cross);
	myExp.add(stim1);
	myExp.add(cross);
	myExp.add(stim1_1);
	myExp.add(cross);
	myExp.add(stim2);
	myExp.add(cross);
	myExp.add(stim2_1);
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
