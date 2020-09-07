import ListItem from '../interfaces/list-item';

export default class EventHandler {
  private buttonHandler;
  private dialogHandler;
  private formHandler;
  private tableRenderer;
  private store;
  private idItemToUpdate: string;
  constructor(buttonHandler, dialogHandler, formHandler, tableRenderer, store) {
    this.buttonHandler = buttonHandler;
    this.dialogHandler = dialogHandler;
    this.formHandler = formHandler;
    this.tableRenderer = tableRenderer;
    this.store = store;
    this.formHandler.setStore(store);
    this.idItemToUpdate = '';
    this.addClickEventListenerToBody();
  }
  addClickEventListenerToBody() {
    document.querySelector('body').addEventListener('click', (e) => {
      this.clickEventHandler.call(this, e);
    });
  }
  // todo: async because of comm with server
  // todo: validation of input
  async clickEventHandler({ target }) {
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
      this.buttonHandler.toggleFormButtons('btnSubmitUpdate', 'btnSubmitAdd');
      this.formHandler.setFormTitleText('Add Item');
      this.dialogHandler.openDialog();
      return;
    }

    // handler for submitting the add-form
    if (targetID === 'submit-add-form') {
      // todo: maybe problems because submitDialogHandler will be async => fix with async-await
      this.formHandler.submitAddItem();
      this.tableRenderer(this.store.getSelectedListItems());
      this.dialogHandler.closeDialog();
      // this.submitAddForm();
      return;
    }

    // handler for open updating form
    if (targetClassList.contains('edit-btn')) {
      this.idItemToUpdate = this.loopThroughParentsToGetID(target);
      this.formHandler.prepareUpdateInputs(this.idItemToUpdate);
      this.buttonHandler.toggleFormButtons('btnSubmitAdd', 'btnSubmitUpdate');
      this.formHandler.setFormTitleText('Update Item');
      this.dialogHandler.openDialog();
      return;
    }

    // handler for submitting the updateform
    if (targetID === 'submit-update-form') {
      const newItem = {
        name: this.formHandler.getNameInputValue(),
        tags: this.formHandler.getTagsInputValue().trim().split(' '),
        _id: this.idItemToUpdate,
      };
      // todo errorhandling for response
      this.store.updateItem(newItem);
      this.formHandler.resetFormInputFields();
      this.dialogHandler.closeDialog();
      this.tableRenderer(this.store.getSelectedListItems());
      this.idItemToUpdate = '';
      return;
    }

    // handler for cancel the form
    if (targetID === 'cancel-form') {
      this.dialogHandler.closeDialog();
      this.formHandler.resetFormInputFieldsInputFields();
      return;
    }

    if (targetClassList.contains('open-delete-dialog')) {
      // todo: add dialog, new handler for dialog etc
      // open delete Dialog
      this.store.deleteItemByID(this.loopThroughParentsToGetID(target));
      this.tableRenderer(this.store.getSelectedListItems());
      return;
    }

    // handler  for clicking on the dialog-container
    if (this.dialogHandler.getIsDialogOpen()) {
      if (targetID === 'dialog-container') {
        this.dialogHandler.closeDialog();
        this.formHandler.resetFormInputFieldsInputFields();
        return;
      }
    }

    // handler for favorite-img
    const favClassListRegex = new RegExp(
      'fav(__(inner|outer)|-img)|btn-fav-img',
    );
    let containsFavIMGClasses: boolean = false;
    // check if fav-img clicked
    for (let i = 0; i < targetClassList.length; i += 1) {
      // Potential problems because of update: async-await
      if (favClassListRegex.test(targetClassList[i])) {
        containsFavIMGClasses = true;
        break;
      }
    }
    if (containsFavIMGClasses === true) {
      let _id: string = this.loopThroughParentsToGetID(target);
      console.log(_id);
      document
        .querySelector(`svg[data-_id="${_id}"].fav-img`)
        .classList.toggle('marked-as-fav');
      const selectedItem: ListItem = this.store.getItemByID(_id);
      this.store.updateItem(selectedItem);
      return;
    }
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
}
