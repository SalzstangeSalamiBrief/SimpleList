import ListItem from '../../interfaces/list-item';

import Validator from '../util/validator';

import DialogController from '../HTMLElementController/dialog-controller';
import InputFieldController from '../HTMLElementController/input-field-controller';

export default class EventController {
  private dialogController;

  private inputFieldController;

  private tableRenderer;

  private errorController;

  private fetchController;

  private store;

  private idOfSelectedItem: string;

  private favClassListRegex: RegExp;

  constructor(tableRenderer, store, errorController, fetchController) {
  	this.dialogController = new DialogController();
  	this.inputFieldController = new InputFieldController();
  	this.tableRenderer = tableRenderer;
  	this.errorController = errorController;
  	this.fetchController = fetchController;
  	this.store = store;
  	this.inputFieldController.setStore(store);
  	this.idOfSelectedItem = '';
  	this.favClassListRegex = new RegExp(
  		'fav(__(inner|outer)|-img)|btn-fav-img',
  	);
  	this.addClickEventListenerToBody();
  	this.addKeyUpEventHandlerToBody();
  	// this.addInputSubmitHandler();
  }

  private addClickEventListenerToBody() {
  	document.querySelector('body').addEventListener('click', (e: Event) => {
  		this.clickEventHandler.call(this, e);
  	});
  }

  private addKeyUpEventHandlerToBody() {
  	document.querySelector('body').addEventListener('keyup', (e: Event) => {
  		this.keyUpHandler.call(this, e);
  	});
  }

  // TODO: import-fom will be dynamicaly generated => cant set eventhandler
  private addInputSubmitHandler() {
  	document.querySelector('#import-form').addEventListener('submit', (e: Event) => {
  		e.preventDefault();
  		this.addImportSubmitHandler.call(this, e);
  	});
  }

