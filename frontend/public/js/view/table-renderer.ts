import { createHTMLElement } from './util/util-function';

import ListItem from '../interfaces/list-item';

const tbody: HTMLElement = document.querySelector('tbody');
function createFavoriteSVG(
	_id = '',
	isFavorite: boolean = undefined,
): string {
	return `
  <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg
      xmlns:dc="http://purl.org/dc/elements/1.1/"
      xmlns:cc="http://creativecommons.org/ns#"
      xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
      xmlns:svg="http://www.w3.org/2000/svg"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
      xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
      viewBox="0 0 576 512"
      version="1.1"
      sodipodi:docname="star.svg"
      inkscape:version="0.92.3 (2405546, 2018-03-11)"
      class="w-1/2 fav-img ${isFavorite ? 'marked-as-fav' : ''}"
      data-_id="${_id}" 
      >
      <path
        d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
        class="fav__outer"
        />
      <path
        class="fav__inner"
        d="m 288,68.1 -62.2,126 -139,20.2 100.6,98 -23.7,138.4 124.3,-65.3 124.3,65.3 -23.7,-138.4 100.6,-98 -139,-20.2 z"
        class="fav__border"
        inkscape:connector-curvature="0" />
    </svg>
  `;
}

function renderTagList(tags: Array<string> = [], name = ''): string {
	let list = `
    <ul
      class="list-none flex w-full justify-start item-center overscroll-y-auto"
      aria-label="list of tags for the item ${name}">`;
	if (Array.isArray(tags)) {
		for (let i = 0; i < tags.length; i += 1) {
			list += `
          <li
            class="mx-1 px-4 py-2 tag bg-gray-300"
            aria-label="tag for item ${name}: ${tags[i]}" 
            tabindex=0">
            ${tags[i]} 
          </li>   
        `;
		}
	}
	list += '</ul>';
	return list;
}

// function to render the actual table
export default function createTable(itemList: Array<ListItem> = []): void {
	// clear child nodes
	tbody.textContent = '';

	for (let i = 0; i < itemList.length; i += 1) {
		const {
			name, _id, isFavorite, tags,
		}: ListItem = itemList[i];
		const classListRow = [
			'hover:bg-gray-200',
		];
		const entry = <HTMLTableRowElement>createHTMLElement({
			type: 'tr',
			classList: classListRow,
			attributeList: {},
			textContent: '',
		});
		entry.dataset._id = _id;
		entry.dataset.name = name;

		const ariaLabel = `${name} is ${isFavorite ? '' : 'not'
		} a favorite of yours. If you want to change that click this icon`;
		const entryBody = `
      <td class="py-4">
        <button class="flex justify-center item-center w-12 btn-fav-img"
             aria-label="${ariaLabel}">
          ${createFavoriteSVG(_id, isFavorite)}
        </button>        
      </td>
      <td class="p-4 text-center">
        <button class="row-item-name w-full h-full overflow-hidden">
          ${name}
        </button>      
      </td>
      <td class="p-4 text-center">${renderTagList(tags, name)}</td>
      <td class="flex justify-center items-center p-4 options-row">
        <button class="btn--options edit-btn mr-4 h-full" aria-label="click to update item ${name}">
          Edit
        </button>
        <button class="btn--options open-delete-dialog h-full" aria-label="Click to delete item ${name}">
          Delete
        </button>
      </td>`;
		entry.innerHTML = entryBody;
		tbody.insertAdjacentElement('beforeend', entry);
	}
}
