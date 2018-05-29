import { Stack } from "extendable-immutable";
import R from "ramda";

class Deck extends Stack {
  constructor(value) {
    super(value);
  }

  drawFromTop(n = 1) {
    if (n > this.size)
      throw new RangeError(
        "You can't draw more items than the size of the deck."
      );
    return [this.take(n), this.skip(n)];
  }

  drawFromBottom(n = 1) {
    if (n > this.size)
      throw new RangeError(
        "You can't draw more items than the size of the deck."
      );
    return [this.takeLast(n).reverse(), this.skipLast(n)];
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

  set(index, value) {
    return this.splice(index, 1, value);
  }

  addToTop = (element, ...rest) => new Deck(this.push(element, ...rest));

  addToBottom = (element, ...rest) =>
    this.splice(this.size, 0, element, ...rest);

  addAt = R.curry((index, element, ...rest) =>
    this.splice(index, 0, element, ...rest)
  );

  // Aliases
  draw = this.drawFromTop;
  deal = this.dealFromTop;
  add = this.addToTop;
}

export default Deck;
