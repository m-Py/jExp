# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

The jExp library can be used to position and present experimental stimuli in a browser.
jExp takes care of precise timing of stimulus presentations and.

### TO DO

1. event handling
  1. specify allowed key presses
  2. specify keys responsible for different parts of a task
  3. specify correct / incorrect keypresses 
  4. store key pressed and whether press was correct
  5. implement no go as correct response
2. data storage client and server side
  1. set up informative toString method. CHECK
  2. added printStimuli method for experiment objects. CHECK
  3. now: learn how to properly store data as json or other 
3. create sample experiment with preliminary data storage and event handling (see point 1)
4. stimulus creation
  1. implement more stimuli features in new Stimulus implementation (rectangle, triangle, fixation cross...)
5. stimulus positioning
  1. implement all stimuli via HTML canvas element? CHECK
  2. implement stimulus positioning via argument passing to add feature methods
6. add functionality to group several stimuli into one block
