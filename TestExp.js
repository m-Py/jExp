
$(document).ready(function() {
	
	// Create a dummy experiment
	
	myExp = new Experiment("stim");
	
	var stim1 = new Stimulus(1000, 400, false);
	stim1.addText("Hello World", 100);
	
	var stim2 = new Stimulus(1000, 500, false);
	stim2.addText("Moep", 100);	

	var stim3 = new Stimulus(1000, 500, false);
	stim3.addText("Shanol");		

	var stim4 = new Stimulus(1000, 500, false);
	stim4.addText("FU U");			
	
	
	myExp.add(stim1);
	myExp.add(stim2);
	myExp.add(stim3);
	myExp.add(stim4);	
				
	myExp.start();
	

});
