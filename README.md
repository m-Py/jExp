# jExp

**jExp is a JavaScript framework that enables you to run psychological experiments in your browser.**

## TO DO
### major problems

- fix bug that causes experiment canvas height larger than window height
- i reduced size by 30px, but there must be a better way


### to be worked on
1. Rework event handling and data storage as it has to be done differently with the new experimental timing
  + event handling still relies on ISI stimulus property, which does not exist anymore
  + How to realize event handling now that I no longer have ISI?
2. Make Stimulus.waitEvent() more flexible
  + add callbacks that can react on any user-defined events!
3. Set up Wiki and a tutorial
  
### minor

1. Implement more stimuli features in new Stimulus implementation (rectangle, triangle, ...)
2. implement functions to manipulate experimental flow?
  + it already works quite well with only JavaScript loops (see Simon experiment)
3. Work on data storage
  + results are saved to a JSON string. 
  + Implement functions that analyze data?
  + Server interaction?

