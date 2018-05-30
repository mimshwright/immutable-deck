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
  assert.true(deck instanceof Deck, "new Deck() returns an instance of Deck.");
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

test("set", assert => {
  let deck = new Deck([0, 1, "two", 3]);
  assert.true(isFunction(deck.set));
  assert.is(deck.set(2, 2).join(","), "0,1,2,3");
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

  assert.is(
    newDeck.draw,
    newDeck.drawFromTop,
    "drawFromTop() is an alias of deal()"
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

test("deal()", assert => {
  let deck = createDeckOf10();
  let hand0, hand1, hand2, newDeck;
  assert.true(isFunction(deck.deal));

  [hand0, hand1, newDeck] = deck.deal(2, 3);
  assert.is(hand0.size, 3, "Deal 3 cards to 2 hands");
  assert.is(hand1.size, 3);
  assert.is(
    hand0.get(0),
    4,
    "Order of cards: top card on deck is bottom card of hand."
  );
  assert.is(hand0.get(1), 2);
  assert.is(hand0.get(2), 0);
  assert.is(newDeck.size, 4, "Remaining cards stay in deck");

  [hand0, hand1, newDeck] = deck.deal(2);
  assert.is(hand0.size, 5, "If no card count is given, all cards are dealt.");
  assert.is(hand1.size, 5);
  assert.is(newDeck.size, 0);

  [hand0, hand1, hand2, newDeck] = deck.deal(3, 4);
  assert.is(
    hand0.size,
    4,
    "Dealing more cards than available distributes until all gone"
  );
  assert.is(
    hand1.size,
    3,
    "The first hands dealt may get more than later hands."
  );
  assert.is(hand2.size, 3);
  assert.is(
    newDeck.size,
    0,
    "when more cards are dealt than are in deck, the deck is empty"
  );

  assert.is(
    newDeck.deal,
    newDeck.dealFromTop,
    "dealFromTop() is an alias of deal()"
  );
});

test("addToTop() / add()", assert => {
  let deck = new Deck();
  assert.true(isFunction(deck.addToTop), "addToTop() is a function.");

  let newDeck = deck.addToTop(0);
  assert.is(newDeck.size, 1, "Add an element to top of deck");
  assert.is(newDeck.get(0), 0, "Added correct value");

  newDeck = newDeck.addToTop(1);
  assert.is(newDeck.size, 2);
  assert.is(newDeck.get(0), 1, "Adds to front of stack");

  newDeck = newDeck.addToTop(2, 3, 4);
  assert.is(newDeck.size, 5, "Adds several items to list.");
  assert.is(newDeck.join("-"), "2-3-4-1-0", "Adds items in correct order");

  assert.true(isFunction(deck.addToTop), "addToTop() is a function.");
  assert.is(newDeck.add, newDeck.addToTop, "add() is an alias for addToTop()");
});

test("addToBottom()", assert => {
  let deck = new Deck([]);
  assert.true(isFunction(deck.addToBottom), "addToBottom() is a function.");

  let newDeck = deck
    .addToBottom(0)
    .addToBottom(1)
    .addToBottom(2);

  assert.is(newDeck.size, 3, "Add an element to bottom of deck");
  assert.is(newDeck.get(0), 0, "Added correct value");
  assert.is(newDeck.get(2), 2, "Added correct value");

  newDeck = newDeck.addToBottom(3, 4, 5);
  assert.is(newDeck.size, 6, "Adds several items to end of list.");
  assert.is(newDeck.join("-"), "0-1-2-3-4-5", "Adds items in correct order");
});

test("addAt()", assert => {
  let deck = new Deck(["first", "last"]);
  assert.true(isFunction(deck.addAt), "addAt() is a function.");

  let newDeck = deck.addAt(1, "middle");
  assert.is(newDeck.size, 3, "Add an element to middle of deck");
  assert.is(newDeck.get(1), "middle", "Added correct value at correct spot");

  newDeck = new Deck([0, 1, 5]).addAt(2, 2, 3, 4);
  assert.is(newDeck.size, 6, "Adds several items to middle.");
  assert.is(newDeck.join("-"), "0-1-2-3-4-5", "Adds items in correct order");

  newDeck = new Deck([0, 1, 5]).addAt(2)(2, 3, 4);
  assert.is(newDeck.size, 6, "First value can be partially called.");
  assert.is(
    newDeck.join("-"),
    "0-1-2-3-4-5",
    "First value can be partially called"
  );
});
