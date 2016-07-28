//For session state as boolean
let redTurn;

let $pieceSelected;
let $spaceSelected;

let selection;



//used to mark sideSpaces of board
let sideSpaces = [1, 8, 9, 16, 17, 24, 25, 32];

//used for allowable moves from certain spots
//let allowedMoves1 = [1, 8, 9, 16, 17, 24, 25, 32]; //player2 by -4, player1 by +4
//let allowedMoves2 = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31]; //player2 by -3 or -4, player1 by +4 or +5
//let allowedMoves3 = [2, 3, 4, 10, 11, 12, 18, 19, 20, 26, 27, 28]; //player2 by -4 or -5, player1 by +3 or +4

let allowedMoves1 = [2, 3, 10, 11, 18, 19, 24, 25] //player2 by -4 or -5, player1 by +3 or +4
let allowedMoves2 = [6, 7, 14, 15, 22, 23, 30, 31] //player2 by -3 or -4, player1 by +4 or +5
let allowedMoves3 = [1, 9, 17, 25] //player2 by -4, player1 by +4
let allowedMoves4 = [8, 16, 24, 32] //player2 by -4, player1 by +4
let allowedMoves5 = [5, 13, 21, 29] //player2 by -3 or -4, player1 by +4 or +5
let allowedMoves6 = [4, 12, 20, 28] //player2 by -4 or -5, player1 by -3 or -4

//allowedMoves1 //-4 => -7, -5 => -9; +3 => +7, +4 => +9
//allowedMoves2 //-3 => -7, -4 => -9, +4 => +7, +5 => +9
//allowedMoves3 // - 4 => -7, +4 => +9
//allowedMoves4 // -4 => -9, +4 => +7
//allowedMoves5 // - 3 => - 7, +5 => +9
//allowedMoves6 // -5 => -9, +3 => +7


$(document).ready(function() {
  createBoard();
})

function createBoard() {
  let $rows = [];

  for(let i = 0; i < 8; i++) {
    let $row = $('<div>').addClass('row');

    for (let j = 0; j < 8; j++) {
      let $square = $('<div>').addClass('square');
      $row.append($square);
    }
    $rows.push($row);
  }
  $('.board').append($rows);

  let $oddRowSquares = $('.row:even .square:even');
  let $evenRowSquares = $('.row:odd .square:odd');
  $oddRowSquares.addClass('black');
  $evenRowSquares.addClass('black');

  let $player1Row1 = $('.row:first div.square.black');
  let $player1Row2 = $('.row:nth-child(2) div.square.black');
  let $player1Row3 = $('.row:nth-child(3) div.square.black');

  $player1Row1.addClass('player1');
  $player1Row2.addClass('player1');
  $player1Row3.addClass('player1');

  let $player2Row1 = $('.row:nth-child(6) div.square.black');
  let $player2Row2 = $('.row:nth-child(7) div.square.black');
  let $player2Row3 = $('.row:nth-child(8) div.square.black');

  $player2Row1.addClass('player2');
  $player2Row2.addClass('player2');
  $player2Row3.addClass('player2');
/*
  let $emptyRow1 = $('.row:nth-child(4) div.square.black');
  let $emptyRow2 = $('.row:nth-child(5) div.square.black');

  $emptyRow1.addClass('empty');
  $emptyRow2.addClass('empty');
*/
  let $player1 = $('.player1');
  let $player2 = $('.player2');

  let $bluePiece = $('<div>').addClass('bluePiece');
  let $redPiece = $('<div>').addClass('redPiece');

  $player1.append($bluePiece);
  $player2.append($redPiece);

  for (var i = 0; i < 32; i++) {
    $(`.black:eq(${i})`).attr("id", `${i + 1}`);
  }

  for (var i = 0; i < 12; i++) {
    $(`.redPiece:eq(${i})`).attr("id", `redPiece${i + 1}`);
    $(`.bluePiece:eq(${i})`).attr("id", `bluePiece${i + 1}`);
  }


  $('.player2').click(selectPiece);
  $('.black').click(movePiece);

  //player2 goes first
  redTurn = true;
  $('h2').innerHTML = "Turn: Red";
}

function selectPiece() {
  $pieceSelected = $(this).children();
  $spaceSelected = $(this);
  selection = 1;
}

//Now all I have to do is set rules
//If thisSpace contains player2 if player2 selected, then no
//Else if thisSpace contains player1 if player2 selected, then check if space after is empty
//If space is thisSpace - 3, then if thisSpace - 6 is empty, then move to thisSpace - 6
//If space is thisSpace - 4, then if thisSpace - 8 is empty, then move to thisSpace - 8


