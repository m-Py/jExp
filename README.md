# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

The jExp library can be used to present experimental stimuli simultaneously and sequentially in a precisely timed manner. The implementation of jExp consists of 2 main parts:

1. Experimental stimuli are implemented in an object hierarchie. You can instantiate stimuli to present them in your experiment. Stimuli can be anything that you can create using JavaScript, HTML and CSS, or any media files a browsercan handle. The appearance of a stimulus is specified in the *showStimulus* method of the stimulus prototype. The presentation duration and an inter-stimulus-intervall of a stimulus are passed as arguments to the constructor when a stimulus is instantiated.

2. Functions that run the experiment and especially ensure the correct timing of stimulus presentation. Particularly important is the function *startExp*: It takes an array containing stimuli objects as argument and runs the experiment.


### TO DO

**major

- stimulus positioning

- event handling (a big one...)

- data storing functionality

**minor

- make object instantiation more comfortable


### "Stimulus-object creation contract"

- if you create a new stimulus, inherit from the super object *Stimulus*

- call the constructor of *Stimulus*, add further features by adding more arguments to the constructor

- override *showStimulus* to specify the appearance of your stimulus

- never override *present*, inherit this method from *Stimulus*

- implement the possibility to position your stimulus by passing arguments to the object constructor

- if no argument is given, make central positioning default for your Stimulus