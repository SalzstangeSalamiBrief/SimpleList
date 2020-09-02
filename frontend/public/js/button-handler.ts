import StoreFunctions from '../interfaces/store-functions';

const addDialog = <HTMLDialogElement>(
  document.querySelector('dialog#dialog-container')
);
const nameInput = <HTMLInputElement>(
  document.querySelector('[name="add-dialog__name"')
);
const tagsInput = <HTMLInputElement>(
  document.querySelector('[name="add-dialog__tags"')
);

let isDialogOpen: Boolean = false;

function resetAddForm() {
  nameInput.value = '';
  tagsInput.value = '';
}

/**
 * Function for changing the isFavorite property of the corresponding listEntry
 * @param target DOMElement
 * @param store StoreFunctions
 */
function handleChangeInIsFavorite(target, store: StoreFunctions) {
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
  return;
}

// TODO: maybe remove dummy renderer
// function to add eventListeners
export default function (
  submitDialogHandler: Function,
  store: StoreFunctions,
  renderer,
) {
  //TODO:  temp test
  // TODO remove err
  document.querySelector('body').addEventListener('click', ({ target }) => {
    console.log(target);
    const targetClassList: DOMTokenList = target.classList;
    const targetID: String = target.id;
    // const targetTag: String = target.tagName.toLowerCase();

    // handler for open-add-btn
    if (targetID === 'open-add-dialog') {
      addDialog.classList.remove('is-hidden');
      isDialogOpen = true;
      return;
    }

    // handler for submitting the add-form
    if (targetID === 'submit-add-item') {
      // todo: maybe problems because submitDialogHandler will be async => fix with async-await
      submitDialogHandler();
      resetAddForm();
      isDialogOpen = false;
      return;
    }

    // handler for cancel adding the form
    if (targetID === 'cancel-adding') {
      resetAddForm();
      addDialog.classList.add('is-hidden');
      isDialogOpen = false;
      return;
    }

    // handler  for clicking on the dialog-container
    if (isDialogOpen) {
      if (targetID === 'dialog-container') {
        // TODO: reset dynamic form (Add || Delete || Edit)
        resetAddForm();
        addDialog.classList.add('is-hidden');
        isDialogOpen = false;
        return;
      }
    }

    // handler for favorite-img
    const favClassListRegex = new RegExp(
      'fav(__(inner|outer)|-img)|btn-fav-img',
    );
    // check if fav-img clicked
    if (favClassListRegex.test(targetClassList)) {
      // Potential problems because of update: async-await
      handleChangeInIsFavorite(target, store);
      return;
    }
  });
}
