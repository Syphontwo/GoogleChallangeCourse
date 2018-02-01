function updateCanvas(){
  var rowsCount = Math.max($('.selectionForm input[name=rows]').val(), 1);
  var columnsCount = Math.max($('.selectionForm input[name=columns]').val(), 1);

  var cellWidth = $('.canvas').width() / rowsCount;
  var cellHeight = $('.canvas').height() / columnsCount;

  for (var x = 1; x <= rowsCount; x++){
    for (var y = 1; y <= columnsCount; y++){
      $('.canvas')
    }
  }
}



function init(){
  $('.selectionForm input[name=rows]').change(updateCanvas);
  $('.selectionForm input[name=columns]').change(updateCanvas);
  $(window).resize(updateCanvas);

  $('.selectionForm input[name=rows]').val(20);
  $('.selectionForm input[name=columns]').val(20);
  $('.selectionForm input[name=color]').val('#6B5B95');
}

$(init);
