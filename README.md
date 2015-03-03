# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

The jExp library is to be used to present experimental stimuli sequentially in a specified timing. 

The implementation of jExp consists of 2 main parts:

1. Experimental stimuli are implemented in an object hierarchie. You can instantiate stimuli to present them in your experiment. Stimuli can be anything that you can create using JavaScript, HTML and CSS, or any media files that a browser understands. The appearance of a stimulus is specified in the *showStimulus* method of the stimulus prototype. The presentation duration and an inter-stimulus-intervall of a stimulus are passed as arguments to the constructor when a stimulus is instantiated. TO DO: passing of stimulus position as constructor argument.

2. Functions that run the experiment and especially ensure the correct timing of stimulus presentation. Particularly important is the function *startExp*: It takes an array containing stimuli objects as argument and runs the experiment.


### TO DO

- implement stimulus positioning by passing arguments to the constructor

- implement simultaneous presentation of multiple stimuli (e.g. create function that binds multiple stimulus objects, shoud be easy)

- add input listeners (i.e. key and mouse presses) to process participant input

- add data storing functionality

- (maybe later): remove the necessity to pass DOM id names to the stimulus constructor


### "Stimulus-object creation contract"

- if you create a new stimulus, inherit from the super object *Stimulus*

- call the constructor of *Stimulus*, add further features by adding more arguments to the constructor

- override *showStimulus* to specify the appearance of your stimulus

- never override *present*, inherit this method from *Stimulus*

- implement the possibility to position your stimulus by passing arguments to the object constructor

- if no argument is given, make central positioning default for your Stimulus