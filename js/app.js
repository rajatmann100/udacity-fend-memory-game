/*
 * Create a list that holds all of your cards
 */
var cardLists = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];
// 
var moves = 0;
var match_found = 0;


var game_started = false;


var timer = new Timer();
timer.addEventListener('secondsUpdated', function (e) {                   $('#timer').html(timer.getTimeValues().toString());
});


$('#restart-btn').click(resetGame);

function createCard(card) {
    $('#deck').append(`<li class="card animated"><i class="fa ${card}"></i></li>`);
}

function displayCards() {
    for (var i = 0; i < 2; i++) {
        cardLists = shuffle(cardLists);
        cardLists.forEach(createCard);
    }
}

function shuffle(array) {
    var currentIndex = array.length
        , temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

openCards = [];


function tglCrd() {
    
    
    if (game_started == false) {
        game_started = true;
        timer.start();
    }
    
    if (openCards.length === 0) {
        $(this).toggleClass("show open").animateCss('flipInY');
        openCards.push($(this));
        disableCLick();
    }
    else if (openCards.length === 1) {
        
        updateMoves();
        $(this).toggleClass("show open").animateCss('flipInY');
        openCards.push($(this));
        setTimeout(matchOpenCards, 1100);
    }
}

function disableCLick() {
    openCards.forEach(function (card) {
        card.off('click');
    });
}

function enableClick() {
    openCards[0].click(tglCrd);
}

function matchOpenCards() {
    if (openCards[0][0].firstChild.className == openCards[1][0].firstChild.className) {
        console.log("matchCard");
        openCards[0].addClass("match").animateCss('pulse');
        openCards[1].addClass("match").animateCss('pulse');
        disableCLick();
        removeOpenCards();
        setTimeout(checkWin, 1000);
    }
    else {
        openCards[0].toggleClass("show open").animateCss('flipInY');
        openCards[1].toggleClass("show open").animateCss('flipInY');
        enableClick();
        removeOpenCards();
    }
}

function removeOpenCards() {
    openCards = [];
}

$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass(animationName).one(animationEnd, function () {
            $(this).removeClass(animationName);
        });
        return this;
    }
});

function checkWin() {
    match_found += 1;
    if (match_found == 8) {
        results();
    }
}

function updateMoves() {
    moves += 1;
    $('#moves').html(`${moves} Moves`);
    if (moves == 24) {
        addBlankStar();
    }
    else if (moves == 15) {
        addBlankStar();
    }
}


function resetGame() {
    moves = 0;
    match_found = 0;
    $('#deck').empty();
    $('#stars').empty();
    $('#game-container')[0].style.display = "";
    $('#result')[0].style.display = "none";
    game_started=false;
    timer.stop();
    $('#timer').html("00:00:00");
    play();
}

function addBlankStar() {
    $('#stars').children()[0].remove();
    $('#stars').append('<li><i class="fa fa-star-o"></i></li>');
}

function addStars() {
    for (var i = 0; i < 3; i++) {
        $('#stars').append('<li><i class="fa fa-star"></i></li>');
    }
}


function play() {
    displayCards();
    $('.card').click(tglCrd);
    $('#moves').html("0 Moves");
    addStars(3);
}

function results() {
    timer.pause();
    var a = moves>23 ? "fa-star-o" : "fa-star";
    var b = moves>14 ? "fa-star-o" : "fa-star";
    $('#result').find('.star1').addClass(a)
    $('#result').find('.star2').addClass(b)

    $('#result').css('display','flex')
    $('#result').find('.score-values-moves').text(moves)
    $('#result').find('.score-values-time').text(timer.getTimeValues().toString())
    $('#restart').click(resetGame);
}

play();