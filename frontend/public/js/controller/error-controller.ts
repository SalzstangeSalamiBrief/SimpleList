export default class ErrorNotification {
  private errorContainer: HTMLDivElement;

  private errorTxt: HTMLSpanElement;

  private isErrorActive: boolean;

  private DisplayErrorTimeInMS: number;

  constructor() {
  	this.errorContainer = document.querySelector('div.error-container');
  	this.errorTxt = document.querySelector('p#error-text');
  	this.isErrorActive = false;
  	this.DisplayErrorTimeInMS = 2000;
  }

  /**
   * If no Error is actively displayed set the new errorMsg and start the reset timer
   * @param msg string
   */
  public setErrorMessage(msg: string): void {
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
  private startErrorTimer() {
  	setTimeout(() => {
  		this.setErrorMessage('');
  		this.toggleErrorVisibility();
  		this.isErrorActive = false;
  	}, this.DisplayErrorTimeInMS);
  }

  /**
   * toggle the 'is-hidden' class on this.errorContainer
   */
  private toggleErrorVisibility() {
  	this.errorContainer.classList.toggle('is-hidden');
  }
}
