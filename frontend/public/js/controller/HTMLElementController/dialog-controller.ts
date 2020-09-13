import { clearInnerHTML } from '../../view/util/util-function';
import createDeleteDialog from '../../view/delete-dialog-renderer';
import createAddUpdateDialog from '../../view/add-update-dialog-renderer';
enum PossibleDialogues {
  updateDialog = 'update',
  addDialog = 'add',
  deleteDialog = 'delete',
}

const dialogContainer = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);
const dialogAddUpdate = <HTMLDialogElement>(
  document.querySelector('dialog.add-update-dialog')
);

export default class DialogHandler {
  private isDialogOpen: boolean;
  constructor() {
    this.isDialogOpen = false;
  }

  public openDialog(type: PossibleDialogues, nameOfItem = '') {
    const selectedType = type.toLowerCase();
    console.log(selectedType);
    if (this.isDialogOpen === false) {
      clearInnerHTML(dialogContainer);
      switch (selectedType) {
        case PossibleDialogues.addDialog:
          createAddUpdateDialog(selectedType, '');
          break;
        case PossibleDialogues.updateDialog:
          createAddUpdateDialog(selectedType, nameOfItem);
          break;
        case PossibleDialogues.deleteDialog:
          createDeleteDialog(nameOfItem);
          break;
      }
      dialogContainer.classList.remove('is-hidden');
      this.isDialogOpen = true;
    }

    // dialogContainer.classList.remove('is-hidden');
    // if (type === PossibleDialogues.openEditDialog) {
    //   dialogAddUpdate.classList.remove('is-hidden');
    // } else {
    //   dialogAddUpdate.classList.add('is-hidden');
    // document.querySelector('p.delete-text__id').textContent = name;
    // deleteTextSpan.textContent = name;
    // }
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

  public setIsDialogOpen(b: boolean) {
    this.isDialogOpen = b;
  }
}
