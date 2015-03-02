# jExp

**jExp is a JavaScript framework that enables you to run (psychological) experiments in your browser.**

It is currently being developed.

The implementation of jExp consists of 2 main parts:

1. Experimental stimuli are implemented as an object hierarchie. You can instantiate stimuli that will be run in your experiment. Stimuli can be anything that you can create using JavaScript, HTML and CSS, or even image or sound files; so the only boundaries in stimulus creation are in your imagination.

If you create a new stimulus, override the method *showStimulus* to specify the appearance of your stimulus. Inherit the method *present* from the Stimulus super object. *present* calls *showStimulus* of the current object and the function countdown, which makes sure that the stimulus is removed after the specified duration. Do not change the method *present*! 

2. Functions, that run the experiment and especially ensure the correct timing of stimulus presentation. Particularly important is the function startExp(): It takes an array containing stimuli objects as argument and runs the experiment.