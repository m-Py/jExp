

- I decided to make the HTML canvas element the basis for stimulus presentation. This way it is possible to create stimuli in the way that you would create stimuli in other experimental design software (e.g. OpenSesame)
- You do not need to worry about DOM manipulation when you try to position your stimuli, which is a rather unprecise and annoying thing to do. Using the canvas, it is possible to specify the coordinates, where your stimulus is to be presented. In my experience, you need to use a lot of CSS tricks to get elements in your browser, where you want them to be. These tricks are usually not "logical" or intuitive. jExp ignores CSS completely and solely focusses on JavaScript.
- The canvas is loaded only once in the beginning of the experiment; it belongs to the Experiment object, rather than belonging to each Stimulus object.
- After a stimulus has been presented, the canvas is cleared of all elements; the original canvas element never gets removed during the experiment
- timing precision of stimulus presentation is at 10ms
- stimulus timing is achieved via using setInterval() 
- For stimulus positioning the HTML canvas element is used. 
- For response collection, I use the jQuery method on(). 
- Response time is measured via performance.now().

