# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

The jExp library can be used to position and present experimental stimuli in a browser.
jExp takes care of precise timing of stimulus presentations and.

### TO DO

1. event handling
  1. specify correct / incorrect keypresses 
  2. store whether press was correct
  3. implement no go as correct response
2. data storage client and server side
  1. implement possibility to store / export relevant data 
3. create sample experiment with preliminary data storage and event handling (see point 1)
4. stimulus creation
  1. implement more stimuli features in new Stimulus implementation (rectangle, triangle, fixation cross...)
5. stimulus positioning
  1. implement all stimuli via HTML canvas element? CHECK
  2. implement stimulus positioning via argument passing to add feature methods
6. add functionalities to control experimental flow
  1. add functionality to group several stimuli into one block that can be repeatedly presented
