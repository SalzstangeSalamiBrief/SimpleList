import Store from './list-store';
import ButtonHandler from './button-handler';
import FormHandler from './form-handler';
// todo test
import TableRenderer from './table-renderer';
// add eventhandler
// TODO: SUbmit event
const store = new Store();
const formHandler = new FormHandler(store);

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
new ButtonHandler(formHandler, store, TableRenderer);
