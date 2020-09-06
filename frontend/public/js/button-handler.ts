// TODO: This class is actually only build for adding stuff
//            Add Dynamic choices between add, delete, update
export default class ButtonHandler {
  private idItemToUpdate: String;
  private dialog: HTMLDialogElement;
  private formTitle: HTMLHeadingElement;
  private nameInput: HTMLInputElement;
  private tagsInput: HTMLInputElement;
  private btnSubmitAdd: HTMLButtonElement;
  private btnSubmitUpdate: HTMLButtonElement;
  private isDialogOpen: boolean;
  private store;
  private formHandler;
  private renderer;
  constructor(formHandler, store, renderer) {
    this.dialog = <HTMLDialogElement>(
      document.querySelector('dialog#dialog-container')
    );
    this.nameInput = <HTMLInputElement>(
      document.querySelector('[name="dialog__name"]')
    );
    this.tagsInput = <HTMLInputElement>(
      document.querySelector('[name="dialog__tags"]')
    );
    this.btnSubmitAdd = <HTMLButtonElement>(
      document.querySelector('button#submit-add-form')
    );
    this.btnSubmitUpdate = <HTMLButtonElement>(
      document.querySelector('button#submit-update-form')
    );
    this.formTitle = <HTMLHeadingElement>document.querySelector('#form__title');
    this.isDialogOpen = false;
    this.store = store;
    this.formHandler = formHandler;
    this.renderer = renderer;
    this.idItemToUpdate = '';
    this.addEventListenerToBody();
  }

  addEventListenerToBody() {
    document.querySelector('body').addEventListener('click', (e) => {
      this.bodyEventHandler.call(this, e);
    });
  }

  /**
   * use to hide update||add-btn and hide the other one
   * @param btnToHide string
   * @param btnToShow string
   */
  toggleFormButtons(btnToHide: string, btnToShow: string) {
    this[btnToHide].classList.add('is-hidden');
    this[btnToShow].classList.remove('is-hidden');
  }

  // todo: async because of comm with server
  // todo: validation of input
  async bodyEventHandler({ target }) {
    // console.log(target);
    const targetClassList: DOMTokenList = target.classList;
    const targetID: string = target.id;

    // handler for copy the name
    if (targetClassList.contains('row-item-name')) {
      try {
        // copy name of the button/entry/row into the clipboard
        await navigator.clipboard.writeText(target.textContent.trim());
      } catch (err) {
        console.log(err);
      }
    }

    // handler for open-add-btn
    if (targetID === 'open-add-dialog') {
      this.initOpenAddDialog();
      return;
    }

    // handler for submitting the add-form
    if (targetID === 'submit-add-form') {
      // todo: maybe problems because submitDialogHandler will be async => fix with async-await
      this.submitAddForm();

      return;
    }

    // handler for open updating form
    if (targetClassList.contains('edit-btn')) {
      this.openUpdateDialog(target);
      return;
    }

    // handler for submitting the updateform
    if (targetID === 'submit-update-form') {
      this.updateItem();
      return;
    }

    // handler for cancel the form
    if (targetID === 'cancel-form') {
      this.closeDialog();
      return;
    }

    if (targetClassList.contains('open-delete-dialog')) {
      // todo: add dialog, new handler for dialog etc
      // open delete Dialog
      this.store.deleteItemByID(this.loopThroughParentsToGetID(target));
      this.renderer(this.store.getSelectedListItems());
    }

    // handler  for clicking on the dialog-container
    if (this.isDialogOpen) {
      if (targetID === 'dialog-container') {
        this.closeDialog();
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
    let _id = this.loopThroughParentsToGetID(target);
    console.log(_id);
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
  /**
   * Loop through the parents of the target to get the _id of the selected row/item
   * @param target
   */
  loopThroughParentsToGetID(target): string {
    let itemToSelect = target;
    // loop through the parents to get the parent with dataset _id and name (name only for savety-reasons)
    while (!itemToSelect.dataset['_id'] || !itemToSelect.dataset['name']) {
      itemToSelect = itemToSelect.parentNode;
    }
    return itemToSelect.dataset['_id'];
  }

  /**
   * function which inits the add-dialog and displays the dialog
   */
  initOpenAddDialog() {
    this.toggleFormButtons('btnSubmitUpdate', 'btnSubmitAdd');
    this.formTitle.textContent = 'Add Item';
    this.openDialog();
  }
  /**
   * function which submits the add-form
   */
  submitAddForm() {
    // TODO: Only close dialog if no error occured
    // todo: errorhandling
    this.formHandler.submitAddItem();
    this.renderer(this.store.getSelectedListItems());
    this.closeDialog();
  }
  /**
   * init the updateDialog (prepare the form-fields), change the buttons and display the updateDialog
   *
   * @param target HTMLElement
   */
  openUpdateDialog(target) {
    const _id = this.loopThroughParentsToGetID(target);
    this.idItemToUpdate = _id;
    this.formHandler.prepareUpdateInputs(_id);
    this.toggleFormButtons('btnSubmitAdd', 'btnSubmitUpdate');
    this.formTitle.textContent = 'Update Item';
    this.openDialog();
  }
  updateItem() {
    const newItem = {
      name: this.nameInput.value,
      tags: this.tagsInput.value.trim().split(' '),
      _id: this.idItemToUpdate,
    };
    // todo errorhandling for response
    this.store.updateItem(newItem);
    this.resetForm();
    this.closeDialog();
    // console.log(updateResult);
    this.renderer(this.store.getSelectedListItems());
  }
  openDialog() {
    this.dialog.classList.remove('is-hidden');
    this.isDialogOpen = true;
  }
  closeDialog() {
    this.dialog.classList.add('is-hidden');
    this.resetForm();
    this.isDialogOpen = false;
  }
  resetForm() {
    this.nameInput.value = '';
    this.tagsInput.value = '';
    this.idItemToUpdate = '';
  }
}
