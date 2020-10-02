// nfa to rg functions
function createTable()
{
    var states = document.getElementById("states");
    var states_array = (states.value).split(" ");
    var start = document.getElementById("startState");
    var final = document.getElementById("finalStates");
    var alphabet = document.getElementById("alphabets");
    var table = document.getElementById("transition-table");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var done = document.getElementById("doneBut");
    cell1.innerHTML = "final";
    cell2.innerHTML = "start";
    var newTable = '';
    var rows = 5;
    var cols = states_array.length + 1;
    // create a transition table based on the user input
    for(var r = 0; r < rows; r++)
    {
        newTable += '<tr>';
        for(var c = 1; c <= cols; c++)
        {
            newTable += '<td><input type=\"text\" id=\"' + c + '\"/></td>';
        }
        newTable += '</tr>';
    }
    table.innerHTML = newTable;
    done.removeAttribute("hidden");
    alert("you typed:\nStates: "+ states.value +"\nAlphabet: " + alphabet.value +"\nStart state: " + start.value +"\nFinal state: " + final.value );
}