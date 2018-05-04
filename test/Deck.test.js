import test from "ava";
import {Stack} from "immutable"
import Deck from "../src/Deck";
import R from "ramda";

const isFunction = R.is(Function);

const createDeckOf10 = () => new Deck([0,1,2,3,4,5,6,7,8,9]);

test("Hello world!", assert => {
  assert.pass("Checking that AVA is running.");
});

test("Deck exists", assert => {
  assert.truthy(Deck, "Deck exists");
  let deck = createDeckOf10();
  assert.true(deck instanceof Stack, "Deck extends Stack.");

  // Doesn't work due to some babel stuff.
  // assert.true(deck instanceof Deck, "new Deck() returns an instance of Deck.");

  // console.log(Object.keys(deck), Object.values(deck));
});

test ("size", assert => {
  let deck = createDeckOf10();
  let emptyDeck = new Deck();
  assert.is(deck.size, 10, "Deck size shows the numebr of cards in the deck.");
  assert.is(emptyDeck.size, 0, "Deck size shows the numebr of cards in the deck.");
});

test("draw()", assert => {
  let deck = createDeckOf10();
  let [cards, newDeck] = deck.draw();
  assert.true(isFunction(deck.draw), "draw() is a function.");
  assert.is(cards.size, 1, "Draw defaults to 1 card");
  assert.is(newDeck.size, 9, "New deck is returned without the first card");
  assert.not(deck, newDeck, "Returns a new instance of deck");
  assert.is(deck.size, 10, "Original deck isn't altered");
  assert.is(cards.get(0), 0, "Draw from front of stack");
  assert.is(cards.get(0), deck.peek(), "Result is the same as peek would give.");

  [cards, newDeck] = deck.draw(2);
  assert.is(cards.size, 2, "Specify number of cards to draw");
  assert.is(newDeck.size, 8, "New deck is returned without the first 2 cards");

  assert.throws(() => deck.draw(11), Error, "Can't draw more cards than are in the deck.");
})
