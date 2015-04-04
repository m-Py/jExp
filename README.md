# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

**major**
- fix bug that causes experiment canvas height larger than window height
- i reduced size by 30px, but there must be a better way

### TO DO

1. remove featureNumber property of Stimulus object and use Array.push() instead of Array[featureNumber] 
2. add continueExp() function that is called when a 0-duration stimulus is shown
  1. this can then be bound on any user defined event; instead of only listening to key and mouse presses
  2. this allows a wider range of possible tasks
3. implement more stimuli features in new Stimulus implementation (rectangle, triangle, ...)  
4. implement functions to manipulate experimental flow?
  1. it already works quite well with only JavaScript loops (see Simon experiment)
5. Work on data storage
  1. results can be saved to a JSON string. 
  2. Implement functions that analyze data? 
  3. Server interaction?
6. Set up Wiki and a tutorial
