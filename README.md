# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

The jExp library can be used to present experimental stimuli simultaneously and sequentially in a precisely timed manner. The implementation of jExp consists of 2 main parts:

1. Experimental stimuli are implemented in an object hierarchie. You can instantiate stimuli to present them in your experiment. Stimuli can be anything that you can create using JavaScript, HTML and CSS, or any media files a browsercan handle. The appearance of a stimulus is specified in the *showStimulus* method of the stimulus prototype. The presentation duration and an inter-stimulus-intervall of a stimulus are passed as arguments to the constructor when a stimulus is instantiated.

2. Functions that run the experiment and especially ensure the correct timing of stimulus presentation. Particularly important is the function *startExp*: It takes an array containing stimuli objects as argument and runs the experiment.


### TO DO

**major**

1. event handling
  1. add event listener method to Stimuli that is also called by *present*
  2. add listener as function to stimuli (Check)
  3. remove listener after duration + ISI (to do)
  4. probably move *countdown* function to the Stimulus super object rather than using it as a global function
  5. which events should be listened to? Should be implemented at object creation (via constructor probably)
  6. implement the possibility to listen or not listen to reaction
2. add toString method to Stimuli objects  
3. data storing functionality
  1. not client - server exchange functionality, but how will the reactions be stored in JavaScript
  2. idea: add data-save properties to stimulus: this.time, this.key?
4. stimulus positioning
  1. the HTML canvas element; then positioning can be done via coordinates  

**minor**

1. make object instantiation more comfortable


### "Stimulus-object creation contract"

- if you create a new stimulus, inherit from the super object *Stimulus*

- call the constructor of *Stimulus*, add further features by adding more arguments to the constructor

- override *showStimulus* to specify the appearance of your stimulus

- never override *present*, inherit this method from *Stimulus*

- implement the possibility to position your stimulus by passing arguments to the object constructor

- if no argument is given, make central positioning default for your Stimulus