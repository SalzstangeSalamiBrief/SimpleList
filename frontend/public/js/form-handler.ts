export default class FormHandler {
  private store: any;
  private nameInput: HTMLInputElement;
  private tagsInput: HTMLInputElement;
  constructor(store) {
    this.store = store;
    this.nameInput = <HTMLInputElement>(
      document.querySelector('[name="add-dialog__name"')
    );
    this.tagsInput = <HTMLInputElement>(
      document.querySelector('[name="add-dialog__tags"')
    );
  }

  addItem(): void | Array<String> {
    const name: String = this.nameInput.value.trim();
    const tags: Array<String> = this.tagsInput.value.trim().split(' ');
    const err = [];
    // check if name and tags exist
    if (name === '') err.push('Please add a name for your entry');
    if (tags.length <= 0) err.push('Please add some tags to your entry');
    if (err.length === 0) {
      const newItem = { name, tags };
      // add to store
      // TODO: async await because this creates a new item on the server side with id etc
      const addToStoreResult = this.store.addItem(newItem);
      if (addToStoreResult === null) {
        err.push('Error: Could not add the item to the list');
      }
    }
    // some errors exist
    if (err.length > 0) {
      // todo: error handling
      return err;
    }
    console.log(this.store.getSelectedListItems());
  }
}
