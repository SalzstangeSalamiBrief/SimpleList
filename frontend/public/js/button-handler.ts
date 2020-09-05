import StoreFunctions from '../interfaces/store-functions';

// TODO: This class is actually only build for adding stuff
//            Add Dynamic choices between add, delete, update
export default class ButtonHandler {
  private addDialog: HTMLDialogElement;
  private nameInput: HTMLInputElement;
  private tagsInput: HTMLInputElement;
  private isDialogOpen: Boolean;
  private store;
  private formHandler;
  private renderer;
  constructor(formHandler, store, renderer) {
    this.addDialog = <HTMLDialogElement>(
      document.querySelector('dialog#dialog-container')
    );
    this.nameInput = <HTMLInputElement>(
      document.querySelector('[name="add-dialog__name"')
    );
    this.tagsInput = <HTMLInputElement>(
      document.querySelector('[name="add-dialog__tags"')
    );
    this.isDialogOpen = false;
    this.store = store;
    this.formHandler = formHandler;
    this.renderer = renderer;
    this.addEventListenerToBody();
  }

  addEventListenerToBody() {
    document.querySelector('body').addEventListener('click', (e) => {
      this.bodyEventHandler.call(this, e);
    });
  }

  bodyEventHandler({ target }) {
    // console.log(target);
    const targetClassList: DOMTokenList = target.classList;
    const targetID: String = target.id;
    // const targetTag: String = target.tagName.toLowerCase();

    // handler for open-add-btn
    if (targetID === 'open-add-dialog') {
      this.addDialog.classList.remove('is-hidden');
      this.isDialogOpen = true;
      return;
    }

    // handler for submitting the add-form
    if (targetID === 'submit-add-item') {
      // todo: maybe problems because submitDialogHandler will be async => fix with async-await
      this.formHandler.addItem();
      this.renderer(this.store.getSelectedListItems());
      this.resetForm();
      this.closeAddDialog();
      return;
    }

    // handler for cancel adding the form
    if (targetID === 'cancel-adding') {
      this.resetForm();
      this.closeAddDialog();
      return;
    }

    // handler  for clicking on the dialog-container
    if (this.isDialogOpen) {
      if (targetID === 'dialog-container') {
        // TODO: reset dynamic form (Add || Delete || Edit)
        this.resetForm();
        this.closeAddDialog();
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
      this.changeIsFavorite(target);
      return;
    }
  }
  /**
   * Function for changing the isFavorite property of the corresponding listEntry
   * @param target DOMElement
   */
  changeIsFavorite(target) {
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
    const selectedItem = this.store.getItemByID(_id);
    selectedItem.isFavorite = !selectedItem.isFavorite;
    this.store.updateItem(selectedItem);
    return;
  }
  closeAddDialog() {
    this.addDialog.classList.add('is-hidden');
    this.isDialogOpen = false;
  }
  resetForm() {
    this.nameInput.value = '';
    this.tagsInput.value = '';
  }
}
