import { createHTMLElement } from './util-function';

/**
 * Create a dialog-container
 * The styles are based on the type of the dialog
 * @param typeOfDialog DialogTypes
 */
export default function createDialogElement(
	typeOfDialog: string,
): HTMLDialogElement {
	if (['add-update', 'import', 'export', 'delete'].includes(typeOfDialog)) {
		let additionalClasses: Array<string> = [];
		switch (typeOfDialog.toLowerCase()) {
		case 'delete':
			additionalClasses = ['delete-dialog', 'w-1/3'];
			break;
		case 'add-update':
			additionalClasses = ['add-update-dialog', 'w-1/2'];
			break;
		case 'export':
			additionalClasses = ['export-dialog', 'w-1/5'];
			break;
		case 'import':
			additionalClasses = ['import-dialog', 'w-1/4'];
			break;
		default:
			break;
		}

		const classList = [
			'w-1/2',
			'flex',
			'flex-col',
			'justify-center',
			'items-center',
			'shadow-lg',
			'border-solid',
			'border-gray-600',
			'bg-white',
			'p-4',
			...additionalClasses,
		];
		return <HTMLDialogElement>createHTMLElement({
			type: 'dialog',
			classList,
			attributeList: {},
			textContent: '',
		});
	}
	return null;
}
