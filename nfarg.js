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
                // newTable += '<td><input type="text" size="1" id=' + c + '/></td>';
                newTable += '<td>';
                newTable += '<select id="' +r.toString() +c.toString() + '">';
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
    alert("You typed:\nStates: "+ states.value +"\nAlphabet: " + alphabet.value +"\nStart state: " + start.value +"\nFinal state: " + final.value );
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