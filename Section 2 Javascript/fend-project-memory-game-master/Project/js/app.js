/*
 * Create a list that holds all of your cards
 */
 var deck =[
   'fa-diamond', 'fa-diamond',
   'fa-paper-plane-o','fa-paper-plane-o',
   'fa-anchor','fa-anchor',
   'fa-bolt','fa-bolt',
   'fa-cube','fa-cube',
   'fa-leaf','fa-leaf',
   'fa-bicycle','fa-bicycle',
   'fa-bomb','fa-bomb']
var moves = 0;
var startime = (new Date).getTime();
var timerRunning = false;

function runTimer(){
  if (timerRunning){
    $('.timer').text(Math.floor(((new Date).getTime() - startime) / 1000 ) + ' seconds')
  }
  setTimeout(function(){ runTimer(); }, 1000);
}


function startGame(){
  //reset all card to default state
  $('.deck li').removeClass('match open show');

  $('.stars li i').addClass('fa-star');

  startime = (new Date).getTime();
  timerRunning = true;
  moves = 0;
  shuffle(deck);

  for (var i = 0; i < deck.length; i++) {
    var thisCard = $('.deck li:nth-child(' + ( i + 1 ) + ') i')
    thisCard.removeClass(); //remove all classes
    thisCard.addClass('fa ' + deck[i] ); //add the class from the array and fa
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function flipCard (eventArgs){
  //if ($(eventArgs.target).hasClass('match')){ return; } //do nothing if it is already matched

  $(eventArgs.target).addClass('open show');
  $(eventArgs.target).removeClass('mismatch'); //to indicate it is now selected for the next pair

  var cardsShown = $('.show');
  if ($(cardsShown).length > 1){//if more than one card is shown without being matched
    if (checkCards($(eventArgs.target).children('i').attr('class').split(/\s+/))) {
      $(cardsShown).removeClass('open show');
      $(cardsShown).addClass('match');
    } else {
      $(cardsShown).removeClass('open show');
      $(cardsShown).addClass('mismatch'); //visually indicate mismatch
      //after a second, flip them back over
      setTimeout(function(){ $(cardsShown).removeClass('mismatch'); }, 1000);
    }
  }

  checkWinCondition();
}

function checkCards(target){
  var matching = 0;
  moves += 1; //only increment a move on a check, not on a click

  $('.show i').each( //loop through shown items
    function(){
      for (var i = 0; i < target.length; i++) { //loop through each expected class
        if ($(this).hasClass(target[i])) { //check if each card has the target class
          matching += 1; //add one to the number of matches found
        }
      }
    }
  )
  updateScore();

  if (matching == target.length * 2) { //if both cards match, there should be exactly the number of classes times 2 matches
    return true; //only return true if there are exactly the right amount for 2 cards to match
  } else {
    return false; //this will make it so if the clicks are to fast, it will show no matches
  }
}

function updateScore(){
  $('.moves').text(moves);
  if (moves > 10 && $('.stars li .fa-star').length > 2) {
    $('.stars li:nth-child(3) i').removeClass('fa-star');
  } else if (moves > 20 && $('.stars li .fa-star').length > 1) {
    $('.stars li:nth-child(2) i').removeClass('fa-star');
  }
    else if (moves > 30 && $('.stars li .fa-star').length > 0) {
    $('.stars li:nth-child(1) i').removeClass('fa-star');
  }
}

function checkWinCondition(){
  if($('.match').length >= deck.length){
    timerRunning = false;
    $('#winmodal').show();
  }
}

function init(){
  $('.fa-repeat').click(startGame);
  $('.deck li').click(flipCard);
  $('#winmodal .close').click(function(){ $('#winmodal').hide(); })
  runTimer();
  startGame();
}

$(init);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
