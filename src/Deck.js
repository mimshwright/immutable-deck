import { Stack } from "extendable-immutable";

class Deck extends Stack {
  constructor(value) {
    super(value);
  }

  drawFromTop = (n = 1) => [this.take(n), this.skip(n)];

  drawFromBottom = (n = 1) => [this.takeLast(n).reverse(), this.skipLast(n)];

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

  // Aliases
  draw = this.drawFromTop;
  deal = this.dealFromTop;
  add = this.addToTop;
  split = this.cut;
}

export default Deck;
