import test from "ava";
import { Stack } from "extendable-immutable";
import Deck from "../src/Deck";
import R from "ramda";

const isFunction = R.is(Function);

const createDeckOf10 = () => new Deck([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

test("Deck exists", assert => {
  assert.truthy(Deck, "Deck exists");
  let deck = new Deck([1, 2, 3]);

  assert.true(deck instanceof Stack, "Deck extends Stack.");
  assert.true(deck instanceof Deck, "new Deck() returns an instance of Deck.");
});

test("size", assert => {
  const deck = createDeckOf10();
  assert.is(
    deck.size,
    10,
    "Deck size shows the numebr of elements in the deck."
  );
});

test("set()", assert => {
  let deck = new Deck([0, 1, "two", 3]);
  assert.true(isFunction(deck.set));
  assert.is(deck.set(2, 2).join(","), "0,1,2,3", "Set a value at an index");
});

test("draw() / drawFromTop()", assert => {
  let deck = createDeckOf10();
  assert.true(isFunction(deck.draw), "draw() is a function.");

  let [elements, newDeck] = deck.draw();
  assert.is(elements.size, 1, "Draw defaults to 1 element");
  assert.is(newDeck.size, 9, "New deck is returned without the first element");
  assert.not(deck, newDeck, "Returns a new instance of deck");
  assert.is(deck.size, 10, "Original deck isn't altered");
  assert.is(elements.first(), deck.first(), "Draw from front of stack");

  [elements, newDeck] = deck.draw(2);
  assert.is(elements.size, 2, "Specify number of elements to draw");
  assert.is(
    newDeck.size,
    8,
    "New deck is returned without the first 2 elements"
  );

  [elements, newDeck] = deck.draw(10);
  assert.is(elements.size, 10);
  assert.is(
    newDeck.size,
    0,
    "Always returns a new deck even if there is nothing left in it."
  );

  [elements, newDeck] = deck.draw(99);
  assert.is(
    elements.size,
    10,
    "Drawing more than size defaults to maximum size of deck"
  );

  assert.is(
    newDeck.draw,
    newDeck.drawFromTop,
    "drawFromTop() is an alias of draw()"
  );
});

test("drawFromBottom()", assert => {
  let deck = createDeckOf10();
  assert.true(
    isFunction(deck.drawFromBottom),
    "drawFromBottom() is a function."
  );
  let [elements, newDeck] = deck.drawFromBottom();
  assert.is(elements.size, 1, "Draw defaults to 1 element");
  assert.is(newDeck.size, 9, "New deck is returned without the first element");
  assert.not(deck, newDeck, "Returns a new instance of deck");
  assert.is(deck.size, 10, "Original deck isn't altered");
  assert.is(elements.first(), deck.last(), "Draw from end of stack");

  [elements, newDeck] = deck.drawFromBottom(2);
  assert.is(elements.size, 2, "Specify number of elements to draw");
  assert.is(
    newDeck.size,
    8,
    "New deck is returned without the first 2 elements"
  );
  assert.is(elements.get(0), deck.get(9), "Card order should be last first.");
  assert.is(elements.get(1), deck.get(8), "Card order should be last first.");

  [elements, newDeck] = deck.drawFromBottom(99);
  assert.is(
    elements.size,
    10,
    "Drawing more than size defaults to maximum size of deck"
  );
});

test("drawFrom()", assert => {
  let deck = createDeckOf10();
  let hand, newDeck;
  assert.true(isFunction(deck.drawFrom), "drawFrom() exists");

  [hand, newDeck] = deck.drawFrom(3);
  assert.is(hand.size, 1, "by default, draws one element");
  assert.is(hand.get(0), 3, "by default, draws one element");
  assert.is(newDeck.get(2), 2);
  assert.is(newDeck.get(3), 4, "removes correct element from the new deck");
  assert.is(newDeck.size, 9);

  [hand, newDeck] = deck.drawFrom(3, 2);
  assert.is(hand.size, 2, "Draw 2 elements from deck");
  assert.is(hand.get(0), 3, "draws correct elements");
  assert.is(hand.get(1), 4, "draws correct elements");
  assert.is(newDeck.get(2), 2);
  assert.is(newDeck.get(3), 5, "removes correct element from the new deck");
  assert.is(newDeck.size, 8);
});

test("deal() / dealFromTop()", assert => {
  let deck = createDeckOf10();
  let hand0, hand1, hand2, newDeck;
  assert.true(isFunction(deck.deal, "deal() exists"));

  [hand0, hand1, newDeck] = deck.deal(2, 3);
  assert.is(hand0.size, 3, "Deal 3 elements to 2 hands");
  assert.is(hand1.size, 3);
  assert.is(
    hand0.get(0),
    4,
    "Order of elements: top element on deck is bottom element of hand."
  );
  assert.is(hand0.get(1), 2);
  assert.is(hand0.get(2), 0);
  assert.is(newDeck.size, 4, "Remaining elements stay in deck");

  [hand0, hand1, newDeck] = deck.deal(2);
  assert.is(
    hand0.size,
    5,
    "If no element count is given, all elements are dealt."
  );
  assert.is(hand1.size, 5);
  assert.is(newDeck.size, 0);

  [hand0, hand1, hand2, newDeck] = deck.deal(3, 4);
  assert.is(
    hand0.size,
    4,
    "Dealing more elements than available distributes until all gone"
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
    "when more elements are dealt than are in deck, the deck is empty"
  );

  assert.is(
    newDeck.deal,
    newDeck.dealFromTop,
    "dealFromTop() is an alias of deal()"
  );
});

test("dealFromBottom()", assert => {
  let deck = createDeckOf10();
  let hand0, hand1, newDeck;
  assert.true(isFunction(deck.dealFromBottom));

  [hand0, hand1, newDeck] = deck.dealFromBottom(2, 2);
  assert.is(hand0.size, 2, "Deal 2 elements to 2 hands from bottom");
  assert.is(hand1.size, 2);
  assert.is(
    hand0.get(0),
    9,
    "Order of elements: bottom element of deck should be first element of hand."
  );
  assert.is(hand0.get(1), 7);
  assert.is(newDeck.size, 6, "Remaining elements stay in deck");
  assert.is(
    newDeck.join("-"),
    "0-1-2-3-4-5",
    "Remaining elements stay in deck"
  );

  [hand0, hand1, newDeck] = deck.dealFromBottom(2);
  assert.is(hand0.join("-"), "9-7-5-3-1", "By default deal all the elements");
  assert.is(hand1.join("-"), "8-6-4-2-0");
  assert.is(newDeck.size, 0);
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
});

test("cut() / split()", assert => {
  let deck = createDeckOf10();
  assert.true(isFunction(deck.cut), "cut() is a function.");

  let [firstHalf, secondHalf] = deck.cut();
  assert.is(firstHalf.size, 5, "By default splits in half.");
  assert.is(secondHalf.size, 5, "By default splits in half.");
  assert.is(firstHalf.join("-"), "0-1-2-3-4", "Values as expected.");
  assert.is(secondHalf.join("-"), "5-6-7-8-9", "Values as expected.");

  deck = deck.add(10);
  [firstHalf, secondHalf] = deck.cut();
  assert.is(deck.size, 11, "Check that add() worked as expected.");
  assert.is(firstHalf.size, 6, "Extra item goes in the first half.");
  assert.is(
    secondHalf.size,
    5,
    "Extra item goes in the first half not the second half."
  );

  [firstHalf, secondHalf] = deck.cut(3);
  assert.is(
    firstHalf.size,
    3,
    "Add an index parameter to split at that index."
  );
  assert.is(secondHalf.size, 8);

  assert.is(deck.split, deck.cut, "split() is an alias for cut()");
});

test("setRandomSeed(), getRandomIndex()", assert => {
  let deck = createDeckOf10();
  assert.true(isFunction(deck.setRandomSeed), "setRandomSeed() is a function.");
  assert.true(
    isFunction(deck.getRandomIndex),
    "getRandomIndex() is a function."
  );

  deck.setRandomSeed("seed");
  const get10RandomItems = () =>
    new Array(10)
      .fill(0)
      .map(() => deck.getRandomIndex())
      .join("-");
  let tenRandomItems = get10RandomItems();
  const expected = "5-8-7-7-3-1-3-5-1-1"; // added manually after first experiment

  assert.is(
    tenRandomItems,
    expected,
    "Deterministic random gives us the same value always."
  );

  deck.setRandomSeed("seed");
  let tenMoreRandomItems = get10RandomItems();
  assert.is(
    tenMoreRandomItems,
    tenRandomItems,
    "Setting the random seed again will restart the random sequence"
  );

  deck.setRandomSeed();
  let tenReallyRandomItems = get10RandomItems();
  assert.not(
    tenReallyRandomItems,
    tenRandomItems,
    "Setting random seed to undefined uses a non deterministic random number. This should (almost) never generate the same number as the deterministic one."
  );
});

test("drawRandom()", assert => {
  let deck = createDeckOf10();
  assert.true(isFunction(deck.drawRandom), "drawRandom() is a function.");

  deck.setRandomSeed("seed");
  let [hand, newDeck] = deck.drawRandom();
  assert.is(
    hand.get(0),
    5,
    "Draws a element from random index of remaining items"
  );
  assert.is(hand.size, 1, "Draws one element by default");
  assert.is(newDeck.size, 9, "Removes element from new deck.");

  deck.setRandomSeed("seed");
  [hand, newDeck] = deck.drawRandom(5);
  assert.is(
    hand.get(0),
    5,
    "Draws a element from random index of remaining items"
  );
  assert.is(
    hand.get(1),
    8,
    "The index of the subsequent draws is random (not sequential)"
  );
  assert.is(hand.get(2), 7);
  assert.is(hand.get(3), 6);
  assert.is(hand.get(4), 2);
  assert.is(hand.size, 5, "Draws the number of elements you ask for");
  assert.is(newDeck.size, 5, "Removes element from new deck.");
  assert.is(
    newDeck.join("-"),
    "0-1-3-4-9",
    "New deck elements remain in same order and contain none of the drawn items."
  );
});

test("addRandom()", assert => {
  let deck = createDeckOf10();
  assert.true(isFunction(deck.addRandom), "addRandom() is a function.");

  deck.setRandomSeed("seed");
  let newDeck = deck.addRandom("joker");
  assert.is(newDeck.size, 11, "Adds a new item");
  assert.is(newDeck.get(5), "joker", "Adds at a random position");

  deck.setRandomSeed("seed");
  newDeck = deck.addRandom("a", "b", "c");
  assert.is(newDeck.size, 13, "Adds several items");
  assert.is(newDeck.get(5), "a", "Adds first item at a random position");
  assert.is(
    newDeck.get(10),
    "b",
    "Adds subsequent items at a random positions"
  );
  assert.is(newDeck.get(9), "c");

  assert.is(newDeck.addRandom, newDeck.shuffleInto);
});

test("shuffle()", assert => {
  let deck = createDeckOf10();
  assert.true(isFunction(deck.setRandomSeed), "setRandomSeed() is a function.");
  assert.true(isFunction(deck.shuffle), "shuffle() is a function.");

  deck.setRandomSeed("seed");
  let shuffledDeck = deck.shuffle();
  assert.not(shuffledDeck, deck, "shuffle() produces a new copy");
  assert.is(
    shuffledDeck.join("-"),
    "2-6-3-8-0-1-9-5-7-4",
    "Shuffle returns a new deck with randomized order."
  );

  deck.setRandomSeed();
  assert.not(
    deck.shuffle().join(""),
    deck.join(""),
    "non-deterministic shuffle. This should (almost) never generate the same number as the deterministic one."
  );
});
