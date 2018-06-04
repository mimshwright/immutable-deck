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


# API

Important: `Deck` extends `[Immutable.Stack](https://facebook.github.io/immutable-js/docs/#/Stack)` so be sure to familiarize yourself with Immutable's API. it can do everything that a `Stack` can do plus the following...  

## Basics 

### `size`
Property (inherited from Stack). Get the number of itmes in the deck.

### `get( index )`
(inherited from Stack). Get the value of the item at the index.

### `set( index, value )`
Sets a value at the given index. 


## Adding items to deck

### `addToTop( ...items )`
_alias `add( ...items )`_
### `addToBottom( ...items )`
### `addToAt( index, ...items )`

## Drawing items from deck

### `drawFromTop( n )`
_alias `draw( n )`_
### `drawFromBottom( n )`
### `drawFrom( index, n )`

## Random

### `shuffle()`
### `addRandom( ...items )`
_alias `shuffleInto( ...items )`_
### `drawRandom( n )`
### `getRandomItemIndex()`
### `setRandomSeed( seed? )`

## Dealing

### `dealFromTop( groups, itemsPerGroup )` 
_alias `deal( groups, itemsPerGroup )`_
### `dealFromBottom( groups, itemsPerGroup )` 

## Other

### `move()`
### `cut( index )`
_alias `split( index )`

