// rg to nfa function

var states = "";
var alphabet = "";
var finalState = "";
var array = [];
var table = [];
var wetable = [];

function resetVar() {
	states = "";
	alphabet = "";
	finalState = "";
	array = [];
	table = [];
	wetable = [];
}

function parse() {
	resetVar();
	
	var input = document.getElementById("rg-input").value;
	input = input.replace(/[ \t]/g, "");
	array = input.split(/[->\n]+/);
	
	var str = "";
	//stores all states available
	for (var i = 0; array.length > i; i+= 2) {
		states += array[i];
	}
	
	finalState = states[states.length-1];
	
	for (var i = 1; array.length > i; i+= 2) {
		str += array[i];
		for (var j = 0; states.length > j; j++) {
			str = str.split(states[j]).join("");
		}
	}	
	
	str = str.split("|").join("");
	str += "e";
	
	//stores all alphabet available
	alphabet = str.replace(/(.)(?=.*\1)/g, "");
	
	//formal description output
	var output = '<p>Q = {'+states[0];
	
	for (var i = 1; states.length > i; i++) {
		output += ','+states[i];		
	}
	
	output += '}</p><p>Σ = {'+alphabet[0];
	
	for (var i = 1; alphabet.length > i; i++) {
		output += ','+alphabet[i];		
	}
	
	output += '}</p><p>∂: Q x Σ → Q</p><p>p0 = '+states[0]+'</p><p>F = {'+finalState+'}</p>';
	document.getElementById("formal-description").innerHTML = output;
}

function checkStrings() {
	parse();
	
	var checkInput = document.getElementById("rg-check-input").value;
	checkInput = checkInput.split(/[\n]+/);

	var resultArr = [];
	
	//loop through characters of string until elimination condition is triggered, if no elimination condition is triggered, the string can be accepted by the regular grammar
	for (var i = 0, stateIndex = 0, pass = true; checkInput.length > i; i++, stateIndex = 0, pass = true) {
		for (var j = 0; checkInput[i].length > j; j++) {
			var alphabetIndex = array[stateIndex+1].indexOf(checkInput[i][j]);
			
			if (alphabetIndex != -1) {
				var nextState = array[stateIndex+1][alphabetIndex+1];
				stateIndex = array.indexOf(nextState);
			}
			else {
				pass = false;
				break;
			}
		}
		if (pass && array[stateIndex] == finalState) {
			resultArr.push("OK");
		}
		else {
			resultArr.push("NO");
		}
	}
	
	//check strings result output
	var output = '<br><p></p>';
	
	for (var i = 0; resultArr.length > i; i++) {
		output += '<span>'+resultArr[i]+'</span><br>';
	}
		
	document.getElementById("check-strings-result").innerHTML = output;
}

function toTransition() {
	parse();
	table = Array(states.length).fill().map(() => Array(alphabet.length).fill("Ø"));
	
	for (var i = 0; states.length > i; i++) {
		for (var j = 0; alphabet.length-1 > j; j++) {
			for (var k = 0; array.length+1 > k; k++) {
				if (array[i*2+1][k] == alphabet[j]) {
					if (table[i][j] == "Ø") {
						table[i][j] = array[i*2+1][k+1];
					}
					else if (table[i][j] != array[i*2+1][k+1]) {
						table[i][j] += "," + array[i*2+1][k+1];
					}
				}//if input required is non-epsilon to next state
				else if (k == 0 && states.includes(array[i*2+1][k])) {
					if (table[i][j] == "Ø") {
						table[i][alphabet.length-1] = array[i*2+1][k];
					}
					else if (table[i][alphabet.length-1] != array[i*2+1][k]) {
						table[i][alphabet.length-1] += "," + array[i*2+1][k];
					}
				}//for prevention of k=-1 index from else if below
				else if (!alphabet.includes(array[i*2+1][k-1]) && states.includes(array[i*2+1][k]) && array[i*2+1][k] != "|") {
					if (table[i][j] == "Ø") {
						table[i][alphabet.length-1] = array[i*2+1][k];
					}
					else if (table[i][alphabet.length-1] != array[i*2+1][k]) {
						table[i][alphabet.length-1] += "," + array[i*2+1][k];
					}
				}//if input is not needed to move to next state, or input is epsilon
			}
		}
	}
	
	//transition table output
	var output = '<label>Transition Table</label><table class="table table-bordered"><thead><tr><th scope="col"></th>';
	
	for (var i = 0; alphabet.length - 1 > i; i++) {
		output += '<th scope="col">'+alphabet[i]+'</th>'
	}
	
	output += '<th scope="col">ε</th></tr></thead><tbody>';
	
	for (var i = 0; table.length > i; i++) {
		if (i == 0)
			output += '<tr><th scope="row">>'+states[i]+'</th>';
		else if (table.length - 1 == i)
			output += '<tr><th scope="row">*'+states[i]+'</th>';
		else
			output += '<tr><th scope="row">'+states[i]+'</th>';
		
		for (var j = 0; table[i].length > j; j++) {
			output += '<td>'+table[i][j]+'</td>';
		}
		output += '</tr>'
	}
	
	output += '</tbody></table><button id="convert-nfa-w-btn" type="button" class="btn btn-primary" onclick="toTransitionWE()">To NFA without ε</button>';
	document.getElementById("transition-table").innerHTML = output;
}

