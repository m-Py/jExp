// Store the experiment in a JavaScript object; experiment gets 
// started by method start
function Experiment(container) {
    // add jQuery selector as container. Not id!  
    this.container = container || "body"; 
    // Array stimuli: contains all stimuli of the experiment; add and addBlock
    // push Stimuli to this array. Experiment.start() calls the stimuli that are
    // contained in this array    
    this.stimuli = []; 
    this.nextStim = 0; // keeps track of presented stimuli
    this.CANVAS_AVAILABLE = false;
};

// Create canvas on which the experiment can be shown
Experiment.prototype.createCanvas = function() {
    $(this.container).append("<canvas id='myCanvas' width='" +
    ($(window).width()-30) + "'height= '" + ($(window).height()-30) +
    "'></canvas>");
    this.canvas = document.getElementById("myCanvas");
    this.context = this.canvas.getContext("2d");
    this.CANVAS_AVAILABLE = true;
};
// remove canvas - can be used in experiments where some stimuli are not to be presented on the canvas
// if a stimulus call is accompanied by removing the experimental canvas, the canvas should be restored if it is needed again later
Experiment.prototype.removeCanvas = function() {
    $("#myCanvas").remove();
    this.CANVAS_AVAILABLE = false;
};

// Start the experiment
Experiment.prototype.start = function() {
    this.stimuli[this.nextStim].present();
};

// Add Stimulus to experiment
Experiment.prototype.add = function(stim) {
    stim.experiment = this; // adds experiment as property to the stimulus
    this.stimuli.push(stim);
};

// Clear experimental canvas
Experiment.prototype.clear = function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

// Two functions that operate on the canvas coordinate system - aim is to make the center of the canvas (0,0) coordinate
// add function that takes a coordinate with 0, 0 = center and turns it into html canvas coordinates
Experiment.prototype.getNewX = function(coordinate) {
    return coordinate + this.canvas.width/2;
};

// add function that takes a coordinate with 0, 0 = center and turns it into html canvas coordinates
Experiment.prototype.getNewY = function(coordinate) {
    return this.canvas.height/2 - coordinate;
};

// simple data storing function; uses Stimulus method slimObject
Experiment.prototype.storeData = function() {
    var data = [];
    for (var t = 0; t < this.stimuli.length; t++) {
            data[t] = this.stimuli[t].slimObject();
    }
    data = JSON.stringify(data)
    return data;
};

// create a random rgb color: "rgb(x,y,z)"
var rndCol = function() {
   return("rgb("+Math.floor(Math.random()*256)+","+
   Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
};

// create a random integer, includes passed min and max value
var rndInt = function(min, max) {
   return(Math.floor(Math.random()*(max-min+1))+min);
};

/* 'hack' to save download the experimental data locally by downloading it
 * 
 *  I did not write this function, got it from: http://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
 */

var download = function(strData, strFileName, strMimeType) {
   var D = document,
   A = arguments,
   a = D.createElement("a"),
   d = A[0],
   n = A[1],
   t = A[2] || "text/plain";
   
   //build download link:
   a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);
   
   if (window.MSBlobBuilder) { // IE10
      var bb = new MSBlobBuilder();
      bb.append(strData);
      return navigator.msSaveBlob(bb, strFileName);
   } /* end if(window.MSBlobBuilder) */
   
   if ('download' in a) { //FF20, CH19
      a.setAttribute("download", n);
      a.innerHTML = "downloading...";
      D.body.appendChild(a);
      setTimeout(function() {
         var e = D.createEvent("MouseEvents");
         e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
         a.dispatchEvent(e);
         D.body.removeChild(a);
      }, 66);
      return true;
   }; /* end if('download' in a) */
   
   //do iframe dataURL download: (older W3)
   var f = D.createElement("iframe");
   D.body.appendChild(f);
   f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
   setTimeout(function() {
      D.body.removeChild(f);
   }, 333);
   
   return true;
};


