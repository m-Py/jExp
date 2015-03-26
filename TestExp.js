
$(document).ready(function() {
	
	// Create a dummy experiment
	
	myExp = new Experiment("stim");
	
	var stim1 = new Stimulus(1000, 400, true);
	stim1.addFeature("Hello World", "text");
	
	var stim2 = new Stimulus(1400, 400, true);
	stim2.addFeature("Moep", "text");	

	var stim3 = new Stimulus(1400, 400, true);
	stim2.addFeature("", "text");		
	
	
	myExp.add(stim1);
	myExp.add(stim3);
	myExp.add(stim2);
	
	
			
	myExp.start();
	

});
