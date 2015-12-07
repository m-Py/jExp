
/* Sample experiment
 *   DOMC TEST
 *   Stimulus(id, type, duration, saveData, listenTo, correctResponse)
 */

// Items

var questions = ["Was ist ein Chronogramm?", "Das Mineral Azurit oder umgangssprachlich Bergblau", "Das Pflanzengift Aconitin", 
                 "Womit wurde der 30-jährige Krieg beendet?", "Auf welcher Insel ist der Silberfederkaktus beheimatet?"];
// end after showing the solution?
var solutionEnd = [true, true, true, true, false];

var answerOptions = [
                     ["Eine römische Inschrift, bei der alle darin vorkommenden Buchstaben, die zugleich römische Zahlensymbole sind, addiert die Jahreszahl des Ereignisses ergeben, auf das sich der Text    bezieht",
                     "Ein griechisches Verzeichnis von Sternbildern",
                     "Eine Aufzeichnung der Sonnenstände im Jahresverlauf",
                     "Eine Schriftrolle mit Aufzeichnungen einer Sonnenuhr"],
                     ["ist ein häufig vorkommender Vertreter der Klasse der Carbonate.",
                     "wird ausschließlich im Süden der Insel Madagaskar abgebaut.",
                     "wird ohne Ausnahme in der Nähe von Wasserfällen gefunden.",
                     "ist das einzige Exportgut des Staates Papua-Neuguinea."],
                     ["ist noch wirksamer als das Gift Strychnin.",
                     "ist bei einer Dosis von 0,1 Milligramm tödlich.",
                     "führt bei der Einnahme zu einem erhöhten Puls.",
                     "ist weniger wirksam als das Gift Strychnin."],
                     ['Westfälischer Friede', 'Versailler Vertrag', 'Edikt von Nantes', 'Wiener Kongress', 'Friedensbündnis Maas-Rhein']   ,                  
                     ['Sumatra', 'Madagaskar', 'Borneo', 'Neuguinea', 'Java']

                    ];



// create experiment
var myExp = new Experiment("#stim");
// create  DOMC item: make duration negative, because this stimulus triggers an explicit event that causes the next stimulus
var minipause = new Stimulus("pause", "html", 500);
for (var i = 0; i < questions.length; i++) {
   var tmpStim = new Stimulus("DOMC"+(i+1), "html", -1);
   tmpStim.addDOMC(questions[i], answerOptions[i], myExp.container, ["", "", "", "", ""], solutionEnd[i]);
   myExp.add(tmpStim);
   myExp.add(minipause);
}

for (var i = 0; i < questions.length; i++) {
   var tmpStim = new Stimulus("MC"+(i+1), "html", -1);
   tmpStim.addMC(questions[i], answerOptions[i], myExp.container, ["", "", "", "", ""]);
   myExp.add(tmpStim);
}

// at last, show all items with solution (if available)
var text = "<div class='moep'>";
for (var i = 0; i < questions.length; i++) {
   text = text + "<p><h2>" + questions[i] + "</h2></p>";
   var answers = "<div class ='options'>";
   for (var t = 0; t < answerOptions[i].length; t++) {
      if (t === 0 && solutionEnd[i]) {
         answers = answers + "<p><strong>" + (t+1) + ". " + answerOptions[i][t] + "*</strong></p>";
      }
      else {
         answers = answers + "<p>" + (t+1) + ". " + answerOptions[i][t] + "</p>";
      }
   }
   answers = answers + "</div>";
   text = text + answers;
}
text = text + "</div>";

var endStim = new Stimulus("results", "html", -1);
endStim.addHtml(text);
myExp.add(endStim);

$(document).ready(function() {

	myExp.start();

});

