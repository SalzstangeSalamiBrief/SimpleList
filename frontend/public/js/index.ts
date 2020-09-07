import Store from './list-store';
import ButtonHandler from './handler/button-handler';
import FormHandler from './handler/form-handler';
import DialogHandler from './handler/dialog-handler';
import EventHandler from './event-handler';
// todo test
import TableRenderer from './table-renderer';
import tableRenderer from './table-renderer';
// add eventhandler
// TODO: SUbmit event
const store = new Store();
const formHandler = new FormHandler();
const buttonHandler = new ButtonHandler();
const dialogHandler = new DialogHandler();
const eventHandler = new EventHandler(
  buttonHandler,
  dialogHandler,
  formHandler,
  tableRenderer,
  store,
);

console.log(store);

const temp = [
  {
    name: 'a',
    tags: ['ap'],
    _id: '12',
    isFavorite: false,
  },
  {
    name: 'c',
    tags: ['aaa'],
    _id: '11',
    isFavorite: true,
  },
  {
    name: 'b',
    tags: ['hs', 'jki'],
    _id: '31',
    isFavorite: false,
  },
  {
    name: 'd',
    tags: ['qq'],
    _id: '97',
    isFavorite: false,
  },
];

temp.forEach((item) => {
  store.addItem(item);
});

TableRenderer(store.getSelectedListItems());
