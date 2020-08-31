import ListItem from '../interfaces/list-item';

const tbody: HTMLElement = document.querySelector('tbody');
// function to render the actual table
export default function (itemList: Array<ListItem>): void {
  // clear child nodes
  tbody.textContent = '';
  // TODO: Add Listeners
  for (let i = 0; i < itemList.length; i += 1) {
    const tagList: String = itemList[i].tags.join(' ');
    const starIcon: String = itemList[i].isFavorite
      ? 'fas fa-star text-yellow-400 icon-border'
      : 'far fa-star';
    const entry: HTMLElement = document.createElement('tr');
    entry.classList.add('hover:bg-gray-200');
    const entryBody = `
      <td class="flex justify-end px-4 py-2">
        <button class="">
            <i
              class="${starIcon} star-icon"
              data-list-index="${String(itemList[i].index)}"
            >
            </i>
        </button>
      </td>
      <td class="px-4 py-2 text-center">${itemList[i].name}</td>
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
