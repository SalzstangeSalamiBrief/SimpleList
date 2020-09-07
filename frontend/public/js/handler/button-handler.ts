export default class ButtonHandler {
  private btnSubmitAdd: HTMLButtonElement;
  private btnSubmitUpdate: HTMLButtonElement;
  constructor() {
    this.btnSubmitAdd = <HTMLButtonElement>(
      document.querySelector('button#submit-add-form')
    );
    this.btnSubmitUpdate = <HTMLButtonElement>(
      document.querySelector('button#submit-update-form')
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
}
