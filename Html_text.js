// append html text to 
Stimulus.prototype.addHtml = function(text) { // what additional parameters?
	var that = this;
	var draw = function () {
      if (that.experiment.CANVAS_AVAILABLE === true) {
         that.experiment.removeCanvas(); // is html stimulus, canvas must be removed if it does exist
      }
		$(that.experiment.container).html(text);
	};
	that.features.push(draw);
};
