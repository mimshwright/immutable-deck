# immutable-deck

Data structure for representing decks (of cards) based on Immutable.js Stacks.

## Features

- [X] Add elements to the deck
  - [X] ...to the top,
  - [X] bottom,
  - [X] at an arbitrary place,
  - [X] or at a random place.
- [X] Draw one or more elements from the deck 
  - [X] ...from the top,
  - [X] bottom,
  - [X] or at an arbitrary place,
  - [X] or at a random place.
- [X] Move items from one deck to another.
- [X] Deal an arbitrary number of items from the Deck into an arbitrary number of groups.
  - [X] ... from the top
  - [X] from the bottom
  - [X] deal out all the items in the deck to the groups.
- [X] Split/cut the deck
  - [X] ...in half
  - [X] At an arbitrary point
- [X] Count the number of items in the deck.
- [X] Shuffle the contents of the deck.
- [X] Unshuffle (sort) the contents of the deck.
- [X] Reverse order of deck.
- [X] Random methods are deterministic (can be reproduced with the same random seed).

## FAQ

### What about Hands of cards, piles of cards, the river, etc.?

Since there is technically no difference between a hand and a deck the same data structure can be used for both. Therefore, methods like `draw()` return items drawn as a new Deck. 

### Can this be used for card games other than the standard deck of cards?

Yes. In fact, Deck doesn't make any assumptions about what kind of values you put inside it. You can use strings, numbers, complex card objects, or anything else.

### Why not just mutate the deck? It seems like way more work to create new decks all the time. 

