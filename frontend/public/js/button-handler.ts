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
  // TODO remove err
  document.querySelector('body').addEventListener('click', ({ target }) => {
    const { classList } = target;
    console.log(target);
    // handler for favorite-img
    const favClassListRegex = new RegExp(
      'fav(__(inner|outer)|-img)|btn-fav-img',
    );
    // check if fav-img clicked
    if (favClassListRegex.test(classList)) {
      let favItem = target;
      // loop through the parents to get the parent with dataset _id and name (name only for savety-reasons)
      do {
        console.log(!favItem.dataset['_id'] && !favItem.dataset['name']);
        favItem = favItem.parentNode;
      } while (!favItem.dataset['_id'] && !favItem.dataset['name']);
      const { _id } = favItem.dataset;
      // toggle class on parent-svg-element for marking the icon
      document
        .querySelector(`svg[data-_id="${_id}"].fav-img`)
        .classList.toggle('marked-as-fav');
      // change isFavorite in store
      const selectedItem = store.getItemByID(_id);
      selectedItem.isFavorite = !selectedItem.isFavorite;
      store.updateItem(selectedItem);
    }
  });
}