function movePiece() {
  if (selection = 1) {

  //to check for space rules
  let $prevSpaceId = parseInt($spaceSelected.attr("id"));
  let $thisSpaceId = parseInt($(this).attr("id"));
  let $takeSpace;

  if (redTurn === true) { //player2's turn
    if ($spaceSelected.hasClass('player2')) {
      if ($(this).hasClass('player1')) {
        alert("Take!");
        if ($thisSpaceId === $prevSpaceId - 4) {
          $takeSpace = $(`#${$prevSpaceId - 7}`);
        } else if ($thisSpaceId === $prevSpaceId - 5) {
          let $takeSpace = $(`#${$prevSpaceId - 9}`);
        }

        //logic for taking
        if (!$takeSpace.hasClass('player1') || !$takeSpace.hasClass('player2')) {
          //Add/remove old/new classes and click events for old space selected
          $spaceSelected.removeClass('player2');
          $spaceSelected.unbind('click');
          //$spaceSelected.addClass('empty');
          $spaceSelected.click(movePiece);

          //move selected piece to new space
          $pieceSelected.detach();
          $takeSpace.append($pieceSelected);
          //make $spaceSelected this space
          $spaceSelected = $takeSpace;

          //remove old class of empty of new selected space and add new player2 class
          //$spaceSelected.removeClass('empty');
          $spaceSelected.addClass('player2');

          //unbind old event handler and add new event handler for this space
          $spaceSelected.unbind('click');
          $spaceSelected.click(selectPiece);

          //unbind click event handlers for player2
          $('.player2').unbind('click');
          $('.player1').click(selectPiece);
          redTurn = false;
          $('h2').innerHTML = "Turn: Blue";
        }
      } else if ($(this).hasClass('player2')) {
      } else {
        //proceed to below

        if (sideSpaces.includes($prevSpaceId)) {
          if ($thisSpaceId === $prevSpaceId - 4) {
            //Continue with moving

            //Add/remove old/new classes and click events for old space selected
            $spaceSelected.removeClass('player2');
            $spaceSelected.unbind('click');
            //$spaceSelected.addClass('empty');
            $spaceSelected.click(movePiece);

            //move selected piece to new space
            $pieceSelected.detach();
            $(this).append($pieceSelected);
            //make $spaceSelected this space
            $spaceSelected = $(this);

            //remove old class of empty of new selected space and add new player2 class
            //$spaceSelected.removeClass('empty');
            $spaceSelected.addClass('player2');

            //unbind old event handler and add new event handler for this space
            $spaceSelected.unbind('click');
            $spaceSelected.click(selectPiece);

            //unbind click event handlers for player2
            $('.player2').unbind('click');
            $('.player1').click(selectPiece);
            redTurn = false;
            $('h2').innerHTML = "Turn: Blue";
          }
        } else {
          if ($thisSpaceId === $prevSpaceId - 4 || $thisSpaceId === $prevSpaceId - 5) {
            //Continue with moving

            //Add/remove old/new classes and click events for old space selected
            $spaceSelected.removeClass('player2');
            $spaceSelected.unbind('click');
            //$spaceSelected.addClass('empty');
            $spaceSelected.click(movePiece);

            //move selected piece to new space
            $pieceSelected.detach();
            $(this).append($pieceSelected);
            //make $spaceSelected this space
            $spaceSelected = $(this);

            //remove old class of empty of new selected space and add new player2 class
            //$spaceSelected.removeClass('empty');
            $spaceSelected.addClass('player2');

            //unbind old event handler and add new event handler for this space
            $spaceSelected.unbind('click');
            $spaceSelected.click(selectPiece);

            //unbind click event handlers for player2
            $('.player2').unbind('click');
            $('.player1').click(selectPiece);
            redTurn = false;
            $('h2').innerHTML = "Turn: Blue";
          }
        }
      }
    }
  } else { //player1's turn
    if ($spaceSelected.hasClass('player1')) {
      if ($(this).hasClass('player2')) {
        alert("Take!");
        if ($thisSpaceId === $prevSpaceId + 4) {
          $takeSpace = $(`#${$prevSpaceId + 9}`);
        } else if ($thisSpaceId === $prevSpaceId + 3) {
          let $takeSpace = $(`#${$prevSpaceId + 7}`);
        }

        //logic for taking
        if (!$takeSpace.hasClass('player1') || !$takeSpace.hasClass('player2')) {
          //Add/remove old/new classes and click events for old space selected
          $spaceSelected.removeClass('player1');
          $spaceSelected.unbind('click');
          //$spaceSelected.addClass('empty');
          $spaceSelected.click(movePiece);

          //move selected piece to new space
          $pieceSelected.detach();
          $takeSpace.append($pieceSelected);
          //make $spaceSelected this space
          $spaceSelected = $takeSpace;

          //remove old class of empty of new selected space and add new player1 class
          //$spaceSelected.removeClass('empty');
          $spaceSelected.addClass('player1');

          //unbind old event handler and add new event handler for this space
          $spaceSelected.unbind('click');
          $spaceSelected.click(selectPiece);

          //unbind click event handlers for player2
          $('.player1').unbind('click');
          $('.player2').click(selectPiece);
          redTurn = true;
          $('h2').innerHTML = "Turn: Red";
        }
      } else if ($(this).hasClass('player1')) {
      } else {
        //proceed to below

        if (sideSpaces.includes($prevSpaceId)) {
          if ($thisSpaceId === $prevSpaceId + 4) {
            //Continue with moving

            //Add/remove old/new classes and click events for old space selected
            $spaceSelected.removeClass('player1');
            $spaceSelected.unbind('click');
            //$spaceSelected.addClass('empty');
            $spaceSelected.click(movePiece);

            //move selected piece to new space
            $pieceSelected.detach();
            $(this).append($pieceSelected);
            //make $spaceSelected this space
            $spaceSelected = $(this);

            //remove old class of empty of new selected space and add new player1 class
            //$spaceSelected.removeClass('empty');
            $spaceSelected.addClass('player1');

            //unbind old event handler and add new event handler for this space
            $spaceSelected.unbind('click');
            $spaceSelected.click(selectPiece);

            //unbind click event handlers for player1
            $('.player1').unbind('click');
            $('.player2').click(selectPiece);
            redTurn = true;
            $('h2').innerHTML = "Turn: Red";
          }
        } else {
          if ($thisSpaceId === $prevSpaceId + 4 || $thisSpaceId === $prevSpaceId + 3) {
            //Continue with moving

            //Add/remove old/new classes and click events for old space selected
            $spaceSelected.removeClass('player1');
            $spaceSelected.unbind('click');
            //$spaceSelected.addClass('empty');
            $spaceSelected.click(movePiece);

            //move selected piece to new space
            $pieceSelected.detach();
            $(this).append($pieceSelected);
            //make $spaceSelected this space
            $spaceSelected = $(this);

            //remove old class of empty of new selected space and add new player1 class
            //$spaceSelected.removeClass('empty');
            $spaceSelected.addClass('player1');

            //unbind old event handler and add new event handler for this space
            $spaceSelected.unbind('click');
            $spaceSelected.click(selectPiece);

            //unbind click event handlers for player1
            $('.player1').unbind('click');
            $('.player2').click(selectPiece);
            redTurn = true;
            $('h2').innerHTML = "Turn: Red";
          }
        }
      }









      //THIS WAS CORRECT BEFORE FOR MOVING FREELY WITH JUST LIMITING sideSpaces AND SPACES
      /*
      if (sideSpaces.includes($prevSpaceId)) {
        if ($thisSpaceId === $prevSpaceid + 4) {
          //Continue with moving

          //Add/remove old/new classes and click events for old space selected
          $spaceSelected.removeClass('player1');
          $spaceSelected.unbind('click');
          $spaceSelected.addClass('empty');
          $spaceSelected.click(movePiece);

          //move selected piece to new space
          $pieceSelected.detach();
          $(this).append($pieceSelected);
          //make $spaceSelected this space
          $spaceSelected = $(this);

          //remove old class of empty of new selected space and add new player1 class
          $spaceSelected.removeClass('empty');
          $spaceSelected.addClass('player1');

          //unbind old event handler and add new event handler for this space
          $spaceSelected.unbind('click');
          $spaceSelected.click(selectPiece);

          //unbind click event handlers for player1
          $('.player1').unbind('click');
          $('.player2').click(selectPiece);
          redTurn = true;
          $('h2').innerHTML = "Turn: Red";
        }
      } else {
        if ($thisSpaceId === $prevSpaceId + 4 || $thisSpaceId === $prevSpaceId + 3) {
          //Continue with moving

          //Add/remove old/new classes and click events for old space selected
          $spaceSelected.removeClass('player1');
          $spaceSelected.unbind('click');
          $spaceSelected.addClass('empty');
          $spaceSelected.click(movePiece);

          //move selected piece to new space
          $pieceSelected.detach();
          $(this).append($pieceSelected);
          //make $spaceSelected this space
          $spaceSelected = $(this);

          //remove old class of empty of new selected space and add new player1 class
          $spaceSelected.removeClass('empty');
          $spaceSelected.addClass('player1');

          //unbind old event handler and add new event handler for this space
          $spaceSelected.unbind('click');
          $spaceSelected.click(selectPiece);

          //unbind click event handlers for player1
          $('.player1').unbind('click');
          $('.player2').click(selectPiece);
          redTurn = true;
          $('h2').innerHTML = "Turn: Red";
        }
      }*/
    }
  }
}
}