var rndShuffleArray = function(array) {
    // randomly shuffle the numbers 0 to array.length-1 
    // these numbers are the indices
    var random_sequence = [];
    for (var i = 0; i < array.length; i++) {
        if (random_sequence.length === 0) {
            var rnd = Math.floor(Math.random()*array.length);
            random_sequence.push(rnd);
        }
        else if (random_sequence.length > 0) {
            var rnd = Math.floor(Math.random()*array.length);
            while (random_sequence.indexOf(rnd) != -1) { 
                var rnd = Math.floor(Math.random()*array.length);
            }
            random_sequence.push(rnd);
        }
    }
    
    // create new array, in which the randomized indeces from 
    // random_sequence are used
    var shuffledArr = [];
    for (var t = 0; t < array.length; t++) {
        shuffledArr[t] = array[random_sequence[t]];
    }
    return shuffledArr;
};
/* 
   This file contains Stimulus methods that define its appearance and
   function. This file contains stimulus methods that rely on the html 
   canvas element.
   When instantiated, a Stimulus will only delay an experiment for the duration 
   of its duration, but will not do anything else. For the stimulus to function
   in the desired way, features need to be added by using the methods 
   in this file. Feature adding methods define the appearance of a stimulus, 
   or add experimental utility.
   
   * Examples:
   * addFeature() takes a function as argument and executes it when the Stimulus is called
   * The addText() method will add text to the Stimulus to be shown on screen

   * Feature adding methods should have names like addAppearance or addUtility. 
   * They must contain a function containing code to be executed when the 
   stimulus is presented. This function must get pushed to the `features` 
   array property of the Stimulus.
*/

// add a text that is displayed on the screen
Stimulus.prototype.addText = function(text, size, color, x, y) {
    var that = this;
    var draw = function () {
        if (that.experiment.CANVAS_AVAILABLE === false) {
            that.experiment.createCanvas();
        }
        var x_Cor = that.experiment.getNewX(x) || that.experiment.canvas.width/2;
        var y_Cor = that.experiment.getNewY(y) || that.experiment.canvas.height/2;			
        that.experiment.context.font = (""+size + "px Arial") || "30px Arial";
        that.experiment.context.fillStyle = color || "black";
        that.experiment.context.textAlign = "center";
        // trying to vertically align text
        that.experiment.context.fillText(text, x_Cor, (y_Cor+size/2.5) ); 
    };
    that.features.push(draw);
};

// add a fixation cross to the center of the experimental canvas
Stimulus.prototype.addCross = function(size, width) {
    var that = this;
    var draw = function() {
        if (that.experiment.CANVAS_AVAILABLE === false) {
          that.experiment.createCanvas();
        }
        that.experiment.context.beginPath();
        that.experiment.context.lineWidth = width;
        // horizontal line
        that.experiment.context.moveTo((that.experiment.canvas.width/2) +
        size/2, (that.experiment.canvas.height/2));
        that.experiment.context.lineTo((that.experiment.canvas.width/2) -
        size/2, (that.experiment.canvas.height/2));
        // vertical line
        that.experiment.context.moveTo((that.experiment.canvas.width/2),
                                       (that.experiment.canvas.height/2) +
                                       size/2);
        that.experiment.context.lineTo((that.experiment.canvas.width/2),
                                       (that.experiment.canvas.height/2) -
                                       size/2);
        that.experiment.context.stroke();
    };
    that.features.push(draw);	
};


// append html text to 
Stimulus.prototype.addHtml = function(text) { // what additional parameters?
    var that = this;
    var draw = function () {
        if (that.experiment.CANVAS_AVAILABLE === true) {
            that.experiment.removeCanvas(); 
        }
        $(that.experiment.container).html(text);
   };
   that.features.push(draw);
};

// returns a slim Stimulus object, that does not contain functions, 
// the pointer to the experiment and arrays as values
Stimulus.prototype.slimObject = function() {
    data = {};
    for (key in this) {
        if (this[key] !== undefined) {
            if (this[key].constructor.name !== "Function" &&
              this[key].constructor.name !== "Experiment" &&
              this[key].constructor.name !== "Array") {
                data[key] = this[key];
            }
        }
    }
    return data;
};

