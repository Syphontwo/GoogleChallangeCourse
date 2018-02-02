function updateCanvas(){
  var CellsSetting = Math.max($('.selectionForm input[name=cells]').val(), 1);
  var rows = setRows(CellsSetting);
}

function setRows(desiredRows){
  if ($('.rowBlock').length == false){
    $('.canvas').append("<div class='rowBlock'></div>");
  }

  while($('.rowBlock').length < desiredRows){
      $('.canvas').append("<div class='rowBlock'></div>");
    }

  while($('.rowBlock').length > desiredRows){
    $('.rowBlock').last().remove();
  }

  var setCells = function(){
    var row = $(this);
    var columns = row.find('.columnCell').length ? row.find('.columnCell').length : 0;

    while(columns < desiredRows){
      row.append("<span class='columnCell cellBorder'></span>");
      row = $(this);
      columns = $(this).find('.columnCell').length;
    }

    while(columns > desiredRows){
      row.find('.columnCell').last().remove();
      row = $(this);
      columns = $(this).find('.columnCell').length;
    }
  };

  $('.rowBlock').each(setCells);

  return $('.rowBlock');
}

function changeColor(eventArgs){
  if (mouseIsDown){
    $(eventArgs.target).attr('style', "background-color:" + $('.selectionForm input[name=color]').val());
    if($(eventArgs.target).hasClass("cellBorder")){
       $(eventArgs.target).removeClass("cellBorder");
       $(eventArgs.target).addClass("clearBorder");
    }
  }
}

function init(){
  $('.selectionForm input[name=cells]').change(updateCanvas);
  $(document).mousedown(function(){mouseIsDown = true;})
  $(document).mouseup(function(){mouseIsDown = false;})

  $('.canvas').on('mouseenter', '*', changeColor);

  $('.selectionForm input[name=cells]').val(50);
  $('.selectionForm input[name=color]').val('#6B5B95');

console.log('start');
  $('.loadingMessage').remove();
  updateCanvas();
}

var mouseIsDown = false;

$(init);
