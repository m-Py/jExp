# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

**major**
- fix bug that causes experiment canvas height larger than window height
- i reduced size by 30px, but there must be a better way

### TO DO

1. remove featureNumber property off Stimulus and use push() in add...() methods 
2. implement more stimuli features in new Stimulus implementation (rectangle, triangle, ...)  
3. implement functions to manipulate experimental flow?
  1. it already works quite well with only JavaScript loops (see Simon experiment)
4. Work on data storage
  1. results can be saved to a JSON string. 
  2. Implement functions that analyze data? 
  3. Server interaction?
5. Set up Wiki and a tutorial
