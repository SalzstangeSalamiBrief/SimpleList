import { createHTMLElement } from './util/util-function';
import createDialogElement from './util/dialog-element-creator';
import createButtonContainer from './util/button-container-creator';

import ListItem from '../interfaces/list-item';

enum FormAction {
  add = 'add',
  update = 'update',
}

enum InputSelection {
  name = 'name',
  tags = 'tags',
}

const divToAppendDialog = <HTMLDivElement>(
  document.querySelector('div#dialog-container')
);

/**
 * Create an inputContainer with its content.
 * the content will be decided by typeOfInput
 * @param typeOfInput InputSelection
 */
function createInputContainer(
	typeOfInput: InputSelection,
	valueOfInput = '',
): HTMLDivElement {
	const selectedTypeOfInput: string = typeOfInput.toLowerCase();
	if (
		selectedTypeOfInput === InputSelection.name
    || selectedTypeOfInput === InputSelection.tags
	) {
		const tagsContainer = <HTMLDivElement>createHTMLElement({
			type: 'div',
			classList: ['flex', 'w-full'],
			attributeList: {},
			textContent: '',
		});

		// create label for the input
		const classListLabel = ['w-2/6', 'flex', 'items-center', 'justify-start'];
		const label = <HTMLLabelElement>createHTMLElement({
			type: 'label',
			classList: classListLabel,
			attributeList: { for: `dialog__${selectedTypeOfInput}` },
			textContent: `Add ${
				selectedTypeOfInput === 'name' ? 'a name' : 'tags (separated by spaces)'
			}`,
		});

		// create input
		const classListInput = [
			'bg-white',
			'focus:outline-none',
			'focus:shadow-outline',
			'border',
			'border-gray-400',
			'rounded-lg',
			'py-2',
			'px-4',
			'block',
			'appearance-none',
			'leading-normal',
			'w-4/6',
			'mx-4',
			'placeholder-gray-500',
			'placeholder-opacity-100',
		];
		const attributeListInput = {
			type: 'text',
			name: `dialog__${selectedTypeOfInput}`,
			placeholder: `Add ${
				selectedTypeOfInput === 'name' ? 'a name' : 'tags (separated by spaces)'
			}`,
			required: true,
			pattern: `^[A-Za-z0-9]${selectedTypeOfInput === 'name' ? '{5,}' : '+'}$`,
		};
		if (valueOfInput !== '') {
			attributeListInput.value = valueOfInput;
		}
		const inputField = <HTMLInputElement>createHTMLElement({
			type: 'input',
			classList: classListInput,
			attributeList: attributeListInput,
			textContent: '',
		});
		// append label and input
		tagsContainer.appendChild(label);
		tagsContainer.appendChild(inputField);
		return tagsContainer;
	}
	return undefined;
}

/**
 * Function which creates a form for adding or updating items (based on typeOfAction-param)
 * @param typeOfAction FormAction
 */
function createForm(
	typeOfAction: FormAction,
	{ name = '', tags = [] }: ListItem,
): HTMLFormElement {
	const selectedTypeOfAction = typeOfAction.toLowerCase();
	if (
		selectedTypeOfAction === FormAction.add
    || selectedTypeOfAction === FormAction.update
	) {
		// create form
		const classListForm = [
			'form',
			'flex',
			'flex-col',
			'justify-content',
			'items-center',
			'w-4/5',
		];
		const form = <HTMLFormElement>createHTMLElement({
			type: 'form',
			classList: classListForm,
			attributeList: { name: 'item-form' },
			textContent: '',
		});

		// create the container for the name and tags input-fields
		const nameInputContainer: HTMLDivElement = createInputContainer(
			InputSelection.name,
			name,
		);
		const tagsInputContainer: HTMLDivElement = createInputContainer(
			InputSelection.tags,
			tags.join(' '),
		);

		// append container as children
		form.appendChild(nameInputContainer);
		form.appendChild(tagsInputContainer);
		return form;
	}
	return undefined;
}

/**
 * create a heading based on the typeOfAction
 * @param typeOfAction FormAction
 * @param nameOfItem string
 */
function createHeading(
	typeOfAction: FormAction,
	nameOfItem: string,
): HTMLHeadingElement {
	const classList: Array<string> = ['text-center', 'mb-5'];
	const attributeList = { id: 'form__title' };
	const textContent: string = typeOfAction.toLowerCase() === FormAction.add
    	? 'Add a new Item'
    	: 'Update the selected item: ';
	const headingElement = <HTMLHeadingElement>createHTMLElement({
		type: 'h2',
		classList,
		attributeList,
		textContent,
	});
	if (nameOfItem) {
		headingElement.appendChild(
      <HTMLSpanElement>createHTMLElement({
      	type: 'span',
      	classList: ['form__title'],
      	attributeList: {},
      	textContent: nameOfItem,
      }),
		);
	}
	return headingElement;
}

/**
 * Function which creates the add-/update-dialog
 * @param typeOfAction string
 * @param item ListITem
 */
export default function ComposeAddUpdateDialog(typeOfAction: string, item: ListItem): void {
	if (
		typeOfAction.toLowerCase() === FormAction.add
    || typeOfAction.toLowerCase() === FormAction.update
	) {
		const dialog = <HTMLDialogElement>createDialogElement('add-update');

		// create heading
		const heading: HTMLHeadingElement = createHeading(
			FormAction[typeOfAction],
			item.name,
		);
		// create form
		const form: HTMLFormElement = createForm(FormAction[typeOfAction], item);
		// create button-container
		const buttonContainer: HTMLDivElement = createButtonContainer(
			FormAction[typeOfAction],
			item.name,
		);
		// append children
		dialog.appendChild(heading);
		dialog.appendChild(form);
		dialog.appendChild(buttonContainer);

		divToAppendDialog.appendChild(dialog);
	}
}
