import { Stack } from "immutable";

class Deck extends Stack {
  constructor(value) {
    super(value);
  }

  draw() {
    return "Draw!";
  }
}

export default Deck;

const d = new Deck([0, 1, 2, 3]);
console.log("d:" + d);
console.log("d.size:" + d.size);
console.log("d.peek:" + d.peek);
console.log("d.draw:" + d.draw);
