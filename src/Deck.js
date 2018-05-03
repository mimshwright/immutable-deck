import { Stack } from "immutable";

class Deck extends Stack {
  constructor(value) {
    super(value);
  }

  static of(value) {
    return Stack.of(value);
  }
}

export default Deck;
