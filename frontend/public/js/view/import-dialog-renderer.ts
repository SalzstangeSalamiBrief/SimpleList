import { createHTMLElement } from './util/util-function';
import createDialogElement from './util/dialog-container-creator';

const divToAppendDialog = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);

function createImportForm(): HTMLFormElement {
	// create form element
	const attributeListForm = {
		action: '#',
		id: 'import-form',
	};
	const form = <HTMLFormElement>createHTMLElement({
		type: 'form',
		classList: [],
		attributeList: attributeListForm,
		textContent: '',
	});

	// create input
	const attributeListInput = {
		type: 'file',
		accept: '.csv',
		name: 'file-import-input',
		id: 'file-import-input',
	};
	const input = <HTMLInputElement>createHTMLElement({
		type: 'input',
		classList: [],
		attributeList: attributeListInput,
		textContent: '',
	});
	// create label for input
	const label = <HTMLLabelElement>createHTMLElement({
		type: 'label',
		classList: [],
		attributeList: {
			for: 'file-import-input',
		},
		textContent: 'Select a file to import:',
	});
	// create button
	const btn = <HTMLButtonElement>createHTMLElement({
		type: 'button',
		classList: ['bg-blue-500',
			'hover:bg-blue-700',
			'text-white',
			'font-bold',
			'py-2',
			'px-4',
			'rounded',
			'btn--options',
		],
		attributeList: {},
		textContent: 'Import',
	});

	form.appendChild(label);
	form.appendChild(input);
	form.appendChild(btn);

	return form;
}

function createDialogContainer(): HTMLDialogElement {
	return <HTMLDialogElement>createDialogElement(['export-dialog']);
}

export default function composeAndAddImportDIalog(): void {
	const container: HTMLDialogElement = createDialogContainer();
	const form: HTMLFormElement = createImportForm();
	container.appendChild(form);
	divToAppendDialog.appendChild(container);
}
