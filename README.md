# jExp

**jExp is a JavaScript framework that enables you to run (psychological) experiments in your browser.**

jExp is meant to be particularly useful in faciliating the timing of sequentially presented experimental stimuli, which can be tricky in JavaScript. It is currently being developed. 

The implementation of jExp consists of 2 main parts:

1. Experimental stimuli are implemented in an object hierarchie. You can instantiate stimuli to present them in your experiment. Stimuli can be anything that you can create using JavaScript, HTML and CSS, or image and sound files. Stimuli appearance is specified in the *showStimulus* method. The presentation duration and an inter-stimulus-intervall are passed as arguments to the constructor.

2. Functions that run the experiment and especially ensure the correct timing of stimulus presentation. Particularly important is the function *startExp*: It takes an array containing stimuli objects as argument and runs the experiment.


### "Stimulus-object creation contract"

- if you create a new stimulus, inherit from the super object *Stimulus*

- call the constructor of *Stimulus*, add further features by adding more arguments to the constructor

- override *showStimulus* to specify the appearance of your stimulus

- never override *present*, inherit this method from *Stimulus*

- implement the possibility to position your stimulus by passing arguments to the object constructor

- if no argument is given, make central positioning default for your Stimulus


### TO DO

- implement stimulus positioning by passing arguments to the constructor

- implement simultaneous presentation of multiple stimuli

- include possibility for stimuli presentation not having a fixed duration, but rather depending on an external event (like a key press)

- (maybe later): remove the necessity to pass DOM id names to the stimulus constructor

- add input listeners (i.e. key and mouse presses)

- data storing functionality?