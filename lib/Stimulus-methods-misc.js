
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
