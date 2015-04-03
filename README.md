# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

**major**
- fix bug that causes experiment canvas height larger than window height
- i reduced size by 30px, but there must be a better way

### TO DO

1. rework logger functioning; does not work the expected way in simon experiment
  1. replaced logger method by Experiment.storeData method
2. create simple sample experiment that demostrates functionality (Simon effect experiment)
  1. CHECK
3. implement more stimuli features in new Stimulus implementation (rectangle, triangle, ...)  
4. improve data storage functionality (client side first)
  1. maybe try to save JSON file locally via Chrome file system?
5. add functionalities to control experimental flow
  1. add functionality to group several stimuli into one block that can be presented repeatedly and randomized
  2. how to realize trials, blocks, etc.?
6. add possibility to change stimulus appearance during experiment so that not everything must be set a priori (probably belongs to point 5)
  1. for example for feedback during the experiment
  2. probably the solution is to add "coding" features to stimuli
