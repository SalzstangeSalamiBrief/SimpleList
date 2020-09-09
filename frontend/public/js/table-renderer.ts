import ListItem from './interfaces/list-item';

const tbody: HTMLElement = document.querySelector('tbody');
// TODO: VDOM or osmething like that
function createFavoriteSVG(item: ListItem) {
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
      class="w-1/2 fav-img ${item.isFavorite ? 'marked-as-fav' : ''}"
      data-_id="${item._id}"
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

// TODO Style tags (e.g. label of some sort)
function renderTagList(tags: Array<string>) {
  let list: string =
    '<ul class="list-none flex w-full justify-start item-center overscroll-y-auto">';
  for (let i = 0; i < tags.length; i += 1) {
    list += `
    <li class="mx-1 px-4 py-2 tag bg-gray-300" >
      ${tags[i]} 
    </li>   
  `;
  }
  list += '</ul>';
  return list;
}

// function to render the actual table
export default function (itemList: Array<ListItem>): void {
  // clear child nodes
  tbody.textContent = '';
  // TODO: Add Listeners
  for (let i = 0; i < itemList.length; i += 1) {
    const selectedItem: ListItem = itemList[i];
    const entry: HTMLElement = document.createElement('tr');
    entry.classList.add('hover:bg-gray-200');
    entry.dataset['_id'] = selectedItem._id;
    entry.dataset.name = selectedItem.name;
    const entryBody = `
      <td class="py-2">
        <button class="flex justify-center item-center w-12 btn-fav-img">
          ${createFavoriteSVG(selectedItem)}
        </button>        
      </td>
      <td class="px-4 py-2 text-center">
        <button class="row-item-name w-full h-full overflow-hidden">
          ${selectedItem.name}
        </button>      
      </td>
      <td class="px-4 py-2 text-center">${renderTagList(selectedItem.tags)}</td>
      <td class="flex justify-around px-4 py-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn--options edit-btn"
        >
          Edit
        </button>
        <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded btn--options open-delete-dialog"
        >
          Delete
        </button>
      </td>`;
    entry.innerHTML = entryBody;
    tbody.insertAdjacentElement('beforeend', entry);
  }
}
