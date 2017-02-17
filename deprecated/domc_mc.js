// stimulus property that presents a DOMC item
// to do: data storage
// change the way option counter i is handled
// change endAfterSolution implementation 
// (esp: false click function, it's horrible right now)
Stimulus.prototype.addDOMC  = function(question, options, container, save_variables, endAfterSolution) {
   
   var endAfterSolution = (endAfterSolution !== false); // abort item presentation after the solution has been shown?
   var that = this;

   var DOMC_Item = function() {
   
   if (that.experiment.CANVAS_AVAILABLE === true) {
      that.experiment.removeCanvas(); // is html stimulus, canvas must be removed
   }
      
   var startItem = function() {
      // present question and first option
      $("#question").html("<h3>" + question + "</h3>");
      $("#optionDOMC").html(present_sequence[i]);      
   };
      
   var next_option = function(option) {
      $("#optionDOMC").html(option).show();
      // $("#true, #false").css('opacity', '0.5');
      clickable = 1;
   };
   var next_question = function() {
      $("#bigwrap").remove()
      that.showNext(); // directly adresses the showNext function; this function has an explicit event that triggers the next stimulus!
   };
   
   var saveData = function(correctness, optionAccepted) {
      if (optionAccepted) {
         selectedOption = present_sequence[i];
      } else {
         selectedOption = "keine Option ausgewählt";
      }
      i++;
      $("#saveMe_1").html('<input type='+saveThis+' name ='+save_variables[0]+' value="'+correctness+'" />');
      $("#saveMe_2").html('<input type='+saveThis+' name ='+save_variables[1]+' value="'+selectedOption+'" />');
      // console.log('Anzahl Optionen gesehen: '+i);
      $("#saveMe_3").html('<input type='+saveThis+' name ='+save_variables[2]+' value="'+i+'" />');
      // console.log('Position der Lösung: '+position);
      $("#saveMe_4").html('<input type='+saveThis+' name ='+save_variables[3]+' value="'+position+'" />');
      // console.log('Reihenfolge der Alternativen: '+present_sequence);
      $("#saveMe_5").html('<input type='+saveThis+' name ='+save_variables[4]+' value="'+present_sequence+'" />');
   };
   // initializes some variables
   var i = 0;                                             // index for targeting answer options
   var present_sequence = rndShuffleArray(options);       // randomized option sequence
   var position = $.inArray(options[0], present_sequence) // which is the solution position?
   var number_options = present_sequence.length;          // number of answer options
   var clickable = 1;                                     // are response buttons clickable?
   var saveThis = "hidden";                               // hide text fields which contain to be saved data

   // build the DOM elements that contain the item
   $(container).html('' +

      ' <div id="bigwrap"> ' +
      '   <div id="question"></div> ' +
      '   <div id="optionDOMC"></div> ' +
      '   <div id="wrap"> ' +
      '     <div id="true" style="cursor:pointer">Stimmt</div> ' +
      '     <div id="fill"></div> ' +
      '     <div id="false" style="cursor:pointer">Stimmt nicht</div> ' +
      '   </div> ' +
      ' </div> ' +


      ' <div id="saveMe_1"></div> ' +
      ' <div id="saveMe_2"></div> ' +
      ' <div id="saveMe_3"></div> ' +
      ' <div id="saveMe_4"></div> ' +
      ' <div id="saveMe_5"></div> ');

   // define functionality of DOMC item by defining button functionality
   $("#true").click(function() {
      if (clickable === 1) {
         clickable = 0;
         $("#optionDOMC").html("<span style='color:transparent'>------</span>");
         if (present_sequence[i] === options[0]) { // case: option is solution - correct response
            var correct = 1;
         }
         else { // case: option is not solution
            var correct = 0;
         }
         // save data - option presentation stops
         saveData(correct, true);
         setTimeout(next_question, 500);
      }
   });
      
      // rework this function!
	   $("#false").click(function() {
	      if (clickable === 1) {
	         clickable = 0;
	         if (present_sequence[i] === options[0]) { // option is solution - presentation stops
	            $("#optionDOMC").html("<span style='color:transparent'>------</span>");
               if (endAfterSolution === true) {
                  $("#optionDOMC").html("<span style='color:transparent'>------</span>");
                  var correct = 0;
                  saveData(correct, false);
                  setTimeout(next_question, 500);
               }
               else {
                  i++;
                  setTimeout(next_option, 500, present_sequence[i]);
               }
	         }
	         else { //Option ist nicht Lösung
	            $("#optionDOMC").html("<span style='color:transparent'>------</span>");
	            i++;
	            setTimeout(next_option, 500, present_sequence[i]);
	         }
            if (i === options.length) {
               $("#optionDOMC").html("<span style='color:transparent'>------</span>");
	            i++;
	            setTimeout(next_question, 500, present_sequence[i]);
            }
	      }
	   });
	
	   // show effect if mouse is in response field
	   $("#true, #false").mouseenter(function() {
	       $(this).css('opacity', '1');
	   });
	   $("#true, #false").mouseleave(function() {
	       $(this).css('opacity', '0.5');
	   });
      
      startItem();
	};

	that.features.push(DOMC_Item);

};


// stimulus property that presents a MC item
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
   
      var saveData = function() { // this is to be reworked
         $("#saveMe_1").html('<input type='+saveThis+' name ='+save_variables[0]+' value="'+correct+'" />');
         $("#saveMe_2").html('<input type='+saveThis+' name ='+save_variables[1]+' value="'+selected+'" />');
      };
      var next_question = function() {
         that.showNext();
      };
   
      $("#continue").click(function() {
         if (clickable === 1) {
            clickable = 0;
            $("#bigwrap").remove();
            saveData();
            setTimeout(next_question, 500);
         }
      });
   };
   
   that.features.push(MC_Item);

};
