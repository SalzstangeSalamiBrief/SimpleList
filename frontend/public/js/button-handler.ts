import StoreFunctions from '../interfaces/store-functions';

const addDialog = <HTMLDialogElement>(
  document.querySelector('dialog.add-dialog-container')
);
const nameInput = <HTMLInputElement>(
  document.querySelector('[name="add-dialog__name"')
);
const tagsInput = <HTMLInputElement>(
  document.querySelector('[name="add-dialog__tags"')
);
// TODO: maybe remove store Dummy
// function to add eventListeners
export default function (
  submitDialogHandler: Function,
  store: StoreFunctions,
  renderer,
) {
  // add eventListener to the cancel-button in the add-dialog
  document
    .querySelector('button#cancel-adding')
    .addEventListener('click', () => {
      addDialog.classList.add('is-hidden');
      // reset form
      nameInput.value = '';
      tagsInput.value = '';
    });
  // add eventListener to the add button in the main-element
  document.querySelector('#open-add-dialog').addEventListener('click', () => {
    addDialog.classList.remove('is-hidden');
  });
  // add submitEvent to add btn in the form
  document
    .querySelector('button#submit-add-item')
    .addEventListener('click', () => {
      submitDialogHandler();
    });

  //TODO:  temp test
  document.querySelector('main').addEventListener('click', ({ target }) => {
    if (target.dataset['listIndex']) {
      const listIndex = target.dataset['listIndex'];
      const selectedItem = store.getItemByIndex(listIndex);
      selectedItem.isFavorite = !selectedItem.isFavorite;
      store.updateItem(selectedItem);
      renderer(store.getSelectedListItems());
      // store.
      console.log(target);
    }
  });
}

// let item = <HTMLElement>e.target;
// do {

// } while (!item.dataset['list-index'])
