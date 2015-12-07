
/* Sample experiment
 *   DOMC TEST
 *   Stimulus(id, type, duration, saveData, listenTo, correctResponse)
 */

// Items

var questions = ["Was ist ein Chronogramm?", "Das Mineral Azurit oder umgangssprachlich Bergblau", "Das Pflanzengift Aconitin"];
var answerOptions = [["Eine römische Inschrift, bei der alle darin vorkommenden Buchstaben, die zugleich römische Zahlensymbole sind, addiert die Jahreszahl des Ereignisses ergeben, auf das sich der Text    bezieht",
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
                  "ist weniger wirksam als das Gift Strychnin."]
                ];



// create experiment
var myExp = new Experiment("#stim");
// create  DOMC item: make duration negative, because this stimulus triggers an explicit event that causes the next stimulus

for (var i = 0; i < questions.length; i++) {
   var tmpStim = new Stimulus("DOMC"+(i+1), "html", -1);
   tmpStim.addDOMC(questions[i], answerOptions[i], myExp.container, ["", "", "", "", ""]);
   myExp.add(tmpStim);
}

for (var i = 0; i < questions.length; i++) {
   var tmpStim = new Stimulus("MC"+(i+1), "html", -1);
   tmpStim.addMC(questions[i], answerOptions[i], myExp.container, ["", "", "", "", ""]);
   myExp.add(tmpStim);
}

$(document).ready(function() {

	myExp.start();

});

