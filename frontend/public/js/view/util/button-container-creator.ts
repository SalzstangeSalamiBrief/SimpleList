import { createHTMLElement } from './util-function';

type TypeOfAction = 'add' | 'update' | 'delete' | 'import' | 'export'

/**
 * Select the colors of a button based on the type of action
 * @param typeOfAction TypeOfAction
 */
function selectConfirmButtonColors(typeOfAction: TypeOfAction): Array<string> {
	let classesForButtonColors: Array<string> = [];
	if (typeOfAction) {
		switch (typeOfAction.toLowerCase()) {
		case 'add':
			classesForButtonColors = ['bg-green-500', 'hover:bg-green-700'];
			break;
		case 'import':
			classesForButtonColors = ['bg-green-500', 'hover:bg-green-700'];
			break;
		case 'delete':
			classesForButtonColors = ['bg-red-500', 'hover:bg-red-700'];
			break;
		default:
			classesForButtonColors = ['bg-blue-500', 'hover:bg-blue-700'];
			break;
		}
	}
	return classesForButtonColors;
}

/**
 * calculate the attributeList, textContent and type of the button
 * @param typeOfAction TypeOFAction
 * @param nameOfItem string
 */
function createAttributeListAndTextContentAndType(typeOfAction: TypeOfAction, nameOfItem = '') {
	const result = {
		type: 'button',
		textContent: '',
		attributeList: {
			type: 'submit',
			id: '',
			value: '',
			'aria-label': '',
		},
	};
	if (typeOfAction) {
		switch (typeOfAction.toLowerCase()) {
		case 'add':
			result.attributeList.id = 'submit-add-form';
			result.attributeList.value = 'submit';
			result.attributeList['aria-label'] = 'Click to add a new item to your list';
			result.textContent = 'Add';
			break;
		case 'update':
			result.attributeList.id = 'submit-update-form';
			result.attributeList.value = 'update item';
			result.attributeList['aria-label'] = `Click to update the selected item ${nameOfItem}`;
			result.textContent = 'Update';
			break;
		case 'delete':
			result.attributeList.id = 'submit-delete-dialog';
			result.attributeList.value = 'delete item';
			result.attributeList['aria-label'] = `Click to delete the selected item ${nameOfItem}`;
			result.textContent = 'Delete';
			break;
		case 'import':
			result.attributeList.id = 'submit-import-form';
			result.attributeList.value = 'submit';
			result.attributeList['aria-label'] = '';
			result.type = 'a';
			result.textContent = 'import';
			break;
		case 'export':
			result.attributeList.id = 'export-list';
			result.attributeList.value = 'submit';
			result.attributeList['aria-label'] = 'Click to download your list as .csv file';
			result.type = 'a';
			result.textContent = 'Export';
			break;
		default:
			break;
		}
	}
	return result;
}

function createActionButton(typeOfAction: TypeOfAction, nameOfItem = '') {
	if (typeOfAction) {
		const buttonColors = selectConfirmButtonColors(typeOfAction);
		const classList: Array<string> = [
			'text-white',
			'font-bold',
			'py-2',
			'px-4',
			'rounded',
			'btn-form',
			'cursor-pointer',
			...buttonColors,
		];

		// center text if the typeOfAction is export or import
		if (/^(export|import)$/.test(typeOfAction.toLowerCase())) {
			classList.push('text-center');
		}

		const {
			attributeList, textContent, type,
		} = createAttributeListAndTextContentAndType(typeOfAction, nameOfItem);
		return <HTMLElement>createHTMLElement({
			type,
			classList,
			attributeList,
			textContent,
		});
	}
	return null;
}

function createCancelButton(typeOfAction: TypeOfAction): HTMLButtonElement {
	if (typeOfAction) {
  	const classList: Array<string> = [
			'hover:bg-blue-700',
			'text-white',
			'font-bold',
			'py-2',
			'px-4',
			'rounded',
			'btn-form',
			'btn--cancel-dialog',
			'bg-blue-500',
		];

		const attributeList = {
			id: 'cancel-add-update-form',
			'aria-label': `Cancel the ${typeOfAction.toLowerCase()} action`,
		};
		return <HTMLButtonElement>createHTMLElement({
			type: 'button',
			classList,
			attributeList,
			textContent: 'Cancel',
		});
	}
	return null;
}

/**
 * create a button container and append a confirm and cancel button
 * @param typeOfAction TypeOfAction
 * @param nameOfItem string
 */
export default function createButtonContainer(typeOfAction: TypeOfAction, nameOfItem = ''): HTMLDivElement {
	const classList: Array<string> = ['flex', 'justify-around'];

	switch (typeOfAction.toLowerCase()) {
	case 'export':
		classList.push('w-full');
		break;
	case 'import':
		classList.push('w-full');
		break;
	default:
		// case add, update, delete
		classList.push('w-2/5');
		break;
	}

	const div = <HTMLDivElement>createHTMLElement({
		type: 'div',
		classList,
		attributeList: {},
		textContent: '',
	});
	const cancelButton: HTMLButtonElement = createCancelButton(typeOfAction);
	const confirmButton = createActionButton(typeOfAction, nameOfItem);
	div.appendChild(confirmButton);
	div.appendChild(cancelButton);
	return div;
}
