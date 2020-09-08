import ListItem from '../interfaces/list-item';
// TODO: Enter-Handler

export default class EventHandler {
  private buttonHandler;
  private dialogHandler;
  private formHandler;
  private tableRenderer;
  private store;
  private IdOfSelectedItem: string;
  private favClassListRegex: RegExp;
  constructor(buttonHandler, dialogHandler, formHandler, tableRenderer, store) {
    this.buttonHandler = buttonHandler;
    this.dialogHandler = dialogHandler;
    this.formHandler = formHandler;
    this.tableRenderer = tableRenderer;
    this.store = store;
    this.formHandler.setStore(store);
    this.IdOfSelectedItem = '';
    this.favClassListRegex = new RegExp(
      'fav(__(inner|outer)|-img)|btn-fav-img',
    );
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
    // handler for classLists
    // loop through each entry and check if one condition applies
    // because of the regex-test no switch-statement is used
    for (let i = 0; i < targetClassList.length; i += 1) {
      const actualClassEntry = targetClassList[i];
      if (actualClassEntry === 'row-item-name') {
        try {
          // copy name of the button/entry/row into the clipboard
          await navigator.clipboard.writeText(target.textContent.trim());
        } catch (err) {
          console.log(err);
        }
      }
      if (actualClassEntry === 'edit-btn') {
        this.IdOfSelectedItem = this.loopThroughParentsToGetID(target);
        this.formHandler.prepareUpdateInputs(this.IdOfSelectedItem);
        this.buttonHandler.toggleFormButtons('btnSubmitAdd', 'btnSubmitUpdate');
        this.formHandler.setFormTitleText('Update Item');
        this.dialogHandler.openDialog('AddUpdate');
        return;
      }
      if (actualClassEntry === 'btn--cancel-dialog') {
        this.dialogHandler.closeDialog();
        this.formHandler.resetFormInputFields();
        this.IdOfSelectedItem = '';
        return;
      }
      if (actualClassEntry === 'open-delete-dialog') {
        const _id = this.loopThroughParentsToGetID(target);
        const { name }: ListItem = this.store.getItemByID(_id);
        this.IdOfSelectedItem = _id;
        this.dialogHandler.openDialog('Delete', name);
        // this.store.deleteItemByID(this.loopThroughParentsToGetID(target));
        // this.tableRenderer(this.store.getSelectedListItems());
        return;
      }
      if (this.favClassListRegex.test(targetClassList[i])) {
        let _id: string = this.loopThroughParentsToGetID(target);
        console.log(_id);
        document
          .querySelector(`svg[data-_id="${_id}"].fav-img`)
          .classList.toggle('marked-as-fav');
        const selectedItem: ListItem = this.store.getItemByID(_id);
        selectedItem.isFavorite = !selectedItem.isFavorite;
        this.store.updateItem(selectedItem);
        return;
      }
    }

    // handler for id's
    switch (targetID) {
      case 'open-add-dialog':
        this.buttonHandler.toggleFormButtons('btnSubmitUpdate', 'btnSubmitAdd');
        this.formHandler.setFormTitleText('Add Item');
        this.dialogHandler.openDialog('AddUpdate');
        return;
      case 'submit-add-form':
        // todo: maybe problems because submitDialogHandler will be async => fix with async-await
        await this.formHandler.submitAddItem();
        this.tableRenderer(this.store.getSelectedListItems());
        this.dialogHandler.closeDialog();
        this.formHandler.resetFormInputFields();
        return;
      case 'submit-update-form':
        const newItem = {
          name: this.formHandler.getNameInputValue(),
          tags: this.formHandler.getTagsInputValue().trim().split(' '),
          _id: this.IdOfSelectedItem,
        };
        // todo errorhandling for response
        this.store.updateItem(newItem);
        this.formHandler.resetFormInputFields();
        this.dialogHandler.closeDialog();
        this.tableRenderer(this.store.getSelectedListItems());
        this.IdOfSelectedItem = '';
        return;
      case 'submit-delete-dialog':
        this.store.deleteItemByID(this.IdOfSelectedItem);
        this.dialogHandler.closeDialog();
        this.IdOfSelectedItem = '';
        this.tableRenderer(this.store.getSelectedListItems());
        return;
      case 'dialog-container':
        if (this.dialogHandler.getIsDialogOpen()) {
          this.dialogHandler.closeDialog();
          this.formHandler.resetFormInputFields();
          return;
        }
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
