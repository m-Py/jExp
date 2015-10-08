
// create a random rgb color: "rgb(x,y,z)"
var rndCol = function() {
	return("rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
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
	// these numbers are the indeces
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
	
	// create new array, in which the randomized indeces from random_sequence are used
	var shuffledArr = [];
	for (var t = 0; t < array.length; t++) {
		shuffledArr[t] = array[random_sequence[t]];
	}
		
	return shuffledArr;
};
