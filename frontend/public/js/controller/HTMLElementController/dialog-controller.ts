import { clearInnerHTML } from '../../view/util/util-function';
import createDeleteDialog from '../../view/delete-dialog-renderer';
import createAddUpdateDialog from '../../view/add-update-dialog-renderer';
import createExportDialog from '../../view/export-dialog-renderer';

import ListItem from '../../interfaces/list-item';

enum PossibleDialogues {
  updateDialog = 'update',
  addDialog = 'add',
  deleteDialog = 'delete',
  exportDialog = 'export',
}

const dialogContainer = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);

export default class DialogHandler {
  private isDialogOpen: boolean;

  constructor() {
  	this.isDialogOpen = false;
  }

  /**
   * Function which opens a dialog based on the passed type of dialog
   * @param type PossibleDialogues
   * @param item ListItem
   */
  public openDialog(typeofDialog: PossibleDialogues, item: ListItem) {
  	const selectedType = typeofDialog.toLowerCase();
  	if (this.isDialogOpen === false) {
  		clearInnerHTML(dialogContainer);
  		switch (selectedType) {
  		case PossibleDialogues.addDialog:
  			createAddUpdateDialog(selectedType, item);
  			break;
  		case PossibleDialogues.updateDialog:
  			createAddUpdateDialog(selectedType, item);
  			break;
  		case PossibleDialogues.deleteDialog:
  			createDeleteDialog(item.name);
  			break;
  		case PossibleDialogues.exportDialog:
  			createExportDialog();
  			break;
  		}
  		dialogContainer.classList.remove('is-hidden');
  		this.isDialogOpen = true;
  	}
  }

  /**
   * close the active dialog with adding the is-hidden class
   */
  public closeDialog() {
  	dialogContainer.classList.add('is-hidden');
  	this.isDialogOpen = false;
  }

  public getIsDialogOpen(): boolean {
  	return this.isDialogOpen;
  }
}
