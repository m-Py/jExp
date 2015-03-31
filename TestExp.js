
	// Create a dummy experiment
	
	myExp = new Experiment("#stim");
	
	var cross = new Stimulus(250, 300, false);
	cross.addCross(30, 2);	
	
	var stim0 = new Stimulus(0, 0, false);
	stim0.addText("Start", 100, rndCol());
	
	var stim1 = new Stimulus(1000, 500, true);
	stim1.addText("Hello World", 100, rndCol());
	
	var stim2 = new Stimulus(1000, 500, true);
	stim2.addText("Moep", 100, rndCol());	 

	var stim3 = new Stimulus(1000, 500, true);
	stim3.addText("Shanol", 100, rndCol());		

	var stim4 = new Stimulus(1000, 500, true);
	stim4.addText("Schaf", 100, rndCol());			
	
	var stim5 = new Stimulus(0, 0, true); // beware: ISI in 0-duration stimuli determines the duration until the experiment can be continued via keypress
	stim5.addText("Start next trial.", 50, rndCol());	
	
	var stim6 = new Stimulus(0, 0, true);
	stim6.addText("The experiment is over.", 50, rndCol());	
	

	myExp.add(stim0);
	myExp.add(cross);
	myExp.add(stim1);
	myExp.add(cross);
	myExp.add(stim2);
	myExp.add(cross);
	myExp.add(stim3);
	myExp.add(cross);
	myExp.add(stim4);	
	myExp.add(stim5);
	myExp.add(cross);
	myExp.add(stim1);
	myExp.add(cross);
	myExp.add(stim2);
	myExp.add(cross);
	myExp.add(stim3);
	myExp.add(cross);
	myExp.add(stim4);	
	myExp.add(stim6);	

$(document).ready(function() {

				
	myExp.start();
	

});