function toTransitionWE() {
	toTransition();
	
	for (var i = 0; table.length > i; i++) {
		wetable[i] = table[i].slice();
	}
	
	var epsilonState = [];
	var epsilonNext = [];
	var modified = false;
	
	//check which state has epsilon input and which state it leads to
	for (var i = 0; states.length > i; i++) {
		if (wetable[i][alphabet.length-1] != "Ø") {
			epsilonState.push(states[i]);
			epsilonNext.push(wetable[i][alphabet.length-1]);
		}
	}
	
	//consider state A has epsilon input which leads to state C, if state B has a certain input that leads to state A, state C which can be achieved through epsilon is added beside state A
	for (var i = 0; states.length > i; i++) {
		for (var j = 0; epsilonState.length > j; j++) {
			for (var k = 0; alphabet.length-1 > k; k++) {
				if (wetable[i][k].includes(epsilonState[j]) && !wetable[i][k].includes(epsilonNext[j])) {
					wetable[i][k] += "," + epsilonNext[j];
					modified = true;
				}
			}
		}
		if (modified == true) {
			modified = false;
			i = -1;
			continue;
		}		
	}
	
	//consider state A has epsilon input which leads to state C, union of transition table of state C is perform upon state A
	for (var i = 0; epsilonState.length > i ; i++) {
		var baseRow = states.indexOf(epsilonState[i]);
		var addRow = states.indexOf(epsilonNext[i]);
		
		for (var j = 0 ; alphabet.length-1 > j; j++) {
			var baseRowStates = wetable[baseRow][j];
			var addRowStates = wetable[addRow][j];
			if (baseRowStates == "Ø" && addRowStates != "Ø") {
				wetable[baseRow][j] = wetable[addRow][j];
				modified = true;
			}
			else if (addRowStates != "Ø") {
				baseRowStates += addRowStates;
				baseRowStates = baseRowStates.split(",").join("").split("").sort().join("");
				baseRowStates = baseRowStates.replace(/(.)(?=.*\1)/g, "");
				baseRowStates = baseRowStates.split("").join(",");
				
				if (wetable[baseRow][j] != baseRowStates) {
					wetable[baseRow][j] = baseRowStates;
					modified = true;
				}
			}
		}
		if (modified == true) {
			modified = false;
			i = -1;
			continue;
		}
	}
	
	//remove last column that was originally epsilon
	for (var i = 0; states.length > i; i++) {
		wetable[i].pop();
	}
	
	//transition table w/o eplison output
	var output = '<label>Transition Table W/O ε</label><table class="table table-bordered"><thead><tr><th scope="col"></th>';
	
	for (var i = 0; alphabet.length - 1 > i; i++) {
		output += '<th scope="col">'+alphabet[i]+'</th>'
	}
	
	output += '</tr></thead><tbody>';
	
	for (var i = 0; wetable.length > i; i++) {
		if (i == 0)
			output += '<tr><th scope="row">>'+states[i]+'</th>';
		else if (wetable.length - 1 == i)
			output += '<tr><th scope="row">*'+states[i]+'</th>';
		else
			output += '<tr><th scope="row">'+states[i]+'</th>';
		
		for (var j = 0; wetable[i].length > j; j++) {
			output += '<td>'+wetable[i][j]+'</td>';
		}
		output += '</tr>'
	}
	
	output += '</tbody></table>';
	document.getElementById("transition-table-we").innerHTML = output;
}