
/* create first "serious" experiment
 * A Simon effect experiment: 
 * react on the word (left / right) with a press on the left (key 's') or on the right (key 'l')
 * words can be presented on the right or on the left --> ignore stimulus location, react on word
 */
 
 // create exp
var simon = new Experiment("#stim");

// how many experimental blocks?
var blocks = 5;
// how many trials per block?
var trials = 10;


// create Stimuli - fixation cross
var cross = new Stimulus("cross", 250, 300, false);
cross.addCross(30, 2);	 

instrCol = rndCol();

// create Stimuli - startscreen
var startScreen = new Stimulus("startscreen", 0, 0, false, [32]);
startScreen.addText("Welcome to the experiment", 60, instrCol, 0,160);
startScreen.addText("React to the word that is presented on the screen", 40, instrCol, 0,70);
startScreen.addText("- Press 's' if you see 'left' -", 40, instrCol, 0,0);
startScreen.addText("- Press 'k' if you see 'right' -", 40, instrCol, 0,-45);
startScreen.addText(" Press 'Space' to start ", 60, instrCol, 0,-130);
// add start screen to our simon experiment; it is the first presented stimulus then
simon.add(startScreen);


createBlock = function(blockRepetition) {
	
	
	for (var t = 0; t < blockRepetition; t++) {
		
		startBlock = new Stimulus("startblock", 0, 0, false);
		startBlock.addText("Click to start " + (t+1) + ". block", 80, rndCol(), 0, 0);
		simon.add(startBlock);	
		
		// add trials to each block
		for ( var i = 0; i < trials; i++) {
			
			// randomly determine the trial type
			var coin = rndInt(1,4);
			if (coin === 1) {
				var id = "react_left - position_left";
				var correctKey = 115;
				var text = "left";
				var side = -300;
				var congruency = "congruent";
			}
			else if (coin === 2) {
				var id = "react_left - position_right";		
				var correctKey = 115;
				var text = "left";
				var side = 300;
				var congruency = "incongruent";
			}
			else if (coin === 3) {
				var id = "react_right - position_right";		
				var correctKey = 107;
				var text = "right";
				var side = 300;
				var congruency = "congruent";
			}	
			else if (coin === 4) {
				var id = "react_right - position_left";		
				var correctKey = 107;
				var text = "right";
				var side = -300;
				var congruency = "incongruent";
			}				
			
			// create trial: consists of fixation cross and stimulus that has randomly determined properties (see above)
			var cross = new Stimulus("cross", 250, 300);
			cross.addCross(30, 2);
				
			tempStim = new Stimulus(id, 400, rndInt(700, 1100), true, [115, 107], correctKey);
			tempStim.addText(text, 80, rndCol(), side, 0);
			// add some properties to the stimulus that we want so save!
			tempStim.block = t+1; // easy way to save in which block a stimulus has been presented
			tempStim.trial = i+1; // easy way to save the trial number of a stimulus
			tempStim.congruency = congruency; // congruency condition
			
			// add fixation cross and word stimulus to the experiment
			simon.add(cross);
			simon.add(tempStim);
		}
	}
};

// create experimental blocks
createBlock(blocks);

// add endscreen
var end = new Stimulus("endscreen", 0, 0, false);
end.addText("The experiment is over, thank you!", 80, rndCol());
simon.add(end);

$(document).ready(function() {

	simon.start();

});

