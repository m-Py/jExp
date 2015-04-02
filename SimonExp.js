
/* create first "serious" experiment
 * A Simon effect experiment: 
 * react on the word (left / right) with a press on the left (key 's') or on the right (key 'l')
 * words can be presented on the right or on the left
 */
 
 // create exp
simon = new Experiment("#stim");


var allowedKeys = [115, 108]; // keys: ['s', 'l']


// create Stimuli
var cross = new Stimulus("cross", 250, 300);
cross.addCross(30, 2);	 

var start = new Stimulus("startscreen", 0, 0, [32]);
start.addText("Press space to start Simon experiment", 50);

