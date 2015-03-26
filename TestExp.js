
$(document).ready(function() {
	
	// Create a dummy experiment
	
	myExp = new Experiment("stim");
	
	var stim1 = new Stimulus(1000, 400, false);
	stim1.addText("Hello World", 100, rndCol());
	
	var stim2 = new Stimulus(1000, 500, false);
	stim2.addText("Moep", 100, rndCol());	

	var stim3 = new Stimulus(1000, 500, false);
	stim3.addText("Shanol", 50, rndCol());		

	var stim4 = new Stimulus(1000, 500, false);
	stim4.addText("FFFUUUUUUUU", 150, rndCol());			
	
	
	myExp.add(stim1);
	myExp.add(stim2);
	myExp.add(stim3);
	myExp.add(stim4);	
				
	myExp.start();
	

});
