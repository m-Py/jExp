# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

### TO DO

**major**
- fix bug that causes experiment canvas height larger than window height
- i reduced size by 30px, but there must be a better way

1. add functionality to group several stimuli into one block that can be repeatedly presented
2. improve data storage functionality (client side first)
  1. add save() method to experiment object. Arguments are stimulus properties (e.g. RT). Returns a object containing the saved properties. Must be convertable to Json
3. stimulus positioning
  1. implement stimulus positioning via argument passing to add feature methods 
  2. do this for addText first
  3. if possible: change coordinate system of canvas so that x = 0, y = 0 is the center
4. create simple sample experiment that demostrates functionality (Simon effect experiment)
5. implement more stimuli features in new Stimulus implementation (rectangle, triangle, ...)  
6. add possibility to change stimulus appearance during experiment so that not everything must be set a priori  
  1. for example for feedback during the experiment
  2. probably the solution is to add "coding" features to stimuli
7. add functionalities to control experimental flow
