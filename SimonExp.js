
/* create first "serious" experiment
 * A Simon effect experiment: 
 * react on the word (left / right) with a press on the left (key 's') or on the right (key 'l')
 * words can be presented on the right or on the left --> ignore stimulus location, react on word
 */
 
 // create exp
simon = new Experiment("#stim");

// create Stimuli
var cross = new Stimulus("cross", 250, 300);
cross.addCross(30, 2);	 

var start = new Stimulus("startscreen", 0, 0, [32]);
start.addText("Press Space to start Simon experiment", 80, rndCol(), 0,0);
simon.add(start);

createBlock = function(blockRepetition) {
	
	
	for (var t = 0; t < blockRepetition; t++) {
		
		startBlock = new Stimulus("startblock", 0, 0);
		startBlock.addText("Click to start " + (t+1) + ". block", 80, rndCol(), 0, 0);
		simon.add(startBlock);	
		
		for ( var i = 0; i < 5; i++) {
			var coin = rndInt(1,4);
			if (coin === 1) {
				var id = "react_left - position_left";
				var correctKey = 115;
				var text = "left";
				var side = -300;
			}
			else if (coin === 2) {
				var id = "react_left - position_right";		
				var correctKey = 115;
				var text = "left";
				var side = 300;
			}
			else if (coin === 3) {
				var id = "react_right - position_right";		
				var correctKey = 108;
				var text = "right";
				var side = 300;
			}	
			else if (coin === 4) {
				var id = "react_right - position_left";		
				var correctKey = 108;
				var text = "right";
				var side = -300;
			}				
			
			var cross = new Stimulus("cross", 250, 300);
			cross.addCross(30, 2);
				
			tempStim = new Stimulus(id, 400, rndInt(700, 1100), [115, 108], correctKey);
			tempStim.addText(text, 80, rndCol(), side, 0);
			
			simon.addBlock(1, cross, tempStim);
		}
	}
};


createBlock(1);


var end = new Stimulus("endscreen", 0, 0);
end.addText("The experiment is over, thank you!", 80, rndCol());
simon.add(end);

$(document).ready(function() {

	simon.start();

});

