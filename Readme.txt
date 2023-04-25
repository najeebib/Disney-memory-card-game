Name: Najeeb Ibrahim
ID: 319051066

The client will send http requests to the server every time they start a game, 2 request for the start and finish time and one to get the characters from disney api.
The server will respond with a http response to the client with the requested data.
The mechanism  that we are using is http protocol which is used to fetching resources between html documents .

But before that the client and the server exchange an HTTP request/response pair, they must establish a TCP connection, a process which requires several round-trips.



Description of the code
The code is written in html for the webpage, css for the styles and javascript for the backend part. The program works as follows there is a button when clicked will get the characters from the disney api
and it will create cards and place them in the board. Then the user has to search for the matching cards by pressing on each card untill they find all matches then the program will get 10 more characters from the 
next page and start the game again.

Functions
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
Ex1.js
get_current_time.php
Pictures which has a picture of the disney logo which is used for the back of the cards
http://najeebib.mysoft.jce.ac.il/Ex1/index.html





 