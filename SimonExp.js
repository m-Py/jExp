
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
var cross = new Stimulus("cross", 250, 300);
cross.addCross(30, 2);	 

// create Stimuli - startscreen
var startScreen = new Stimulus("startscreen", 0, 0, [32]);
startScreen.addText("Press Space to start Simon experiment", 80, rndCol(), 0,0);
// add start screen to our simon experiment; it is the first presented stimulus then
simon.add(startScreen);

createBlock = function(blockRepetition) {
	
	
	for (var t = 0; t < blockRepetition; t++) {
		
		startBlock = new Stimulus("startblock", 0, 0);
		startBlock.addText("Click to start " + (t+1) + ". block", 80, rndCol(), 0, 0);
		simon.add(startBlock);	
		
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
				var correctKey = 108;
				var text = "right";
				var side = 300;
				var congruency = "congruent";
			}	
			else if (coin === 4) {
				var id = "react_right - position_left";		
				var correctKey = 108;
				var text = "right";
				var side = -300;
				var congruency = "incongruent";
			}				
			
			// create trial:
			var cross = new Stimulus("cross", 250, 300);
			cross.addCross(30, 2);
				
			tempStim = new Stimulus(id, 400, rndInt(700, 1100), [115, 108], correctKey);
			tempStim.addText(text, 80, rndCol(), side, 0);
			// add some properties to the stimulus that we want so save!
			tempStim.block = t+1; // easy way to save in which block a stimulus has been presented
			tempStim.trial = i+1; // easy way to save the trial number of a stimulus
			tempStim.congruency = congruency; // congruency condition
			
			simon.add(cross);
			simon.add(tempStim);
		}
	}
};

// create experimental blocks
createBlock(blocks);


var end = new Stimulus("endscreen", 0, 0);
end.addText("The experiment is over, thank you!", 80, rndCol());
simon.add(end);

$(document).ready(function() {

	simon.start();

});

