$(function() {
    $('#table').bootstrapTable()
})
  
$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var subject-code= button.data('subject-code') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var subject-name= button.data('subject-name')
  var subject-level= button.data('subject-level')
  var lecture-hours= button.data('lecture-hours')
  var tutorial-hours= button.data('tutorial-hours')
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

$('#editModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var subject-code= button.data('subject-code') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var subject-name= button.data('subject-name')
  var subject-level= button.data('subject-level')
  var lecture-hours= button.data('lecture-hours')
  var tutorial-hours= button.data('tutorial-hours')
  var modal = $(this)
  modal.find('.modal-title').text('Edit subject')
  modal.find('.modal-body input').val(recipient)
  alert(subject-name);

})

function convertla ()
{
  window.alert("hello!!!");
}
function check() 
{
  alert("helhhlo!!!")
}