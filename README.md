# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

jExp takes care of stimulus timing and event recording, while offering the full flexibility to create your own stimuli. In other words, jExp requires you to program your own experiment - this applies in two ways: stimulus creation and experimental flow.

There are currently some standard stimulus types (plain text, fixation cross), but more special wishes must programmed by yourself. Stimulus presentation is based on the HTML5 canvas element, so learning how to use to this is a good start (e.g. http://www.html5canvastutorials.com/). The good news is that once you know how to create your stimulus, adding this stimulus type to an experiment could not be easier: write a function that specifies the stimulus functioning, call `yourStimulus.addFeature(functionThatSpecifiesStimulusAppearance)` and add the stimulus to your experiment.

Currently jExp currently does not offer any experimental flow control functionality. Hence it is necessary to program the experimental flow using JavaScript (in most cases some for loops are enough anyway).


## TO DO
### major problems

- fix bug that causes experiment canvas height larger than window height -- this is probably a browser side problem
- i reduced size by 30px, but there must be a better way (or is there?)


### to be worked on
1. pack everything into a proper namespace and reduce possible name space conflicts (see http://learn.jquery.com/using-jquery-core/avoid-conflicts-other-libraries/)
1. Make Stimulus.waitEvent() more flexible
  + add callbacks that can react on any user-defined events!
2. Add possibility to insert images
3. how to best implement addFeature()
4. Set up Wiki and a tutorial
  
### minor

1. Implement more stimuli features in new Stimulus implementation (rectangle, triangle, ...)
2. implement functions to manipulate experimental flow?
  + it already works quite well by using common for-loops (see Simon experiment)
3. Work on data storage
  + results are saved to a JSON string. 
  + Implement functions that analyze data?
  + Server interaction?
4. experimental flow control
  + nextStim can be used to manipulate experimental flow
  + showNext should be callable from within custom functions
