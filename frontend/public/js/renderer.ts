interface DatasetEntry {
  entryName: string;
  entryValue: string | number;
}

interface HTMLNodesToCreate {
  tag: string;
  classList: Array<string> | undefined;
  id: string | undefined;
  dataset: Array<DatasetEntry> | undefined;
  textContent: string | undefined;
  children: Array<HTMLNodesToCreate> | undefined;
}

/**
 * Check if the passed param is an array
 * @param arr Array<string|Object>
 */
function checkForArray(arr: Array<string | HTMLNodesToCreate>) {
  return Array.isArray(arr);
}

function createHTMLFromArray(arr: Array<HTMLNodesToCreate>) {
  if (!checkForArray(arr)) {
    // #TODO
    return;
  }
  for (const node of arr) {
    const actualItem = document.createElement(node.tag);
    // add dataset
    for (const data of node.dataset) {
      actualItem.dataset[data.entryName] = String(data.entryValue);
    }
    // add classList
    for (const listEntry of node.classList) {
      actualItem.classList.add(listEntry);
    }
  }
}

function createHTMLElement(itemToCreate: HTMLNodesToCreate): HTMLElement {
  const createdItem: HTMLElement = document.createElement(itemToCreate.tag);
  // add dataset
  if (itemToCreate.dataset !== undefined) {
    for (const data of itemToCreate.dataset) {
      if (data.entryName !== '' || data.entryValue !== '') {
        createdItem.dataset[data.entryName] = String(data.entryValue);
      }
    }
  }

  // add classes
  if (itemToCreate.classList !== undefined) {
    for (const listEntry of itemToCreate.classList) {
      if (listEntry !== '') {
        createdItem.classList.add(listEntry);
      }
    }
  }

  // add id
  if (itemToCreate.id !== undefined && itemToCreate.id !== '') {
    createdItem.id = itemToCreate.id;
  }
  // add textContent, if this key exists on the passed item
  if (itemToCreate.textContent !== undefined && itemToCreate.textContent !== '') {
    createdItem.textContent = itemToCreate.textContent;
  } else {
    // else case: no text-content
    // create and append children
    for (const child of itemToCreate.children) {
      createdItem.appendChild(createHTMLElement(child));
    }
  }
  return createdItem;
}


function appendHTMLDesc(parent: HTMLElement, root: HTMLNodesToCreate) {
  const child: HTMLElement = createHTMLElement(root);
  parent.insertAdjacentElement('beforeend', child);
}


const tableToCreate: HTMLNodesToCreate = {
  tag: 'tr',
  classList: ['hover:bg-gray-200'],
  dataset: [{}, {entyName: 'name', 'entryValue':}]
}

function parseStoreEntriesToTable() {
  
}

// interface HTMLNodesToCreate {
//   tag: string;
//   classList: Array<string> | undefined;
//   id: string | undefined;
//   dataset: Array<DatasetEntry> | undefined;
//   textContent: string | undefined;
//   children: Array<HTMLNodesToCreate> | undefined;
// }