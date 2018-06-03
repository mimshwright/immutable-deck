import { Stack } from "extendable-immutable";
import createRandomNumberGenerator from "random-seed";

let random = createRandomNumberGenerator.create();

class Deck extends Stack {
  constructor(value) {
    super(value);
  }

  drawFromTop = (n = 1) => [this.take(n), this.skip(n)];

  drawFromBottom = (n = 1) => [this.takeLast(n).reverse(), this.skipLast(n)];

  drawFrom = (index, n = 1) => [
    this.skip(index).take(n),
    this.splice(index, n),
  ];

  move(targetDeck, n) {
    const [drawnItems, sourceDeck] = this.draw(n);
    return [targetDeck.add(...drawnItems), sourceDeck];
  }

  dealFromTop(groupCount, elementCount = -1) {
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
  }

  dealFromBottom = (groupCount, elementCount = -1) =>
    this.reverse().deal(groupCount, elementCount);

  set(index, value) {
    return this.splice(index, 1, value);
  }

  addToTop = (firstElement, ...rest) =>
    new Deck(this.push(firstElement, ...rest));

  addToBottom = (element, ...rest) =>
    this.splice(this.size, 0, element, ...rest);

  addAt = (index, firstElement, ...rest) =>
    this.splice(index, 0, firstElement, ...rest);

  cut = (index = Math.ceil(this.size / 2)) => this.draw(index);

  setRandomSeed = (seed = undefined) =>
    (random = createRandomNumberGenerator(seed));

  getRandomItemIdex = () => random(this.size);

  // Fisher Yates shuffle (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
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
  split = this.cut;
}

export default Deck;