/*
function pieceClicked() {
  $('.selection1').removeClass('selection1');
  $(this).addClass('selection1');
  $spaceSelected = $(this).parent();
  $pieceSelected = $(this);
}

function spaceClicked() {
  let leftSpaces = [1, 9, 17, 25];
  let rightSpaces = [8, 16, 24, 32];
  let $thisSpace = parseInt($(this).attr("id"));
  let $prevSpace = parseInt($spaceSelected.attr("id"));

  if ($spaceSelected.hasClass("player1")) {
    if (leftSpaces.includes($prevSpace) || rightSpaces.includes($prevSpace)) {
      if ($thisSpace === $prevSpace + 4) {
        if ($(this).hasClass("player1") || $(this).hasClass("player2")) {
          alert("There is a piece there.");
        } else {
          if ($spaceSelected.hasClass("player1")) {
            $spaceSelected.removeClass('player1');
          } else {
            $spaceSelected.removeClass('player2');
          }
          $spaceSelected.unbind('click');
          //$spaceSelected.removeClass('player1');
          //$spaceSelected.removeClass('player2');
          $('.selection2').removeClass('selection2');
          $(this).addClass('selection2');
          $pieceSelected.detach();
          $(this).append($pieceSelected);

          $('.black:not(:has(>div))').click(spaceClicked);
        }
      } else {alert("Please select valid move.");}
    } else {
      if ($thisSpace === $prevSpace + 3 || $thisSpace === $prevSpace + 4) {
        if ($(this).hasClass("player1") || $(this).hasClass("player2")) {
          alert("There is a piece there.");
        } else {
          if ($spaceSelected.hasClass("player1")) {
            $spaceSelected.removeClass('player1');
          } else {
            $spaceSelected.removeClass('player2');
          }
          $spaceSelected.unbind('click');
          //$spaceSelected.removeClass('player1');
          //$spaceSelected.removeClass('player2');
          $('.selection2').removeClass('selection2');
          $(this).addClass('selection2');
          $pieceSelected.detach();
          $(this).append($pieceSelected);

          $('.black:not(:has(>div))').click(spaceClicked);
        }
      } else {alert('Please select valid move.');}
    }
  } else if ($spaceSelected.hasClass("player2")) {
    if (leftSpaces.includes($prevSpace) || rightSpaces.includes($prevSpace)) {
      if ($thisSpace === $prevSpace - 4) {
        if ($(this).hasClass("player1") || $(this).hasClass("player2")) {
          alert("There is a piece there.");
        } else {
          if ($spaceSelected.hasClass("player1")) {
            $spaceSelected.removeClass('player1');
          } else {
            $spaceSelected.removeClass('player2');
          }
          $spaceSelected.unbind('click');
          //$spaceSelected.removeClass('player1');
          //$spaceSelected.removeClass('player2');
          $('.selection2').removeClass('selection2');
          $(this).addClass('selection2');
          $pieceSelected.detach();
          $(this).append($pieceSelected);

          $('.black:not(:has(>div))').click(spaceClicked);
        }
      } else {alert("Please select valid move.");}
    } else {
      if ($thisSpace === $prevSpace - 3 || $thisSpace === $prevSpace - 4) {
        if ($(this).hasClass("player1") || $(this).hasClass("player2")) {
          alert("There is a piece there.");
        } else {
          if ($spaceSelected.hasClass("player1")) {
            $spaceSelected.removeClass('player1');
          } else {
            $spaceSelected.removeClass('player2');
          }
          $spaceSelected.unbind('click');
          //$spaceSelected.removeClass('player1');
          //$spaceSelected.removeClass('player2');
          $('.selection2').removeClass('selection2');
          $(this).addClass('selection2');
          $pieceSelected.detach();
          $(this).append($pieceSelected);

          $('.black:not(:has(>div))').click(spaceClicked);
        }
      } else {alert("Please select valid move.");}
    }
  }

  var thisEl = this;

  setTimeout(function(thisEl) {
    alert('hello');
    $(thisEl).removeClass('selection2');
    $(thisEl).children().removeClass('selection1');
  }, 3000);
}


  /*setTimeout(function(){
    $('.selection2').removeClass('selection2');
    pieceSelected.detach();
    $(this).append(pieceSelected);
    debugger;
  }, 3000);*/
