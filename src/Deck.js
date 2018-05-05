import { Stack } from "extendable-immutable";

class Deck extends Stack {
  constructor(value) {
    super(value);
  }

  draw(n = 1) {
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

  add(element, ...rest) {
    let elements;
    // element = Collection.isCollection(element) ? elment.toArray() : element;
    if (element instanceof Array) {
      elements = element;
    } else {
      elements = [element];
    }
    elements.push(...rest);
    return this.push(...elements);
  }

  addToTop(...args) {
    return this.add(...args);
  }
}

export default Deck;
