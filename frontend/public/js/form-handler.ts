import StoreFunctions from '../interfaces/store-functions';

const nameInput = <HTMLInputElement>(
  document.querySelector('[name="add-dialog__name"')
);
const tagsInput = <HTMLInputElement>(
  document.querySelector('[name="add-dialog__tags"')
);

// function
function createForm(store: StoreFunctions): Function {
  const storeObject: StoreFunctions = store;
  return function (): void | Array<String> {
    const name: String = nameInput.value.trim();
    const tags: Array<String> = tagsInput.value.trim().split(' ');
    // check if a name and tags are passed
    const err = [];
    // validation for the form
    if (name === '') err.push('Please add a name for your entry');
    if (tags.length <= 0) err.push('Please add some tags to your entry');
    // check if no errors exist
    if (err.length === 0) {
      const newListItem = {
        name,
        tags,
      };
      const addResult = storeObject.addItem(newListItem);
      // an error occurred at adding the new item
      if (addResult === null) {
        err.push('Error: Could not add the item to the list');
      }
    }
    // some errors exist
    if (err.length > 0) {
      // todo: error handling
      return err;
    }
  };
}

export default function (storeFunctions: StoreFunctions): Function {
  const addDialog: HTMLFormElement = document.querySelector(
    'dialog#add-dialog-container',
  );
  const createdFormAddItem: Function = createForm(storeFunctions);
  return function (): any {
    const resultOfCreation = createdFormAddItem();
    if (Array.isArray(resultOfCreation)) {
      // an error occurred
      // TODO: Error Handling
      return;
    }
    //  no error occurred
    // clear form
    // hide form
    addDialog.classList.add('is-hidden');
    console.log(storeFunctions.getSelectedListItems());
    return;
  };
  // addDialog.addEventListener('submit', (e) => {
  //   console.log('submit event');
  //   e.preventDefault();
  //   const resultOfCreation = createdForm();
  //   if (Array.isArray(resultOfCreation)) {
  //     // an error occurred
  //     // TODO: Error Handling
  //     return;
  //   }
  //   //  no error occurred
  //   // clear form
  //   nameInput.value = '';
  //   tagsInput.value = '';
  //   // hide form
  //   addDialog.classList.add('is-hidden');
  // });
}
