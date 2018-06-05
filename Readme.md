# immutable-deck

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

## Todo

- [ ] API Documentation
- [ ] Clean up dependencies and double check code 
- [ ] Publish on NPM
- [ ] Create example


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

#### `get( index )`
(inherited from Stack). Get the value of the item at the index.

#### `set( index, value )`
Sets a value at the given index. 


### Adding items to deck

#### `addToTop( ...items )`
_alias `add( ...items )`_
#### `addToBottom( ...items )`
#### `addToAt( index, ...items )`

### Drawing items from deck

#### `drawFromTop( n )`
_alias `draw( n )`_
#### `drawFromBottom( n )`
#### `drawFrom( index, n )`

### Random

#### `shuffle()`

##### Example
```
const deck = new Deck([0, 1, 2, 3, 4, 5]);
deck.shuffle(); // Deck([0, 1, 2, 3, 4, 5])
```

#### `addRandom( ...items )`
_alias `shuffleInto( ...items )`_
#### `drawRandom( n )`
#### `getRandomItemIndex()`
#### `setRandomSeed( seed? )`

### Dealing

#### `dealFromTop( groups, itemsPerGroup )` 
_alias `deal( groups, itemsPerGroup )`_
#### `dealFromBottom( groups, itemsPerGroup )` 

### Other

#### `move()`

#### `cut( index? )`

Splits the deck into two decks. If index is `undefined`, the deck is split right down the middle (if there are an odd number of items, the extra item is added to the first deck).

Returns an array containing two deck objects.

##### Example
```
const deck = new Deck([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
deck.cut(); // [ Deck([0, 1, 2, 3, 4, 5]), Deck([6, 7, 8, 9, 10]) ]
deck.cut(3); // [ Deck([0, 1, 2]), Deck([3, 4, 5, 6, 7, 8, 9, 10]) ]
```

_alias `split( index )`