// Stimulus: basic experimental unit
// Stimulus constructor
function Stimulus(id, type, duration, saveData, listenTo, correctResponse) {
    
    /* throw some errors that can occur when a Stimulus is instantiated
    if (id === undefined) {
        throw "error: created object of type Stimulus must have 'id' property";
    }
    else if (typeof id  !== "string" ) {
        throw "error: Stimulus 'id' must be a string";
    }
    
    if (duration === undefined) {
        throw "error: created object of type Stimulus must have 'duration'" +
        "property ";
    }
    else if (typeof duration  !== "number" ) {
        throw "error: property 'duration' of created Stimulus must be a number";
    }	
    
    if (saveData !== undefined) {
        if (saveData.constructor.name !== "Boolean") {
            throw "error: saveData parameter of created Stimulus object must be Boolean or left out";
        }
    }
    
    if (listenTo !== undefined) {
        if (listenTo.constructor.name !== "Array") {
            throw "error: listenTo parameter of created Stimulus object must either be 'Array' or left out";
        }
    }
    
    if (correctResponse !== undefined) {
        if (typeof correctResponse !== "number") {
            throw "error: correctResponse parameter of created Stimulus object must either be 'number' or left out";
        }
    }
    */
    
    // each instantiated Stimulus needs an id:
    this.id = id; 
    // must be: 'html' or 'canvas', defaults to canvas
    this.type = type || 'canvas'; 
    // presentation time of the stimulus. Specify in ms (can be negative!)
    this.duration = duration;
    // logical - should response be stored?
    this.saveData = saveData || false;
    // array containing the allowed keypresses (default: all allowed)
    this.listenTo = listenTo || [];
    // which is the correct response?
    this.correctResponse = correctResponse; 
    this.RT; // written to by listen() if saveData === true; response time
    // written to by listen() if saveData === true; which response was given
    this.event; 
    // written to by listen() if saveData === true; correctness of response    
    this.correct;
    // array containing functions that are called when the stimulus is called 
    this.features = []; 
    // points to the Experiment object which calls all Stimuli in a 
    //sequential fashion. This property is added to the stimulus, when it 
    // is added to an Experiment via .add()
    this.experiment; 

}
// Call all functions that are contained in the Stimulus.features array - this is how the functionality of the Stimulus is realized
Stimulus.prototype.showStimulus = function() {
    for (var i = 0; i < this.features.length; i++) {
        this.features[i](); // show all Stimulus features
    }
};
// store reactions and reaction time
// listen() in its current form is deprecated and will not work - is to be reworked
Stimulus.prototype.listen = function () {
    var that = this; // save reaction time value into RT property of each object
    var RT = 0;
    var t0 = performance.now(); // take initial time stamp
    // default: if no response is made, the correctness is not evaluated
    that.correct = undefined;  
    
    var recordResponse = function(key, rt) {
        $(document).off();
        that.event = key; // store key pressed as stimulus property
        that.RT = RT;
        if (that.event === that.correctResponse) {
            that.correct = 1;
        }
        else {
            that.correct = 0;
        }
    };
    $(document).off();
    $(document).on("keypress click", function(e) {
        // get RT and event
        RT = performance.now() - t0;
        event = e.which;
        console.log(event);
        // store reaction time and response
        // if no allowed response was specified: just record any 
        // key press that comes
        if (!that.listenTo) { 
            recordResponse(event);
        }
        else { // define listening to specific key
            for (var i = 0; i < that.listenTo.length; i++) {
                if (e.which === that.listenTo[i]) {
                        recordResponse(event);
                }
            }
        }
});
};

// present() is called for each experiment Stimulus in sequential order
// shows stimulus, records response (currently not working), removes it after `duration` and calls the next Stimulus
Stimulus.prototype.present = function() {
    this.experiment.nextStim++; // index that points to 
    // 1) show the stimulus
    this.showStimulus();
    // 2) listen to reaction
    if (this.saveData === true) {
        this.listen();
    }
    // 3a) remove stimulus after its specified duration
    if (this.duration > 0) {
        this.waitCountdown(this.duration);
    }
    // 3b) OR: remove after event has occured
    else if (this.duration === 0) {
        this.waitEvent();
    }
   // this leaves the possibility for negative numbers if showNext is to 
   // be called directly
};
// waitCountdown: remove Stimulus after Stimulus.duration 
Stimulus.prototype.waitCountdown = function(duration) {
    var that = this;	
    var timeLeft = duration/10;
    var countdown = setInterval(function() {
        timeLeft--; // countdown
        if (timeLeft <= 0) {
            clearInterval(countdown);
            that.showNext(); // call next stimulus in Experiment
        }
    }, 10); // timing precision of 10ms
};
// waitEvent: remove stimulus after a certain event has occured (if Stimulus.duration === 0!)
// TO DO: implement more possibilies than just keypress and mouse click
Stimulus.prototype.waitEvent = function() {
    that = this;
    $(document).on("keypress click", function(e) {
        if (that.listenTo[0] !== undefined) { // allowed keys are specified
            // check if pressed key was allowed
            for (var i = 0; i < that.listenTo.length; i++) {
                if (e.which === that.listenTo[i]) {
                    $(document).off();
                    that.showNext();
                }
            }
        } else {
            $(document).off();
            that.showNext();
        }
    });
};
// function: show next stimulus of experiment
Stimulus.prototype.showNext = function() {
    // clear canvas if there is one
    if (this.experiment.CANVAS_AVAILABLE === true) {
        this.experiment.clear();
    }
    // show next stimulus; only show next if there is a next stimulus
    if (this.experiment.nextStim < this.experiment.stimuli.length) {
        this.experiment.stimuli[this.experiment.nextStim].present();
    }
};
