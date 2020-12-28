import { clearInnerHTML } from '../../view/util/util-function';
import createDeleteDialog from '../../view/delete-dialog-renderer';
import createAddUpdateDialog from '../../view/add-update-dialog-renderer';
import createExportDialog from '../../view/export-dialog-renderer';
import createImportDialog from '../../view/import-dialog-renderer';

import ListItem from '../../interfaces/list-item';

type PossibleDialogues = 'update'| 'add' | 'delete' | 'export' | 'import'

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
  public openDialog(
  	typeofDialog: PossibleDialogues, item: ListItem,
  ): void {
  	const selectedType = typeofDialog.toLowerCase();
  	if (this.isDialogOpen === false) {
  		clearInnerHTML(dialogContainer);
  		switch (selectedType) {
  		case 'add':
  			createAddUpdateDialog(selectedType, item);
  			break;
  		case 'update':
  			createAddUpdateDialog(selectedType, item);
  			break;
  		case 'delete':
  			createDeleteDialog(item.name);
  			break;
  		case 'export':
  			createExportDialog();
  			break;
  		case 'import':
  			createImportDialog();
  			break;
  		default:
  			break;
  		}
  		dialogContainer.classList.remove('is-hidden');
  		this.isDialogOpen = true;
  	}
  }

  public closeDialog(): void {
  	dialogContainer.classList.add('is-hidden');
  	clearInnerHTML(dialogContainer);
  	this.isDialogOpen = false;
  }

  public getIsDialogOpen(): boolean {
  	return this.isDialogOpen;
  }
}
