import { createHTMLElement } from './util/util-function';
import createDialogElement from './util/dialog-container-creator';

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

function createExportAnchor(): HTMLAnchorElement {
	const classList = [
		'bg-blue-500',
		'hover:bg-blue-700',
		'text-white',
		'font-bold',
		'py-2',
		'px-4',
		'rounded',
		'btn--options',
		'cursor-pointer',
	];
	const attributeList = {
		id: 'export-list',
		'aria-label': 'Click to download the exported csv file of your list',
	};
	return <HTMLAnchorElement>createHTMLElement({
		type: 'a',
		classList,
		attributeList,
		textContent: 'Export list',
	});
}

/**
 * function which composes the export dialog and append it to the dom
 */
export default function () {
	const dialog: HTMLDialogElement = <HTMLDialogElement>createDialogElement(['export-dialog']);
	const paragraph: HTMLParagraphElement = createExportParagraph();
	const a: HTMLAnchorElement = createExportAnchor();
	dialog.appendChild(paragraph);
	dialog.appendChild(a);
	divToAppendDialog.append(dialog);
}
