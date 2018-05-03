import test from "ava";
import {Stack} from "immutable"
import Deck from "../src/Deck";

test("Hello world!", assert => {
  assert.pass("Checking that AVA is running.");
});

test("Deck exists", assert => {
  assert.truthy(Deck, "Deck exists");
  const deck = new Deck();
  console.log(deck);
  assert.true(deck instanceof Deck, "new Deck() returns an instance of Deck.");
  assert.true(deck instanceof Stack, "Deck extends Stack.");
});
