const dialogContainer = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);
export default class DialogHandler {
  private isDialogOpen: boolean;
  constructor() {
    this.isDialogOpen = false;
  }
  /**
   * init the updateDialog (prepare the form-fields), change the buttons and display the updateDialog
   *
   * @param target HTMLElement
   */
  openUpdateDialog(target) {
    const _id: string = this.loopThroughParentsToGetID(target);
    this.idItemToUpdate = _id;
    this.formHandler.prepareUpdateInputs(_id);
    this.toggleFormButtons('btnSubmitAdd', 'btnSubmitUpdate');
    formTitle.textContent = 'Update Item';
    this.openDialog();
  }
  openDialog() {
    dialogContainer.classList.remove('is-hidden');
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
