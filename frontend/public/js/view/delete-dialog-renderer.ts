import { createHTMLElement } from './util/util-function';

const divToAppendDialog = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);

/**
 * function for creating a delete-button for the delete-dialog
 */
function createDeleteButton(nameOfItem: string): HTMLButtonElement {
	const classList: Array<string> = [
		'bg-red-500',
		'hover:bg-red-700',
		'text-white',
		'font-bold',
		'py-2',
		'px-4',
		'rounded',
		'btn-form',
		'cursor-pointer',
	];
	const attributeList = {
		'aria-label': `Confirm to delete the entry ${nameOfItem}`,
		type: 'submit',
		value: 'delete item',
		id: 'submit-delete-dialog',
	};
	const textContent = 'Delete';
	return <HTMLButtonElement>(
    createHTMLElement({
    	type: 'button', classList, attributeList, textContent,
    })
  );
}

/**
 * function for creating a cancel-button for the delete-dialog
 */
function createCancelButton(): HTMLButtonElement {
	const classList: Array<string> = [
		'bg-blue-500',
		'hover:bg-blue-700',
		'text-white',
		'font-bold',
		'py-2',
		'px-4',
		'rounded',
		'btn-form',
		'btn--cancel-dialog',
	];
	const attributeList = {
		'aria-label': 'Cancel delete action',
		id: 'cancel-delete-dialog',
	};
	const textContent = 'Cancel';
	return <HTMLButtonElement>(
    createHTMLElement({
    	type: 'button', classList, attributeList, textContent,
    })
  );
}

/**
 * function for creating the button-container and his content
 */
function createButtonContainer(nameOfItem: string): HTMLDivElement {
	const classList: Array<string> = ['flex', 'w-2/5', 'justify-around'];
	const buttonContainer = <HTMLDivElement>createHTMLElement({
		type: 'div',
		classList,
		attributeList: {},
		textContent: '',
	});
	buttonContainer.appendChild(createDeleteButton(nameOfItem));
	buttonContainer.appendChild(createCancelButton());
	return buttonContainer;
}

/**
 * function for creating the info-container of the delete-dialog
 */
function createDeleteInfoContainer(nameOfItem: string): HTMLDivElement {
	// create container
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
	// create heading
	const classListHeading = ['text-center', 'form__title'];
	const infoContainerHeading = <HTMLHeadingElement>createHTMLElement({
		type: 'h2',
		classList: classListHeading,
		attributeList: {},
		textContent: 'Delete Item',
	});
	// descriptionParagraph
	const descriptionParagraph = <HTMLParagraphElement>createHTMLElement({
		type: 'p',
		classList: ['mt-5'],
		attributeList: {},
		textContent: 'Do you really want to delete the Item:',
	});
	// nameParagraph
	const nameParagraph = <HTMLParagraphElement>createHTMLElement({
		type: 'p',
		classList: ['delete-text__id', 'mb-5'],
		attributeList: {},
		textContent: nameOfItem,
	});
	infoContainer.appendChild(infoContainerHeading);
	infoContainer.appendChild(descriptionParagraph);
	infoContainer.appendChild(nameParagraph);
	return infoContainer;
}

/**
 * function for creating the container for the delete-dialog
 */
function createDeleteDialogContainer(): HTMLDialogElement {
	const classList = [
		'w-1/3',
		'flex',
		'flex-col',
		'justify-center',
		'items-center',
		'shadow-lg',
		'border-solid',
		'border-1',
		'border-gray-600',
		'bg-white',
		'px-4',
		'py-4',
		'delete-dialog',
	];
	return <HTMLDialogElement>createHTMLElement({
		type: 'dialog',
		classList,
		textContent: '',
		attributeList: {},
	});
}

/**
 * function which creates and composes the dialog-container.
 * the created element will be appended to the dom
 */
export default function (nameOfItem: string) {
	const deleteDialogContainer = createDeleteDialogContainer();
	deleteDialogContainer.appendChild(createDeleteInfoContainer(nameOfItem));
	deleteDialogContainer.appendChild(createButtonContainer(nameOfItem));
	divToAppendDialog.appendChild(deleteDialogContainer);
}
