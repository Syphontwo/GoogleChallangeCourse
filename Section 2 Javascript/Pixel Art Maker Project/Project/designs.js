var color = $('#colorPicker');
var height = $('#inputHeight');
var width = $('#inputWidth');

function makeGrid() {
  //makegrid also clears the canvas
  $('#pixelCanvas').empty();
  var singleRow = $('<tr>'); //get a jquery object started for teh cells

  //set the cells for each column
  for (i = 0; i < width.val(); i++) {
    singleRow.append('<td class="cell"></td>')
  }

  //add each row using the previously setup object
  for (i = 0; i < height.val(); i++) {
    $('#pixelCanvas').append(singleRow.clone()); //have to clone it
  }
}

//This is a seperator from the make grid commands to ensure that the
//browsern behaves as expected after building the grid
function formSubmit(evt) {
  makeGrid();
  evt.preventDefault(); //Do not refresh the page (as some browsers might)
}

function changeColor(eventArgs) {
  //if it is a click or the mouse is down on a mouse enter event
  //also make sure that the item firing the event is a cell
  if (mouseIsDown || (eventArgs.type === 'click' && $(eventArgs.target).hasClass('cell'))){
    //set a color attribute to teh selected color
    $(eventArgs.target).attr('style', "background-color:" + color.val());
  }
}

function init() {
  //give it a starting grid to work in
  height.val(10);
  width.val(10);

  //submission event
  $('#sizePicker').submit(formSubmit);

  //These events track if the mouse is down so the suer can have a
  //drag interface when drawing on the canvas
  $(document).mousedown(function(){mouseIsDown = true;})
  $(document).mouseup(function(){mouseIsDown = false;})

  //click event for changing the color
  $('#pixelCanvas').on('click', changeColor);
  //mouse enter event for click + drag coloring
  $('#pixelCanvas').on('mouseenter', '*', changeColor);
}

//keep track of mouse state for drag and color functionality
var mouseIsDown = false;

$(init);
