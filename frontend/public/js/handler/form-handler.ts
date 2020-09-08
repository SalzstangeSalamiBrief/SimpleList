import ListItem from '../../interfaces/list-item';

export default class FormHandler {
  private store;
  private nameInput: HTMLInputElement;
  private tagsInput: HTMLInputElement;
  private formTitle: HTMLHeadingElement;
  constructor() {
    this.store = undefined;
    this.nameInput = <HTMLInputElement>(
      document.querySelector('[name="dialog__name"')
    );
    this.tagsInput = <HTMLInputElement>(
      document.querySelector('[name="dialog__tags"')
    );
    this.formTitle = <HTMLHeadingElement>document.querySelector('#form__title');
  }

  /**
   * Open the update-form and prefill the name- and tagsInput
   * @param _id string || number
   */
  prepareUpdateInputs(_id: string) {
    const { name, tags }: ListItem = this.store.getItemByID(_id);
    // check if name and tags exist
    if (name && tags) {
      // set value in the inputfields
      this.nameInput.value = name;
      this.tagsInput.value = tags.join(' ').trim();
    }
  }

  /**
   * this function grabs the form-inputs, generates a Item and sends the item to the server
   * the response from the server will be stored inside the local store
   */
  async submitAddItem() {
    const name: string = this.nameInput.value.trim();
    const tags: Array<string> = this.createTagsArray();
    const err = [];
    // check if name and tags exist
    if (name === '') err.push('Please add a name for your entry');
    if (tags.length <= 0) err.push('Please add some tags to your entry');
    if (err.length === 0) {
      const newItem = { name, tags };
      // add to store
      // TODO: async await because this creates a new item on the server side with id etc
      // TODO: remove dummyID
      // newItem['_id'] = String(Math.ceil(Math.random() * 100000));
      const addToStoreResult = await this.store.addItem(newItem);
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

  /**
   * this function grabs the value of the tagsInput-Input and converts this value
   * intro an array of strings which represents the tags-array
   */
  createTagsArray(): Array<string> {
    const tempTags: Array<string> = this.tagsInput.value.trim().split(' ');
    const tags: Array<string> = [];
    for (let i = 0; i < tempTags.length; i += 1) {
      // trim teach tag
      const tempEntry = tempTags[i].trim();
      // only add tag to results, if it is not an empty string
      if (tempEntry !== '') {
        tags.push(tempEntry);
      }
    }
    return tags;
  }
  resetFormInputFields() {
    this.nameInput.value = '';
    this.tagsInput.value = '';
  }
  setFormTitleText(txt: string) {
    this.formTitle.textContent = txt;
  }
  getNameInputValue(): string {
    return this.nameInput.value;
  }
  getTagsInputValue(): string {
    return this.tagsInput.value;
  }
  setStore(store) {
    this.store = store;
  }
}
