enum BTNSelection {
  delete = 'DELETE',
  update = 'UPDATE',
}
export default class ButtonHandler {
  private btnSubmitAdd: HTMLButtonElement;
  private btnSubmitUpdate: HTMLButtonElement;
  private btnSubmitDelete: HTMLButtonElement;
  constructor() {
    this.btnSubmitAdd = <HTMLButtonElement>(
      document.querySelector('button#submit-add-form')
    );
    this.btnSubmitUpdate = <HTMLButtonElement>(
      document.querySelector('button#submit-update-form')
    );
    this.btnSubmitDelete = <HTMLButtonElement>(
      document.querySelector('button#submit-delete-dialog')
    );
  }
  /**
   * use to hide update||add-btn and hide the other one
   * @param btnToHide string
   * @param btnToShow string
   */
  toggleFormButtons(btnToHide: string, btnToShow: string) {
    this[btnToHide].classList.add('is-hidden');
    this[btnToShow].classList.remove('is-hidden');
  }
  /**
   * update the aria-label for either btnSubmitUpdate or btnSubmitDelete
   * @param type enum<BTNSelection>
   * @param name string
   */
  public setUpdateDeleteBtnLabel(type: BTNSelection, name: string = '') {
    const selectedType = type.toUpperCase();
    switch (selectedType) {
      case BTNSelection.delete:
        this.btnSubmitDelete.setAttribute(
          'aria-label',
          `Confirm to delete the entry ${name}`,
        );
        break;
      case BTNSelection.update:
        this.btnSubmitUpdate.setAttribute(
          'aria-label',
          `Confirm the update of the entry ${name}`,
        );
    }
  }
}
