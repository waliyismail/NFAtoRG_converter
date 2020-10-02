// nfa to rg functions
function createTable()
{
    var states = document.getElementById("states");
    var start = document.getElementById("startState");
    var final = document.getElementById("finalState");
    var alphabet = document.getElementById("alphabets");
    var table = document.getElementById("transition-table");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "final";
    cell2.innerHTML = "start";
    var newTable = '';
    var rows = 4;
    var cols = 10;
    for(var r = 0; r < rows; r++)
    {
        newTable += '<tr>';
        for(var c = 1; c <= cols; c++)
        {
            newTable += '<td>' + c + '</td>';
        }
        newTable += '</tr>';
    }
    table.innerHTML = newTable;
    //alert(start)
     //alert("you typed:\nStates: "+ states.value +"\nAlphabet: " + alphabet.value +"\nStart state: " + start.value +"\nFinal state: " + final.value );
}