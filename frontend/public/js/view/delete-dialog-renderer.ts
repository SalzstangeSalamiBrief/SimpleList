import { createHTMLElement } from './util/util-function';
import createDialogElement from './util/dialog-element-creator';
import createButtonContainer from './util/button-container-creator';

const divToAppendDialog = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);

/**
 * function for creating the info-container of the delete-dialog
 */
function createDeleteInfoContainer(nameOfItem: string): HTMLDivElement {
	const classListContainer = [
		'flex',
		'flex-col',
		'justify-center',
		'items-center',
	];
	const infoContainer = <HTMLDivElement>createHTMLElement({
		type: 'div',
		classList: classListContainer,
		attributeList: {},
		textContent: '',
	});

	const descriptionParagraph = <HTMLParagraphElement>createHTMLElement({
		type: 'p',
		classList: ['mt-5'],
		attributeList: {},
		textContent: 'Do you really want to delete the Item:',
	});

	const nameParagraph = <HTMLParagraphElement>createHTMLElement({
		type: 'p',
		classList: ['delete-text__id', 'mb-5', 'form__title'],
		attributeList: {},
		textContent: nameOfItem,
	});
	infoContainer.appendChild(descriptionParagraph);
	infoContainer.appendChild(nameParagraph);
	return infoContainer;
}

/**
 * function which creates and composes the dialog-container.
 * the created element will be appended to the dom
 */
export default function createDeleteDialog(nameOfItem: string): void {
	const deleteDialogContainer = <HTMLDialogElement>createDialogElement('delete');
	deleteDialogContainer.appendChild(createDeleteInfoContainer(nameOfItem));
	deleteDialogContainer.appendChild(createButtonContainer('delete', nameOfItem));
	divToAppendDialog.appendChild(deleteDialogContainer);
}