  private async clickEventHandler({ target }) {
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
  				// eslint-disable-next-line no-await-in-loop
  				await navigator.clipboard.writeText(target.textContent.trim());
  			} catch (err) {
  				console.log(err);
  			}
  		}
  		if (actualClassEntry === 'edit-btn') {
  			this.prepareUpdateDialog(target);
  			return;
  		}
  		if (actualClassEntry === 'btn--cancel-dialog') {
  			this.cancelDialog();
  			return;
  		}
  		if (actualClassEntry === 'open-delete-dialog') {
  			this.openDeleteDialog(target);
  			return;
  		}
  		if (this.favClassListRegex.test(targetClassList[i])) {
  			this.toggleIsFavorite(target);
  			return;
  		}
  	}

  	// handler for id's
  	switch (targetID) {
  	case 'filter-btn':
  		this.filterTags();
  		break;
  	case 'open-add-dialog':
  		this.openAddDialog();
  		break;
  	case 'open-export-dialog':
  		this.openExportDialog();
  		break;
  	case 'open-import-dialog':
  		this.openImportDialog();
  		break;
  	case 'submit-add-form':
  		await this.submitAddForm();
  		break;
  	case 'submit-update-form':
  		this.submitUpdateForm();
  		break;
  	case 'submit-import-form':
  		await this.submitFileUpload();
  		break;
  	case 'submit-delete-dialog':
  		await this.submitDeleteDialog();
  		break;
  	case 'export-list':
  		await this.exportList();
  		break;
  	case 'dialog-container':
  		if (this.dialogController.getIsDialogOpen()) {
  			this.dialogController.closeDialog();
  		}
  		break;
  	default: break;
  	}
  }

  private async keyUpHandler({ target: { tagName, name }, keyCode }) {
  	// 13 === space
  	if (keyCode === 13) {
  		// check if the tagname of the target is an input-field
  		if (tagName === 'INPUT') {
  			// check the name of the input field
  			switch (name) {
  			case 'tag-search-input':
  				this.filterTags();
  				break;
  			case 'dialog__name':
  				await this.submitAddForm();
  				break;
  			case 'dialog__tags':
  				await this.submitUpdateForm();
  				break;
  			default:
  				break;
  			}
  		}
  	}
  }

  /**
   * Loop through the parents of the target to get the _id of the selected row/item
   * @param target
   */
  private loopThroughParentsToGetID(target): string {
  	let itemToSelect = target;
  	// loop through the parents to get the parent
  	// with dataset _id and name (name only for safety-reasons)
  	while (!itemToSelect.dataset._id || !itemToSelect.dataset.name) {
  		itemToSelect = itemToSelect.parentNode;
  	}
  	return itemToSelect.dataset._id;
  }

  /**
   * function to submit the update form
   */
  private async submitUpdateForm() {
  	const newItem = {
  		name: this.inputFieldController.getNameInputValue(),
  		tags: this.inputFieldController.createTagsArray(
  			this.inputFieldController.getTagsInputValue(),
  		),
  		_id: this.idOfSelectedItem,
  		isFavorite: this.store.getItemByID(this.idOfSelectedItem).isFavorite,
  	};
  	// check if the name is valid
  	if (Validator.validateName(newItem.name)) {
  		// check if the tags-array is valid
  		if (Validator.validateTagsArray(newItem.tags)) {
  			const updatedItem = await this.fetchController.updateEntryOnServer(
  				newItem,
  			);
  			if (updatedItem === null) {
  				this.errorController.setErrorMessage(
  					'Could not Update the item on the server. Please try another name for your item.',
  				);
  				return;
  			}
  			this.store.updateItem(newItem);
  			this.dialogController.closeDialog();
  			this.tableRenderer(this.store.getSelectedListItems());
  			this.idOfSelectedItem = '';
  		} else {
  			// case invalid tags
  			this.errorController.setErrorMessage(
  				'The input for the tags is invalid! A Tag must have a minimal length of 2 characters!',
  			);
  		}
  	} else {
  		// case: invalid name
  		this.errorController.setErrorMessage(
  			'The value of the name-field is invalid!',
  		);
  	}
  }

  /**
   * function for submitting the add form
   * if the name and the tags in the input-field are valid, a POST-REquest to the backend
	 * is send and in the local list-store an item will be added
   */
  private async submitAddForm() {
  	const name: string = this.inputFieldController.getNameInputValue();
  	const tags: Array<string> = this.inputFieldController.createTagsArray(
  		this.inputFieldController.getTagsInputValue(),
  	);
  	// validate name
  	if (Validator.validateName(name)) {
  		if (Validator.validateTagsArray(tags)) {
  			try {
  				// post new entry to server
  				const newItem = await this.fetchController.postNewEntryToServer(
  					name,
  					tags,
  				);
  				if (newItem === null) {
  					this.errorController.setErrorMessage(
  						'Item already exists! Please try another to add another item. ',
  					);
  					return;
  				}
  				// add response entry (with _id) to store
  				this.store.addItem(newItem);
  				this.tableRenderer(this.store.getSelectedListItems());
  				this.dialogController.closeDialog();
  			} catch (err) {
  				console.log(err);
  			}
  		} else {
  			this.errorController.setErrorMessage(
  				'The input for the tags is invalid! A Tag must have a minimal length of 2 characters!',
  			);
  		}
  	} else {
  		this.errorController.setErrorMessage(
  			'The value of the name-field is invalid!',
  		);
  	}
  }

  /**
   * function for submitting the dele delete dialog
   * delete the selected entry in the list-store and on the backend-server
   */
  private async submitDeleteDialog() {
  	await this.fetchController.deleteEntryOnServer(this.idOfSelectedItem);
  	this.store.deleteItemByID(this.idOfSelectedItem);
  	this.dialogController.closeDialog();
  	this.idOfSelectedItem = '';
  	this.tableRenderer(this.store.getSelectedListItems());
  }

  /**
   * function for opening the add dialog
   */
  private openAddDialog() {
  	this.dialogController.openDialog('add', {});
  }

  /**
   * function for preparing the update-dialog
   * set idOfSelectedItem to the id of the target
	 *  and load the corresponding data in the input-fields
   * @param target Button
   */
  private prepareUpdateDialog(target) {
  	this.idOfSelectedItem = this.loopThroughParentsToGetID(target);
  	this.dialogController.openDialog(
  		'update',
  		this.store.getItemByID(this.idOfSelectedItem),
  	);
  }

  /**
   * prepare the delete dialog by setting idOfSelectedItem with the id of the selected item
	 *  and open the delete Dialog
   * @param target Button
   */
  private openDeleteDialog(target) {
  	const _id = this.loopThroughParentsToGetID(target);
  	const listItem: ListItem = this.store.getItemByID(_id);
  	this.idOfSelectedItem = _id;
  	this.dialogController.openDialog('Delete', listItem);
  }

  /**
   * function to toggle the isFavorite value of the selected item
   * @param target EventTarget
   */
  private async toggleIsFavorite(target) {
  	const _id: string = this.loopThroughParentsToGetID(target);
  	document
  		.querySelector(`svg[data-_id="${_id}"].fav-img`)
  		.classList.toggle('marked-as-fav');
  	const selectedItem: ListItem = this.store.getItemByID(_id);
  	selectedItem.isFavorite = !selectedItem.isFavorite;
  	await this.fetchController.updateEntryOnServer(selectedItem);
  	this.store.updateItem(selectedItem);
  	this.tableRenderer(this.store.getSelectedListItems());
  }

  /**
   * this function closes the open dialog
   */
  private cancelDialog() {
  	this.dialogController.closeDialog();
  	this.idOfSelectedItem = '';
  }

  /**
   * take the tags in the filter-input,
	 * create a tag-array and filter the store by the resulting entries in the array
   */
  private filterTags() {
  	const tagsToFilter: Array<string> = this.inputFieldController.createTagsArray(
  		this.inputFieldController.getFilterInputValue(),
  	);
  	this.store.filterByTags(tagsToFilter);
  	this.tableRenderer(this.store.getSelectedListItems());
  }

  /**
   * function which init the dl of the csv file for exporting
   */
  private async exportList() {
  	await this.fetchController.initDownloadOfCSV();
  	this.cancelDialog();
  }

  /**
   * function to open the export-dialog
   */
  private openExportDialog() {
  	this.dialogController.openDialog('export');
  }

  /**
	 * open the import dialog
	 */
  private openImportDialog() {
  	this.dialogController.openDialog('import');
  	this.addInputSubmitHandler();
  }

  /**
	 * submit the import.form to upload a selected file
	 */
  private async submitFileUpload() {
  	let errorHappened = false;
  	const fileForImport = this.inputFieldController.getFileForImport();
  	if (fileForImport) {
  		try {
  			const isFileUploaded = await this.fetchController.postImportFile(fileForImport);
  			console.log(isFileUploaded);
  			if (isFileUploaded) {
  				this.dialogController.closeDialog();
  				errorHappened = true;
  			}
  		} catch (err) {
  			console.log(err);
  		}
  	}

  	// if a error happened, display an error-msg
  	if (!errorHappened) {
  		this.errorController.setErrorMessage('Could not import the selected File. Please try again');
  	}
  }
}
