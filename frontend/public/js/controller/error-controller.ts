export default class ErrorNotification {
  private errorContainer: HTMLDivElement;
  private errorTxt: HTMLSpanElement;
  private isErrorActive: boolean;
  constructor() {
    this.errorContainer = document.querySelector('div.error-container');
    this.errorTxt = document.querySelector('p#error-text');
    this.isErrorActive = false;
  }
  /**
   * If no Error is actively displayed set the new errorMsg and start the reset timer
   * @param msg string
   */
  setErrorMessage(msg: string) {
    if (this.isErrorActive === false) {
      this.isErrorActive = true;
      this.errorTxt.textContent = msg;
      // display error
      this.toggleErrorVisibility();
      this.startErrorTimer();
    }
  }

  /**
   * Start a Timer who resets the error-container after 1sec
   */
  startErrorTimer() {
    setTimeout(() => {
      this.setErrorMessage('');
      this.toggleErrorVisibility();
      this.isErrorActive = false;
    }, 2000);
  }
  /**
   * toggle the 'is-hidden' class on this.errorContainer
   */
  toggleErrorVisibility() {
    this.errorContainer.classList.toggle('is-hidden');
  }
}
