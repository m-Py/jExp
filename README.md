# jExp

**jExp is a JavaScript framework that enables you to run (psychological) experiments in your browser.**

It is currently being developed.

The implementation of jExp consists of 2 main parts:

1. Experimental stimuli are implemented as an object hierarchie. You can instantiate stimuli that will be run in your experiment. Stimuli can be anything that you can create using JavaScript, HTML and CSS, or even image or sound files; so the only boundaries in stimulus creation are in your imagination. Stimuli have an appearance that is specified in the *showStimulus* method, a duration and an inter-stimulus-intervall, which are passed as arguments to the constructor.

2. Functions that run the experiment and especially ensure the correct timing of stimulus presentation. Particularly important is the function *startExp*: It takes an array containing stimuli objects as argument and runs the experiment.


## Stimulus-"Interface" (stimulus-object creation contract)

- inherit from the super object *Stimulus*

- call the constructor of *Stimulus*, add further features by adding more arguments to the constructor

- override *showStimulus* to specify the appearance of your stimulus

- never override *present*, inherit this method from *Stimulus*

- implement the possibility to position your stimulus by passing arguments to the object constructor

- if no argument is given, make central positioning default for your Stimulus


**TO DO**

- implement stimulus positioning by passing arguments to the constructor

- implement simultaneous presentation of multiple stimuli

- (maybe later): remove the necessity to pass DOM id names to the stimulus constructor