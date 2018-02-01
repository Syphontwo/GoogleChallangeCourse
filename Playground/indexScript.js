$(function(){
  var now, later;
  var dummy;
  now = performance.now();
  for (var x = 0; x < 10000; x++){
    dummy = this;
  }
  later = performance.now();
  var thisTest = later - now;
  $('body').append('<p id="ThisTest">Start of this: ' + now + '\nEnd of this: ' + later + '\nDifference: ' + thisTest + '</p>');

  now = performance.now();
  for (var x = 0; x < 10000; x++){
    dummy = $(this);
  }
  later = performance.now();
  var dollarThisTest = later - now;
  $('body').append('<p id="DollarThisTest">Start of $(this): ' + now + '\nEnd of $(this): ' + later + '\nDifference: ' + dollarThisTest + '</p>');

  now = performance.now();
  for (var x = 0; x < 10000; x++){
    dummy = $(this.name);
  }
  later = performance.now();
  var dollarThisToStringTest = later - now;
  $('body').append('<p id="DollarThisTest">Start of $(this.name): ' + now + '\nEnd of $(this.name): ' + later + '\nDifference: ' + dollarThisToStringTest + '</p>');

});
