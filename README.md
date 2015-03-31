# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

The jExp library can be used to position and present experimental stimuli in a browser.
jExp takes care of precise timing of stimulus presentations and.

### TO DO

**major**
- fix bug that causes experiment canvas height larger than window height

1. implement more stimuli features in new Stimulus implementation (rectangle, triangle, ...)
2. create simple sample experiment that demostrates functionality (simon experiment)
3. data storage client and server side
  1. implement possibility to store / export relevant data 
  2. add save() method to experiment object. Arguments are stimulus properties (e.g. RT). Returns a object containing the saved properties. Must be convertable to Json
4. add possibility to change stimulus appearance during experiment so that not everything must be set a priori  
  1. for example for feedback during the experiment
  2. probably the solution is to add "coding" features to stimuli
5. stimulus positioning
  1. implement stimulus positioning via argument passing to add feature methods
6. add functionalities to control experimental flow
  1. add functionality to group several stimuli into one block that can be repeatedly presented
