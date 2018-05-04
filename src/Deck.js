import { Stack } from "extendable-immutable";

class Deck extends Stack {
  constructor(value) {
    super(value);
  }

  draw(n = 1) {
    if (n > this.size)
      throw new RangeError("You can't draw more items than exist in the deck");
    return [this.take(n), this.skip(n)];
  }
}

export default Deck;
