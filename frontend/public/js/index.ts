import CreateStore from './list-store';
import ButtonHandler from './button-handler';
import FormHandler from './form-handler';
// todo test
import TableRenderer from './table-renderer';
// add eventhandler
// TODO: SUbmit event
const store = CreateStore();
const addAction = FormHandler(store);

console.log(store);

const temp = [
  {
    name: 'a',
    tags: ['öp'],
  },
  {
    name: 'c',
    tags: ['aaa'],
  },
  {
    name: 'b',
    tags: ['hs', 'jki'],
  },
  {
    name: 'd',
    tags: ['qq'],
  },
];

temp.forEach((item) => {
  store.addItem(item);
});

TableRenderer(store.getSelectedListItems());
ButtonHandler(addAction, store, TableRenderer);
