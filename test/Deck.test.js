import test from "ava";
import {Stack} from "immutable"
import Deck from "../src/Deck";

import isFunction from "lodash/isFunction";

const createDeckOf10 = () => new Deck([0,1,2,3,4,5,6,7,8,9]);


test("Hello world!", assert => {
  assert.pass("Checking that AVA is running.");
});

test("Deck exists", assert => {
  assert.truthy(Deck, "Deck exists");
  let deck = createDeckOf10();
  assert.true(deck instanceof Stack, "Deck extends Stack.");
  assert.true(deck instanceof Deck, "new Deck() returns an instance of Deck.");
});

test("draw()", assert => {
  let deck = createDeckOf10();
  assert.true(isFunction(deck.draw));
})
