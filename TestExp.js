
$(document).ready(function() {
	
	// Create a dummy experiment
	
	myExp = new Experiment("stim");
	
	HelloWorld = new Stimulus(1000, 400, true);
	HelloWorld.addFeature("text");
	
	HelloWorld2 = new Stimulus(0, 400, true);
	HelloWorld2.addFeature("text");	
	
	myExp.add(HelloWorld);
	myExp.add(HelloWorld);
	myExp.add(HelloWorld);	
	myExp.add(HelloWorld2);		
	myExp.add(HelloWorld);
	myExp.add(HelloWorld);
	myExp.add(HelloWorld);		
	
		
		
	myExp.start();
	

});
