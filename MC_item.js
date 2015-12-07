// stimulus property that presents a DOMC item
// to do: data storage
Stimulus.prototype.addMC  = function(question, options, container, save_variables) {

	var that = this;

	var MC_Item = function() {

      if (that.experiment.CANVAS_AVAILABLE === true) {
         that.experiment.removeCanvas(); // is html stimulus, canvas must be removed
      }
    
      var saveThis = "hidden";
   
      var present_sequence = rndShuffleArray(options);
   
      // write question and answer options
      $(container).html('' +
         ' <div id="bigwrap"> ' +
         '   <div id="question"> <h3> '+ question +' </h3></div> ' +
         '   <div id="mcwrap"></div> ' +
         '   <div id="continue">Weiter</div> ' +
         ' </div> ' +
   
         ' <div id="saveMe_1"></div> ' +
         ' <div id="saveMe_2"></div> ');
   
   
      var option_divs = "";
   
      for (var i = 0; i < options.length; i++) {
         option_divs+= ' <div class="together" value="'+present_sequence[i]+'"> ' +
                           ' <input type="radio" value="'+present_sequence[i]+'" class ="radioButt" style ="margin-right:10px" /> ' +
                           ' <div class ="mc_option"> '+ present_sequence[i] +' </div> ' +
                              ' </div> ';
      }
   
      $("#mcwrap").append(option_divs);
   
      // initialize some required variables
      var clickable = 1;
      var correct = 0;
      var selected = "";
   
       $(".together").click(function() {
         if (clickable === 1) {
            selected = $(this).attr("value");
            $( ".radioButt" ).prop( "checked", false);
            $( ".radioButt[value='"+selected+"']").prop( "checked", true);
            if ( selected === options[0] ) {
               correct = 1;
            } else {
               correct = 0;
            }
            $("#continue").show();
         }
       });
   
      var saveData = function() {
         $("#saveMe_1").html('<input type='+saveThis+' name ='+save_variables[0]+' value="'+correct+'" />');
         $("#saveMe_2").html('<input type='+saveThis+' name ='+save_variables[1]+' value="'+selected+'" />');
      };
      var next_question = function() {
         that.showNext();
      };
   
      $("#continue").click(function() {
         if (clickable === 1) {
            clickable = 0;
            $("#bigwrap").hide();
            saveData();
            setTimeout(next_question, 500);
         }
      });
   };
   
   that.features.push(MC_Item);

};
