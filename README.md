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
- Add export and import from an actual list as functionality
-- add routes to server
--- export list
--- import list
- add favicon
- maybe cache on server?
- refactor ui
-- add interactive elements for importing and exporting lists
-- add a help button (show a explanation of the app (e.g. intro in this readme))

## Possible Improvements
1. Add responsiveness for mobile devices (+refactor table)
1.1. This application is currently builded for widescreens (1920x1080, 16:9).
2. add wai aria 2.0
