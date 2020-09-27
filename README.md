# SimpleList
A simple list for everyone.
This application contains a list of items who got a name and tags. You can add, edit and delete items.
In addition to that you can filter all items in the list by tags. Just type your search into the corresponding input.
If you want to search for the absence of a tag in the items, just put an exclamation mark in front of the tag.
As example you can search for items with the tag "comedy" and the absence of the tag "sports" with the input "comedy !sports".

## dev
in ./backend
```
// change to /backend
$ cd backend
// setup db
$ npm run database:setup
```
in ./frontend
```
```

in /
```
$ npm run dev
```

## Production
```
```

## TODO
- add favicon
- refactor ui
  - add interactive elements for importing and exporting lists
  - add a help button (show a explanation of the app (e.g. intro in this readme))
- fix return errors in /frontend/view
- add build command

## Possible Improvements
1. Add responsiveness for mobile devices (+refactor table)
  i. This application is currently builded for widescreens (1920x1080, 16:9).
2. add wai aria 2.0
3. Refactor renderer in the frontend or replace them by a framework/vdom