import { createHTMLElement } from './util/util-function';
import createDialogElement from './util/dialog-element-creator';
import createButtonContainer from './util/button-container-creator';

const divToAppendDialog = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);

/**
 * create the input
 */
function createImportInput(): HTMLDivElement {
	const containerDiv = <HTMLDivElement>createHTMLElement({
		type: 'div',
		classList: ['flex', 'w-full', 'mb-4'],
		attributeList: {},
		textContent: '',
	});

	const labelClassList = [
		'bg-blue-500',
		'hover:bg-blue-700',
		'text-white',
		'font-bold',
		'py-2',
		'px-4',
		'rounded',
		'btn--options',
		'cursor-pointer',
		'ml-2',
	];
	const labelAttributeList = {
		'aria-label': 'Select a File',
		for: 'file-import-input',
	};
	const label = <HTMLLabelElement>createHTMLElement({
		type: 'label',
		classList: labelClassList,
		attributeList: labelAttributeList,
		textContent: 'Select a File',
	});

	const inputAttributeList = {
		id: 'file-import-input',
		type: 'file',
		accept: '.csv',
		name: 'file-import-input',
	};
	const input = <HTMLInputElement>createHTMLElement({
		type: 'input',
		classList: [],
		attributeList: inputAttributeList,
		textContent: '',
	});

	const paragraphClassList = [
		'flex',
		'justify-start',
		'items-center',
		'w-2/3',
		'overflow-x-hidden',
		'px-2',
		'rounded',
		'border',
		'border-solid',
		'border-gray-400',
	];
	const p = <HTMLParagraphElement>createHTMLElement({
		type: 'p',
		classList: paragraphClassList,
		attributeList: { id: 'file-picker__file-name' },
		textContent: 'No File Selected',
	});

	containerDiv.appendChild(p);
	containerDiv.appendChild(label);
	containerDiv.appendChild(input);

	return containerDiv;
}

/**
 * create the import form
 */
function createImportForm(): HTMLFormElement {
	const attributeListForm = {
		action: '#',
		id: 'import-form',
	};
	const form = <HTMLFormElement>createHTMLElement({
		type: 'form',
		classList: ['w-full'],
		attributeList: attributeListForm,
		textContent: '',
	});

	const inputContainer = <HTMLDivElement>createImportInput();
	const buttonContainer: HTMLDivElement = createButtonContainer('import');

	form.appendChild(inputContainer);
	form.appendChild(buttonContainer);

	return form;
}

/**
 * create the whole import dialog
 */
export default function createImportDialog(): void {
	const container: HTMLDialogElement = <HTMLDialogElement>createDialogElement('import');
	const form: HTMLFormElement = createImportForm();

	container.appendChild(form);
	divToAppendDialog.appendChild(container);
}
