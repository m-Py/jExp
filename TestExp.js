
	// Create a dummy experiment
	
	myExp = new Experiment("#stim");
	
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
	
	var stim5 = new Stimulus(0, 0, false);
	stim5.addText("The experiment is over.", 50, rndCol());	
		
	myExp.add(stim0);
	myExp.add(stim1);
	myExp.add(stim2);
	myExp.add(stim3);
	myExp.add(stim4);	
	myExp.add(stim5);

$(document).ready(function() {

				
	myExp.start();
	

});
