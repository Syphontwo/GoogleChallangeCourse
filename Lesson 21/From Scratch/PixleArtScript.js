function updateCanvas(){
  var CellsSetting = Math.max($('.selectionForm input[name=cells]').val(), 1);
  var rows = setRows(CellsSetting, CellsSetting, $('#userArt'));
}

function setRows(desiredRows, desiredColumns, baseElement){
  if ($(baseElement).find('.rowBlock').length == false){
    $(baseElement).append("<div class='rowBlock'></div>");
  }

  while($(baseElement).find('.rowBlock').length < desiredRows){
      $(baseElement).append("<div class='rowBlock'></div>");
    }

  while($(baseElement).find('.rowBlock').length > desiredRows){
    $(baseElement).find('.rowBlock').last().remove();
  }

  var setCells = function(){
    var row = $(this);
    var columns = row.find('.columnCell').length ? row.find('.columnCell').length : 0;

    while(columns < desiredColumns){
      row.append("<span class='columnCell cellBorder'></span>");
      row = $(this);
      columns = $(this).find('.columnCell').length;
    }

    while(columns > desiredColumns){
      row.find('.columnCell').last().remove();
      row = $(this);
      columns = $(this).find('.columnCell').length;
    }
  };

  $(baseElement).find('.rowBlock').each(setCells);

  return $(baseElement).find('.rowBlock');
}

function changeColor(eventArgs){
  if (mouseIsDown || (eventArgs.type === 'click' && $(eventArgs.target).hasClass('columnCell'))){
    $(eventArgs.target).attr('style', "background-color:" + $('.selectionForm input[name=color]').val());
    if($(eventArgs.target).hasClass("cellBorder")){
       $(eventArgs.target).removeClass("cellBorder");
       $(eventArgs.target).addClass("clearBorder");
    }
  }
}

function titleArt(){
  var rows = setRows(5, 33, $('#titleArt'));
  randomTitle();
}

function randomTitle(){
  var colorR = Math.floor((Math.random() * 256));
  var colorG = Math.floor((Math.random() * 256));
  var colorB = Math.floor((Math.random() * 256));
  var color = "background-color:" + "rgb(" + colorR + "," + colorG + "," + colorB + ")";
  var pixelRows = $('#titleArt').find('.rowBlock');
  var setColor = function(cells){
    $(cells).attr('style', color);
  }

  //row by row set of title colors to say "pixel art"
  var columnsCells = $(pixelRows.get(0)).find('.columnCell');
  setColor([columnsCells[0],columnsCells[1],columnsCells[2],columnsCells[4], columnsCells[5], columnsCells[6], columnsCells[8], columnsCells[10], columnsCells[12], columnsCells[13],columnsCells[14],columnsCells[16], columnsCells[22],columnsCells[23],columnsCells[24],columnsCells[26],columnsCells[27],columnsCells[30],columnsCells[31],columnsCells[32]]);
  columnsCells = $(pixelRows.get(1)).find('.columnCell');
  setColor([columnsCells[0],columnsCells[2],columnsCells[5],columnsCells[8],columnsCells[10],columnsCells[12],columnsCells[16],columnsCells[22],columnsCells[24],columnsCells[26],columnsCells[28],columnsCells[31]]);
  columnsCells = $(pixelRows.get(2)).find('.columnCell');
  setColor([columnsCells[0],columnsCells[1],columnsCells[2],columnsCells[5],columnsCells[9],columnsCells[12],columnsCells[13],columnsCells[14],columnsCells[16],columnsCells[22],columnsCells[23],columnsCells[24],columnsCells[26],columnsCells[27],columnsCells[31]]);
  columnsCells = $(pixelRows.get(3)).find('.columnCell');
  setColor([columnsCells[0],columnsCells[5],columnsCells[8],columnsCells[10],columnsCells[12],columnsCells[16],columnsCells[22],columnsCells[24],columnsCells[26],columnsCells[28],columnsCells[31]]);
  columnsCells = $(pixelRows.get(4)).find('.columnCell');
  setColor([columnsCells[0],columnsCells[4],columnsCells[5],columnsCells[6],columnsCells[8],columnsCells[10],columnsCells[12],columnsCells[13],columnsCells[14],columnsCells[16],columnsCells[17],columnsCells[18],columnsCells[22],columnsCells[24],columnsCells[26],columnsCells[28],columnsCells[31]]);
}

function init(){
  $('.selectionForm input[name=cells]').change(updateCanvas);
  $(document).mousedown(function(){mouseIsDown = true;})
  $(document).mouseup(function(){mouseIsDown = false;})

  $('.canvas').on('click', changeColor);
  $('.canvas').on('mouseenter', '*', changeColor);

  $('.selectionForm input[name=cells]').val(50);
  $('.selectionForm input[name=color]').val('#6B5B95');

  $('.loadingMessage').remove();
  updateCanvas();
  titleArt();
}

var mouseIsDown = false;

$(init);
