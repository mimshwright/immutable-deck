import test from "ava";
import { Stack } from "extendable-immutable";
import Deck from "../src/Deck";
import R from "ramda";

const isFunction = R.is(Function);

const createDeckOf10 = () => new Deck([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

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

test("size", assert => {
  let deck = createDeckOf10();
  let emptyDeck = new Deck();
  assert.is(deck.size, 10, "Deck size shows the numebr of cards in the deck.");
  assert.is(
    emptyDeck.size,
    0,
    "Deck size shows the numebr of cards in the deck."
  );
});

test("draw()", assert => {
  let deck = createDeckOf10();
  assert.true(isFunction(deck.draw), "draw() is a function.");
  let [cards, newDeck] = deck.draw();
  assert.is(cards.size, 1, "Draw defaults to 1 card");
  assert.is(newDeck.size, 9, "New deck is returned without the first card");
  assert.not(deck, newDeck, "Returns a new instance of deck");
  assert.is(deck.size, 10, "Original deck isn't altered");
  assert.is(cards.first(), deck.first(), "Draw from front of stack");

  [cards, newDeck] = deck.draw(2);
  assert.is(cards.size, 2, "Specify number of cards to draw");
  assert.is(newDeck.size, 8, "New deck is returned without the first 2 cards");

  [cards, newDeck] = deck.draw(10);
  assert.is(cards.size, 10);
  assert.is(newDeck.size, 0);

  assert.throws(
    () => deck.draw(11),
    Error,
    "Can't draw more cards than are in the deck."
  );
});

test("drawFromBottom()", assert => {
  let deck = createDeckOf10();
  assert.true(
    isFunction(deck.drawFromBottom),
    "drawFromBottom() is a function."
  );
  let [cards, newDeck] = deck.drawFromBottom();
  assert.is(cards.size, 1, "Draw defaults to 1 card");
  assert.is(newDeck.size, 9, "New deck is returned without the first card");
  assert.not(deck, newDeck, "Returns a new instance of deck");
  assert.is(deck.size, 10, "Original deck isn't altered");
  assert.is(cards.first(), deck.last(), "Draw from end of stack");

  [cards, newDeck] = deck.drawFromBottom(2);
  assert.is(cards.size, 2, "Specify number of cards to draw");
  assert.is(newDeck.size, 8, "New deck is returned without the first 2 cards");
  assert.is(cards.get(0), deck.get(9), "Card order should be last first.");
  assert.is(cards.get(1), deck.get(8), "Card order should be last first.");

  assert.throws(
    () => deck.drawFromBottom(11),
    Error,
    "Can't draw more cards than are in the deck."
  );
});

test("addToTop() / add()", assert => {
  let deck = new Deck();
  assert.true(isFunction(deck.add), "add() is a function.");

  let newDeck = deck.add(0);
  assert.is(newDeck.size, 1, "Add an element to top of deck");
  assert.is(newDeck.get(0), 0, "Added correct value");
  assert.deepEqual(
    deck.add(0),
    deck.addToTop(0),
    "add and addToTop produce the same results"
  );

  newDeck = newDeck.add(1);
  assert.is(newDeck.size, 2);
  assert.is(newDeck.get(0), 1, "Adds to front of stack");

  newDeck = newDeck.add([2, 3, 4]);
  assert.is(newDeck.size, 5, "Adds collections to list.");
  assert.is(newDeck.join("-"), "2-3-4-1-0", "Adds items in correct order");

  newDeck = newDeck.add(5, 6, 7);
  assert.is(newDeck.size, 8, "Adds each argument to the list.");
  assert.is(
    newDeck.join("-"),
    "5-6-7-2-3-4-1-0",
    "Adds items in correct order"
  );

  newDeck = newDeck.add(8, [9, 10]);
  assert.is(
    newDeck.join("-"),
    "8-9,10-5-6-7-2-3-4-1-0",
    "Only flattens first collection."
  );

  assert.true(isFunction(deck.addToTop), "addToTop() is a function.");
  assert.deepEqual(
    new Deck().add(0, 1, 2).join("-"),
    new Deck().addToTop(0, 1, 2).join("-"),
    "add() and addToTop() produce same results."
  );
});
