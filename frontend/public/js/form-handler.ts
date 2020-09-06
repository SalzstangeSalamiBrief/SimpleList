import ListItem from '../interfaces/list-item';

export default class FormHandler {
  private store;
  private nameInput: HTMLInputElement;
  private tagsInput: HTMLInputElement;
  constructor(store) {
    this.store = store;
    this.nameInput = <HTMLInputElement>(
      document.querySelector('[name="dialog__name"')
    );
    this.tagsInput = <HTMLInputElement>(
      document.querySelector('[name="dialog__tags"')
    );
  }

  /**
   * Open the update-form and prefill the name- and tagsInput
   * @param _id string || number
   */
  prepareUpdateInputs(_id: string | number) {
    const { name, tags }: ListItem = this.store.getItemByID(_id);
    // check if name and tags exist
    if (name && tags) {
      // set value in the inputfields
      this.nameInput.value = name;
      this.tagsInput.value = tags.join(' ').trim();
    }
  }

  submitAddItem(): void | Array<string> {
    const name: string = this.nameInput.value.trim();
    const tags: Array<string> = this.tagsInput.value.trim().split(' ');
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
