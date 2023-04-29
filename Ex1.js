let randomCharacters = [];
let cards = [];
let matches = 0;
let URL = "https://api.disneyapi.dev/characters";
var flippedCards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let nextPage;
//this function receives a list and an object and returns a boolean whether or not the object is in the list already
function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}
//this function gets 10 random characters from disney api and creates the cards for the characters and puts them on board
function creatCards()
{
    for(let i=0;i<20;i++)
    {
        //remove the cards from the previous game
        $(".memory-card").remove();
    }

    randomCharacters = [];
    cards = [];
    matches = 0;
    //ajax get request that is sent to the server and returns the disney characters list
    $.ajax({
        url: URL,
        type: "GET",
        success: function (response) {
            // Pick 10 random characters from the list
            const characters = response.data;
            //get the url for the next page, next time the get request will get the characters from the next page
            nextPage = response.nextPage;
            while(randomCharacters.length <10) {
                const randomIndex = Math.floor(Math.random() * 50);
                const randomCharacter = characters[randomIndex];

                if (!containsObject(randomCharacter, randomCharacters)) {
                    randomCharacters.push(randomCharacter);
                }
            }
            for(let i=0; i<randomCharacters.length; i++)
            {
                cards.push(randomCharacters[i]);
                cards.push(randomCharacters[i]);
            }
            //shuffle the cards in a random order
            shuffleCards();
            //create cards and put them on the board
            for (let card of cards) {
                const cardElement = document.createElement("div");
                cardElement.classList.add("memory-card");
                cardElement.setAttribute("data-name", card.name);
                cardElement.innerHTML = `
             
                <img class="front-face" src=${card.imageUrl } />
                <img  class="back-face" src="245936-disney_logo.jpg"/>`;
                $(".board").append(cardElement);
                //add listener for click
                cardElement.addEventListener("click", flipCard);
            }

        },
        error: function (xhr, status, error) {
            console.log("Error:", error);
        },
    });

}
function shuffleCards() {
    //randomize the cards
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}


//flip the card when clicked
function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }

    // second click
    secondCard = this;
    //check for match
    checkForMatch();

}

function checkForMatch() {
    //if the name is the same then thhere is a match
    let isMatch = firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name");
    if(isMatch)
    {
        matches++;
        flippedCards.push(firstCard);
        flippedCards.push(secondCard);
        //display alert when match found
        let name = firstCard.getAttribute("data-name");
        for(let i=0;i<randomCharacters.length;i++)
        {
            if(randomCharacters[i].name === name)
            {
                alert("Nice you found a match!\nName: " + name+ "\nFilms: " + randomCharacters[i].films +
                    "\nTV Shows: " + randomCharacters[i].tvShows + "\nVideo Games: " +
                    randomCharacters[i].videoGames + "\nAttractions: " + randomCharacters[i].parkAttractions );
            }
        }
        //remove the click listener for the flipped cards
        disableCards();
    }
    else
    {
        alert("Not matching, try again");
        //flip the cards back
        unflipCards();
    }
    //if we all the matches were found
    if(matches === 10)
    {
        alert("Congratulations you won in " + gameTime + " seconds!");
        //remove the cards on board
        URL = nextPage;
        creatCards();
    }
}
//remove the click listener for the matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}
//reset the board
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

$(document).ready(function () {
    $(".temp").hide();


    $(".startBtn").click(function(){


        creatCards();
    });
});




