let baseURL = "http://deckofcardsapi.com/api/deck";

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.

// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
async function drawCard() {
  let response = await axios.get(`${baseURL}/new/draw`);
  console.log(
    `${response.data.cards[0].value.toLowerCase()} of ${response.data.cards[0].suit.toLowerCase()}`
  );
}

drawCard();

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck.
// Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

async function drawTwoCards() {
  let firstCardResponse = await axios.get(`${baseURL}/new/draw`);
  let deckId = firstCardResponse.data.deck_id;
  let secondCardResponse = await axios.get(`${baseURL}/${deckId}/draw`);

  [firstCardResponse, secondCardResponse].forEach((card) =>
    // console.log(card.data.cards[0])
    console.log(
      `${card.data.cards[0].value.toLowerCase()} of ${card.data.cards[0].suit.toLowerCase()}`
    )
  );
}

drawTwoCards();

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads,
// go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.
// Every time you click the button, display a new card, until there are no cards left in the deck.

let deckId = null;
let button = document.querySelector("button");
let cardArea = document.getElementById("cards");

window.addEventListener("DOMContentLoaded", () => {
  axios.get(`${baseURL}/new/shuffle`).then((response) => {
    console.log("third request");
    deckId = response.data.deck_id;
    console.log(deckId);
    button.style.display = "block";
  });

  button.addEventListener("click", () => {
    axios.get(`${baseURL}/${deckId}/draw`).then((response) => {
      console.log(response.data.cards[0]);
      let suit = response.data.cards[0].suit;
      let value = response.data.cards[0].value;
      let image = response.data.cards[0].image;
      cardArea.innerHTML = `<img src=${image} alt="${value} of ${suit}">`;

      if (response.data.remaining === 0) {
        button.style.display = "none";
        cardArea.innerHTML = "<h1>No more card in deck</h1>";
      }
    });
  });
});
