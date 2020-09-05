import ListItem from '../interfaces/list-item';

const tbody: HTMLElement = document.querySelector('tbody');

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

// function to render the actual table
export default function (itemList: Array<ListItem>): void {
  // clear child nodes
  tbody.textContent = '';
  // TODO: Add Listeners
  for (let i = 0; i < itemList.length; i += 1) {
    const selectedItem = itemList[i];
    const tagList: String = selectedItem.tags.join(' ');
    const entry: HTMLElement = document.createElement('tr');
    entry.classList.add('hover:bg-gray-200');
    const entryBody = `
      <td class="py-2" data-_id="${selectedItem._id}" data-name=${
      selectedItem.name
    }>
        <button class="flex justify-center item-center w-12 btn-fav-img">
          ${createFavoriteSVG(selectedItem)}
        </button>        
      </td>
      <td class="px-4 py-2 text-center">${selectedItem.name}</td>
      <td class="px-4 py-2 text-center">${tagList}</td>
      <td class="flex justify-around px-4 py-2">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn--options"
        >
          Edit
        </button>
        <button
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded btn--options"
        >
          Delete
        </button>
      </td>`;
    entry.innerHTML = entryBody;
    tbody.insertAdjacentElement('beforeend', entry);
  }
}
