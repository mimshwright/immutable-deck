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
}

export default Deck;
