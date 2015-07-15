# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

**major**
- fix bug that causes experiment canvas height larger than window height
- i reduced size by 30px, but there must be a better way

### TO DO

1. rework event handling and data storage as it has to be done differently with the new experimental timing
  + event handling still relies on ISI stimulus property, which does not exist anymore
2. make Stimulus.waitEvent() more flexible
  + add callbacks that can react on any user-defined events!
2. Think: how to realize pauses between trials? How to realize event handling now that I no longer have ISI?
3. implement more stimuli features in new Stimulus implementation (rectangle, triangle, ...)
4. implement functions to manipulate experimental flow?
  + it already works quite well with only JavaScript loops (see Simon experiment)
5. Work on data storage
  + results can be saved to a JSON string. 
  + Implement functions that analyze data? 
  + Server interaction?
6. Set up Wiki and a tutorial
