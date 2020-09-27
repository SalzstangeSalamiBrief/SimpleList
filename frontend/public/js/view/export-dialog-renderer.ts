import { createHTMLElement } from './util/util-function';
import createDialogElement from './util/dialog-element-creator';
import createButtonContainer from './util/button-container-creator';

const divToAppendDialog = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);

function createExportParagraph(): HTMLParagraphElement {
	return <HTMLParagraphElement>createHTMLElement({
		type: 'p',
		classList: ['mb-4'],
		attributeList: {},
		textContent: 'Export your list as .csv file',
	});
}

/**
 * function which composes the export dialog and append it to the dom
 */
export default function createExportDialog(nameOfItem = ''):void {
	const dialog: HTMLDialogElement = <HTMLDialogElement>createDialogElement('export');
	const paragraph: HTMLParagraphElement = createExportParagraph();
	const buttonContainer: HTMLDivElement = createButtonContainer('export', nameOfItem);
	dialog.appendChild(paragraph);
	dialog.appendChild(buttonContainer);
	divToAppendDialog.append(dialog);
}
