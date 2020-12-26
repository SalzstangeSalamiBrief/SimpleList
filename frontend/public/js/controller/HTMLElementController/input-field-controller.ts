export default class FormHandler {
  private store;

  private nameInput: HTMLInputElement;

  private tagsInput: HTMLInputElement;

  private formTitle: HTMLHeadingElement;

  private filterInput: HTMLInputElement;

  private importFileInput: HTMLInputElement

  constructor() {
  	this.store = undefined;
  	this.nameInput = <HTMLInputElement>(
      document.querySelector('[name="dialog__name"')
    );
  	this.tagsInput = <HTMLInputElement>(
      document.querySelector('[name="dialog__tags"')
    );
  	this.formTitle = <HTMLHeadingElement>document.querySelector('#form__title');
  	this.filterInput = <HTMLInputElement>(
      document.querySelector('input[name="tag-search-input"]')
    );
  }

  /**
   * this function grabs the value of the tagsInput-Input and converts this value
   * intro an array of strings which represents the tags-array
   */
  public createTagsArray(tagString = ''): Array<string> {
  	const tempTags: Array<string> = tagString.trim().split(' ');
  	const tags: Array<string> = [];
  	for (let i = 0; i < tempTags.length; i += 1) {
  		const tempEntry = tempTags[i].trim();
  		if (tempEntry !== '') {
  			tags.push(tempEntry);
  		}
  	}
  	return tags;
  }

  public getNameInputValue(): string {
  	return (<HTMLInputElement>(
      document.querySelector('[name="dialog__name"]')
    )).value.trim();
  }

  public getTagsInputValue(): string {
  	return (<HTMLInputElement>(
      document.querySelector('[name="dialog__tags"]')
    )).value.trim();
  }

  public getFilterInputValue(): string {
  	return this.filterInput.value.trim();
  }

  public setStore(store = undefined): void {
  	if (store !== undefined) {
  		this.store = store;
  	}
  }

  public getFileForImport(): File {
  	const fileInput = <HTMLInputElement>document.querySelector('input#file-import-input');
  	return fileInput.files[0];
  }
}
