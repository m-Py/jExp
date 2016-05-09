# jExp

**jExp is a JavaScript framework that will enable you to run psychological experiments in your browser.**

At the moment it is in developement and can be used to control the timing and display of plain html and html canvas stimuli in a browser. However, the reaction time and event recording is not yet fully implemented. If you are looking for a more mature platform to program your browser experiments in, consider <a href="http://www.jspsych.org/ target="_blank">jspsych</a>.


## TO DO
### major problems

- fix bug that causes experiment canvas height larger than window height -- this is probably a browser side problem
- i reduced size by 30px, but there must be a better way (or is there?)


### to be worked on

0. implement html features and refine integration with canvas
  + first: finalize DOMC and MC items (especially data storage! it is still like in Unipark)
  + modularize data storage, presentation, and integration with the jExp environment!
1. pack everything into a proper namespace and reduce possible name space conflicts (see http://learn.jquery.com/using-jquery-core/avoid-conflicts-other-libraries/)
2. Make Stimulus.waitEvent() more flexible
  + add callbacks that can react on any user-defined events!
  + solution: call showNext directly from within Stimulus method! (current solution: set duration to negative number so that the timer does not run out)
3. Add possibility to insert images (might only work in 'html' mode
5. Set up Wiki and a tutorial
6. (see 2) implement possibility to use canvas OR html presentation, with canvas being default
  + make this a Stimulus property; presentationType = "canvas" (default) or "html"
7. add accessible API, which can be used to append functions to stimuli; these functions MUST habe access to Experiment and Stimulus properties!
8. what are jExp differences to jsPsych?
  
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
