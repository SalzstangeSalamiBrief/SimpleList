import ListItem from './interfaces/list-item';

import Store from './model/list-store';
import ButtonHandler from './handler/button-handler';
import FormHandler from './handler/form-handler';
import DialogHandler from './handler/dialog-handler';
import EventHandler from './event-handler';
import TableRenderer from './table-renderer';
import FetchController from './fetch-controller';
import ErrorController from './error-controller';
// add eventhandler
// TODO: SUbmit event

window.addEventListener('DOMContentLoaded', async () => {
  const fetchController = new FetchController();
  const store = new Store(fetchController);
  const formHandler = new FormHandler();
  const buttonHandler = new ButtonHandler();
  const dialogHandler = new DialogHandler();
  const errorController = new ErrorController();
  const eventHandler = new EventHandler(
    buttonHandler,
    dialogHandler,
    formHandler,
    TableRenderer,
    store,
    errorController,
  );
  const initListEntries = <Array<ListItem>>(
    await fetchController.getAllEntriesFromServer()
  );
  // console.log(initListEntries);
  for (let i = 0; i < initListEntries.length; i += 1) {
    store.addItem(initListEntries[i]);
  }
  console.log(store.getSelectedListItems());
  TableRenderer(store.getSelectedListItems());
  // console.log(initListEntries);
});

// console.log(store);

// const temp = [
//   {
//     name: 'a',
//     tags: ['ap'],
//     _id: '12',
//     isFavorite: false,
//   },
//   {
//     name: 'c',
//     tags: ['aaa'],
//     _id: '11',
//     isFavorite: true,
//   },
//   {
//     name: 'b',
//     tags: ['hs', 'jki'],
//     _id: '31',
//     isFavorite: false,
//   },
//   {
//     name: 'd',
//     tags: ['qq'],
//     _id: '97',
//     isFavorite: false,
//   },
// ];

// temp.forEach((item) => {
//   store.addItem(item);
// });

// TableRenderer(store.getSelectedListItems());
