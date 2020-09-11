const enum PossibleDialogues {
  openEditDialog = 'AddUpdate',
  deleteDialog = 'Delete',
}

const dialogContainer = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);
const dialogAddUpdate = <HTMLDialogElement>(
  document.querySelector('dialog.add-update-dialog')
);
const dialogDelete = <HTMLDialogElement>(
  document.querySelector('dialog.delete-dialog')
);

const deleteTextSpan = <HTMLSpanElement>(
  document.querySelector('p.delete-text__id')
);

export default class DialogHandler {
  private isDialogOpen: boolean;
  constructor() {
    this.isDialogOpen = false;
  }
  openDialog(type: PossibleDialogues, name = '') {
    dialogContainer.classList.remove('is-hidden');
    if (type === PossibleDialogues.openEditDialog) {
      dialogAddUpdate.classList.remove('is-hidden');
      dialogDelete.classList.add('is-hidden');
    } else {
      dialogDelete.classList.remove('is-hidden');
      dialogAddUpdate.classList.add('is-hidden');
      deleteTextSpan.textContent = name;
    }
    this.isDialogOpen = true;
  }
  closeDialog() {
    dialogContainer.classList.add('is-hidden');
    this.isDialogOpen = false;
  }
  getIsDialogOpen(): boolean {
    return this.isDialogOpen;
  }
  setIsDialogOpen(b: boolean) {
    this.isDialogOpen = b;
  }
}
