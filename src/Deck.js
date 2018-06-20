import { Stack } from "extendable-immutable";
import createRandomNumberGenerator from "random-seed";

let random = createRandomNumberGenerator.create();

class Deck extends Stack {
  set(index, value) {
    return this.splice(index, 1, value);
  }

  /**
   * Add any number of elements at the index you specify.
   */
  addAt = (index, ...elements) => this.splice(index, 0, ...elements);

  /**
   * Add any number of elements to the top (front) of the deck.
   */
  addToTop = (...elements) => new Deck(this.push(...elements));

  /**
   * Add any number of elements to the bototm (back) of the deck.
   */
  addToBottom = (...elements) => this.addAt(this.size, ...elements);

  /**
   * Add elements to random positions in the deck.
   */
  addRandom = (...elements) =>
    elements.reduce((deck, element) => {
      const i = deck.getRandomIndex();
      return deck.addAt(i, element);
    }, this);

  /**
   * Gets n items from the top (front) of the deck.
   * Returns an array with [itemsDrawn, remainingItems].
   */
  drawFromTop = (n = 1) => [this.take(n), this.skip(n)];

  /**
   * Gets n items from the bottom (back) of the deck.
   * Returns an array with [itemsDrawn, remainingItems].
   */
  drawFromBottom = (n = 1) => [this.takeLast(n).reverse(), this.skipLast(n)];

  /**
   * Gets n items starting at index.
   * Returns an array with [itemsDrawn, remainingItems].
   */
  drawFrom = (index, n = 1) => [
    this.skip(index).take(n),
    this.splice(index, n),
  ];

  /**
   * Gets n items from random locations.
   * The location is randomized after each item is drawn.
   * Returns an array with [itemsDrawn, remainingItems].
   */
  drawRandom = (n = 1) => {
    const deck = this.toArray();
    const hand = [];
    while (n > 0) {
      n--;
      const i = random(deck.length);
      hand.push(deck[i]);
      deck.splice(i, 1);
    }
    return [new Deck(hand), new Deck(deck)];
  };

  /**
   * Deals items to a specified number of groups.
   * An item is moved from this deck to each new group (a Deck) in a sequence
   * until the size of each group is the same as the elementCount,
   * or until there are no more items left.
   * Returns an array with [group0, group1, ..., groupN-1, remainingItems];
   */
  dealFromTop = (groupCount, elementCount = -1) => {
    let newDeck;
    let groups = new Deck();
    const totalDealt = elementCount < 0 ? this.size : groupCount * elementCount;

    this.forEach((element, i) => {
      if (i >= totalDealt) return;
      const groupIndex = i % groupCount;

      let group = (groups.get(groupIndex) || new Deck()).push(element);
      groups = groups.set(groupIndex, group);
    });

    newDeck = this.splice(0, totalDealt);

    return groups.toArray().concat([newDeck]);
  };

  /**
   * Same as deal but cards are taken from bottom
   */
  dealFromBottom = (groupCount, elementCount = -1) =>
    this.reverse()
      .deal(groupCount, elementCount)
      .map(deck => deck.reverse());

  /**
   * Splits the deck into two decks at the index.
   * If you do not provide an index, it cuts at the middle of the Deck.
   */
  cut = (index = Math.ceil(this.size / 2)) => this.draw(index);

  /**
   * Instantiates a new random number generator used random methods like shuffle().
   * If you provide a seed, the random number sequence will
   * always be the same, that is, random but predictable.
   * (See https://www.npmjs.com/package/random-seed for more details.)
   */
  setRandomSeed = (seed = undefined) =>
    (random = createRandomNumberGenerator(seed));

  /** Return a random index in this Deck */
  getRandomIndex = () => random(this.size);

  /**
   * Fisher Yates shuffle
   * (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
   */
  shuffle = () => {
    // Use a mutable array for this. It's exponentially faster.
    const a = this.toArray();
    let remaining = a.length;
    while (remaining > 0) {
      remaining -= 1;
      const i = random(remaining);
      const temp = a[i];
      a[i] = a[remaining];
      a[remaining] = temp;
    }
    return new Deck(a);
  };

  // Aliases
  draw = this.drawFromTop;
  deal = this.dealFromTop;
  add = this.addToTop;
  shuffleInto = this.addRandom;
  split = this.cut;
}

export default Deck;
