import { createHTMLElement } from './util-function';

export default function createDialogElement(
	additionalClasses: Array<string> = [],
	width = 'small',
): HTMLDialogElement {
	if (['small', 'medium', 'large'].includes(width)) {
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
		const widthSelector = {
			small: 'w-1/5',
			medium: 'w-1/3',
			large: 'w-1/2',
		};
		classList.push(widthSelector[width]);
		return <HTMLDialogElement>createHTMLElement({
			type: 'dialog',
			classList,
			attributeList: {},
			textContent: '',
		});
	}
}
