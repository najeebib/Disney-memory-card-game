# Project description

The program works as follows there is a button when clicked will get the characters from the disney api and it will create cards and place them in the board.
Then the user has to search for the matching cards by pressing on each card untill they find all matches then the program will get 10 more characters from the 
next page and start the game again.

# Functions

creatCards(): this function gets the characters from disney api and creates two cards for each one and puts them on the board.    

shuffleCards(): this function shuffels the cards so that it gets placed in random order on the board.         

flipCard(): card click listener, flips the card when click then check for match         

checkForMatch(): checks the two flipped cards for match if they don't match flip them back. if they match increment the match count, the program displays an alert everytime the user flips two cards. when the count reaches 10 it      

means all matches were found the program removes the cards and calls creatCards() to start a new game     

disableCards(): disable the cards, remove the click listener to make sure that the cards dont get unflipped.      

unflipCards(): unflip the cards.      

resetBoard(): reset the board.        

files:

index.html

styles.css

script.js




 