Immutability offers [many benefits](https://www.youtube.com/watch?v=Wo0qiGPSV-s) but if you're looking for a mutable version, [card-deck](https://www.npmjs.com/package/card-deck) looks like a pretty good one.

### Where are the card graphics? 

This library is all about organizing the elements (cards) in the deck but it doesn't provide any definition of what the card should be. You will need to define your own way to render the elements inside. 

## API

Important: `Deck` extends `[Immutable.Stack](https://facebook.github.io/immutable-js/docs/#/Stack)` so be sure to familiarize yourself with Immutable's API. it can do everything that a `Stack` can do plus the following...  

### Basics 

#### `size`
Property (inherited from Stack). Get the number of itmes in the deck.

##### Example
```
const deck = new Deck(["a", "b", "c"]);
deck.size; // 3
```

#### `get( index )`
(inherited from Stack). Get the value of the item at the index.

##### Example
```
const deck = new Deck(["a", "b", "c"]);
deck.get(1); // "b"
```

#### `set( index, value )`
Sets a value at the given index. 

##### Example
```
const deck = new Deck(["a", "😐", "c"]);
deck.set(1, "b"); // ["a", "b", "c"]
```

### Adding items to deck

These functions add one or more items to the deck. Returns a new Deck with the items added. Items which are collections are not automatically flattened, that is, they are added as collections.

#### `addToTop( ...items )`
_alias `add( ...items )`_

`add()` and `addToTop()` add items to the top (front) of the deck. 

##### Example
```
const deck = new Deck(["c", "d"]);
deck.add("a", "b"); // ["a", "b", "c", "d"]

// Collections are not flattened.
deck.add(["a", "b"]); // [["a", "b"], "c", "d"]

// Use spread to flatten collections.
deck.add(...["a", "b"]); // ["a", "b", "c", "d"]
```

#### `addToBottom( ...items )`

Adds items to the bottom (back) of the deck.

##### Example
```
const deck = new Deck(["c", "d"]);
deck.addToBottom("e", "f"); // ["c","d","e","f"]
```

#### `addAt( index, ...items )`

Add items at a specific index.

##### Example
```
const deck = new Deck(["c", "d"]);
deck.addAt(1, "c.5"); // ["c","c.5","d"]
```

### Drawing items from deck

These functions remove `n` items from the deck (if `n` is `undefined`, it defaults to `1`). Returns an array whose first element is a Deck of items drawn and the second element is the original Deck without the items drawn.

#### `drawFromTop( n )`
_alias `draw( n )`_

Draw `n` items from the top (front) of the deck. 

##### Example
```
const deck = new Deck([0, 1, 2, 3, 4]);
const [hand, newDeck] = deck.draw(3); 
hand; // [0, 1, 2]
newDeck; // [3, 4]

// Defaults to drawing 1 item.
deck.draw(); // [ [0], [1, 2, 3, 4] ]

// Drawing more items than the size of the deck returns
// an empty collection for the new deck.
deck.draw(1000); // [ [0, 1, 2, 3, 4], [] ]
```

#### `drawFromBottom( n )`

Draw `n` items from the bottom (back) of the deck.

##### Example
```
const deck = new Deck([0, 1, 2, 3, 4]);
const [hand, newDeck] = deck.drawFromBottom(3); 
hand; // [4, 3, 2] note order is reversed
newDeck; // [0, 1]
```

#### `drawFrom( index, n )`

Draw `n` items from a specific index.

##### Example
```
const deck = new Deck([0, 1, 2, 3, 4]);
const [hand, newDeck] = deck.drawFrom(1, 3); 
hand; // [1, 2, 3] note order is reversed
newDeck; // [0, 4]
```

### Random

#### `shuffle()`

Shuffles the items. Returns a new Deck with elements randomly reordered. 

##### Example
```
const deck = new Deck([0, 1, 2, 3, 4, 5]);
deck.shuffle(); // Deck([3, 5, 4, 0, 2, 1])
```

#### `addRandom( ...items )`
_alias `shuffleInto( ...items )`_

Returns a new deck with one or more values added at random positions. Each item is given a random location in the deck.

##### Example
```
let deck = new Deck([0,1,2,3,4,5,6,7,8,9]);
let newDeck = deck.addRandom("a", "b", "c"); // [0,1,2,3,4,"a",5,6,7,"c","b",8,9]
```

#### `drawRandom( n )`

Draw `n` cards from `n` random positions in the deck. A new random position is chosen for each card.

##### Example
```
const deck = new Deck([0, 1, 2, 3, 4]);
const [hand, newDeck] = deck.drawRandom(3); 
hand; // [4, 3, 0] note order is random
newDeck; // [1, 2]
```

#### `getRandomIndex()`

Returns a random index in the deck. 

##### Example
```
const deck = new Deck(["a", "b", "c", "d", "e", "f", "g"]);
deck.getRandomIndex(); // 1
deck.getRandomIndex(); // 5
deck.getRandomIndex(); // 3
```

#### `setRandomSeed( seed? )`

All randomized functions use a special deterministic random number generator, [random-seed](https://github.com/skratchdot/random-seed). This allows you to produce repeatable sequences of random numbers that guarantee the same order of random numbers when you use the same seed. This is useful for testing or, for example, if you want to have a global challenge mode in a card game where the cards are shuffled identically for every player. 

`setRandomSeed()` sets the random seed for the random number sequence used by functions like `shuffle()`. Set to a constant value to create the same sequence of random numbers every time your app is run. Set to undefined to create an unpredictable sequence. See [random-seed](https://github.com/skratchdot/random-seed) for more details.

You don't need to call `setRandomSeed()` to use the other functions. By default, the random seed is a random value.

##### Example
```
let numbers = new Deck([0,1,2,3,4,5]);
// Set a random seed.
numbers.setRandomSeed(1);
numbers.shuffle(); // [ 5, 2, 4, 0, 3, 1 ]
numbers.shuffle(); // [ 3, 2, 5, 1, 0, 4 ]
numbers.shuffle(); // [ 2, 4, 1, 0, 5, 3 ]

// Set the random seed again to repeat the sequence.
numbers.setRandomSeed(1);
numbers.shuffle(); // [ 5, 2, 4, 0, 3, 1 ]
numbers.shuffle(); // [ 3, 2, 5, 1, 0, 4 ]
numbers.shuffle(); // [ 2, 4, 1, 0, 5, 3 ]

// Set to a different seed to change the sequence.
numbers.setRandomSeed(2);
numbers.shuffle(); // [ 5, 0, 1, 2, 3, 4 ]

// Use undefined to use a random sequence
numbers.setRandomSeed();
numbers.shuffle(); // [ 4, 2, 0, 1, 5, 3 ]
numbers.setRandomSeed();
numbers.shuffle(); // [ 1, 0, 3, 5, 2, 4 ]
numbers.setRandomSeed();
numbers.shuffle(); // [ 5, 2, 0, 1, 3, 4 ]
```

### Dealing

These funcitons distribute the elements of a deck into one or more groups in a cyclical fashion, in other words, they deal out the elements like cards. You can specify the number of groups (hands) to deal out and the number of items to deal to each group. If `itemsPerGroup` is undefined, all remaining items are dealt (this may result in some groups having 1 more item than other groups). 

Results are returned as an array with the last element being the new deck and the remaining elements being the groups. 

#### `dealFromTop( groups, itemsPerGroup? )` 
_alias `deal( groups, itemsPerGroup )`_

Deals from the top (front) of the deck. 

##### Example
```
let hand0, hand1, hand2, newDeck;
let deck = new Deck([0,1,2,3,4,5,6,7,8,9]);

// Deal 3 cards to 2 hands
[hand0, hand1, newDeck] = deck.deal(2, 3);
hand0; // [0, 2, 4]
hand1; // [1, 3, 5]
newDeck; // [6, 7, 8, 9]

// Deal all cards to 3 hands
[hand0, hand1, hand2, newDeck] = deck.deal(3);
hand0; // [0, 3, 6, 9]
hand1; // [1, 4, 7]
hand2; // [2, 5, 8]
newDeck; // []
```

#### `dealFromBottom( groups, itemsPerGroup? )` 

Deals from the bottom (back) of the deck. 

##### Example
```
let deck = new Deck([0,1,2,3,4,5,6,7,8,9]);
deck.dealFromBottom(2,2); // [ [9, 7], [8, 6], [0, 1, 2, 3, 4, 5] ]
```

### Other

#### `cut( index? )`
_alias `split( index )`_

Splits the deck into two decks. If index is `undefined`, the deck is split right down the middle (if there are an odd number of items, the extra item is added to the first deck).

Returns an array containing two deck objects.

##### Example
```
const deck = new Deck([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
deck.cut(); // [ [0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10] ]
deck.cut(3); // [ [0, 1, 2], [3, 4, 5, 6, 7, 8, 9, 10] ]
```


## Contributing

If you'd like to make this project better, here are ways you can help.

- Give your feedback
- Log bugs
- Fix bugs
- Suggest a feature
- Improve the documentation
- Improve the examples

### Contributors

- [Mims H. Wright](http://mimswright.com) - Owner
