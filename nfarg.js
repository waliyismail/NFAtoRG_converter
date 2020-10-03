// nfa to rg functions
function createTable()
{
    var fdform = document.getElementById("fdform");
    //if(!checkform(fdform)){return};
    var states = document.getElementById("states");
    var states_array = getArray(states.value);
    var start = document.getElementById("startState");
    var final = document.getElementById("finalStates");
    var final_array = getArray(final.value);
    var alphabet = document.getElementById("alphabets");
    var alphabet_array = getArray(alphabet.value);
    if(!alphabet_array.includes("&epsilon;")){alphabet_array.push("&epsilon;");}
    var table = document.getElementById("transition-table");
    var tt = document.getElementById("tt");
    var tablebut = document.getElementById("ttbut");


    var newTable = '';
    var rows = states_array.length + 1;
    var cols = alphabet_array.length + 1;
    // create a transition table based on the user input
    for(var r = 0; r < rows; r++)
    {
        newTable += '<tr>';
        for(var c = 0; c < cols; c++)
        {
            if(r==0 && c==0)
            {
                //empty cells in (0,0)
                newTable += '<td class="table-dark"></td>';
                continue;
            }
            if(c==0)
            {
                //enter each states
                // check if it is start or final states
                newTable += '<td><b>'
                if(states_array[r-1] == start.value)
                {
                    // add > for start state
                    newTable += '&#62;';
                }
                
                if(final_array.includes(states_array[r-1]))
                {
                    // add * for final state
                    newTable += '*';
                }

                newTable += states_array[r-1].toUpperCase()+'</b></td>';
                continue;
            }
            if(r == 0 && c > 0)
            {
                newTable += '<td><b>' + alphabet_array[c-1] +'</b></td>';
            }else{
                // add dropdown containing the states
                // id for each cells SA states alphabet
                newTable += '<td>';
                newTable += '<select id="' +states_array[r-1]+alphabet_array[c-1]+ '">';
                newTable += addOption(states_array);
                // add Oslash
                newTable+='<option selected value="empty">&Oslash;</option>';
                newTable += '</select>'
                newTable += '</td>';
                //add options for states
            }
        }
        newTable += '</tr>';
    }
    table.innerHTML = newTable;

    tt.removeAttribute("hidden");
    tablebut.innerText = "Refresh table";
;    alert("Your input:\nStates: "+ states.value +"\nAlphabet: " + alphabet.value +"\nStart state: " + start.value +"\nFinal state: " + final.value );
}

function checkform(form) {
    // get all the inputs within the submitted form
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        // only validate the inputs that have the required attribute
        if(inputs[i].hasAttribute("required")){
            if(inputs[i].value == ""){
                // found an empty field that is required
                alert("Please fill all fields");
                return false;
            }
        }
    }
    return true;
}

function getArray(str)
{
    // remove all whitespace
    var newstr;
    newstr = str.replace(/\s/g,"$");
    newstr = newstr.replace(/epsilon/,"&epsilon;");
    newstr = newstr.split("$");
    return newstr;
}

function addOption(array)
{
    //add option from the array
    var str = '';
    for(a in array)
    {
        str+='<option value="'+array[a]+'">'+(array[a]).toUpperCase()+'</option>';
    }
    return str;
}
function done(){
    alert("go check string first");
}

function checkString()
{
    var fdform = document.getElementById("fdform");
    //if(!checkform(fdform)){return};
    var text = document.getElementById("stringCheck").value;
    var strings = text.split(/\r?\n/);
    //check from the table and move from next state
    for(s in strings)
    {
        if(s!=null && acceptString(strings[s],0,0 ))
        {
            console.log(strings[s] +" is ok");
        }
        else
        {
            console.log(strings[s] +" is no");
        }
    }
}
function convertToRg()
{
    var states = getArray(document.getElementById("states").value);
    var finalStates = getArray(document.getElementById("finalStates").value);

}
function acceptString(str, alph_i, state_i)
{
        // if the char is the end of string
        var states = getArray(document.getElementById("states").value);
        var finalStates = getArray(document.getElementById("finalStates").value);
        
        var cell = document.getElementById(states[state_i] + str[alph_i]);
        var cellValue = cell.options[cell.selectedIndex].value;
        // console.log(states);
        // console.log(finalStates);
        // console.log(cellValue);
        if (cellValue === "empty") return false;
        
        if(str.length == alph_i + 1)
        {
            //last alphabet must be in final states
            if (finalStates.includes(cellValue)) return true;
        }
        // not a last string 
        return acceptString(str, alph_i+1, states.indexOf(cellValue));
}