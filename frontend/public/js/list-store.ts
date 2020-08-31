// interface ListItem{
//   name: String;
//   tags: String[];
//   isFavorite: boolean;
// }
import ListItem from '../interfaces/list-item';
import StoreFunctions from '../interfaces/store-functions';

interface Store {
  allListItems: ListItem[];
  selectedListItems: ListItem[];
}

// interface StoreFunctions {
// 	updateItem: Function;
// 	filterByTags: Function;
// 	addItem: Function;
// 	getSelectedListItems: Function;
// }

function sortByName(arr: ListItem[]): ListItem[] {
  // copy input array
  const temp: ListItem[] = [...arr];
  return temp.sort((a: ListItem, b: ListItem): number => {
    const lowercaseA = a.name.toLowerCase();
    const lowercaseB = b.name.toLowerCase();
    if (lowercaseA > lowercaseB) return 1;
    if (lowercaseA < lowercaseB) return -1;
    return 0;
  });
}

// eslint-disable-next-line no-unused-vars
export default function (): StoreFunctions {
  // todo check if closure is proper behaving
  const store: Store = {
    allListItems: [],
    selectedListItems: [],
  };
  const storeFunctions: StoreFunctions = {
    updateItem: () => (
      // indexOfItemToUpdate: number,
      { tagsToUpdate = [], updateIsFavorite = undefined, index },
    ): ListItem => {
      const updateObject = this.getItemByIndex(index);
      updateObject.isFavorite = updateIsFavorite;
      // store.allListItems[indexOfItemToUpdate];
      if (tagsToUpdate) updateObject.tags = tagsToUpdate;
      // TODO: fetch METHOD PUT && save response in updatedObject
      const updatedObject = { name: '', tags: [], isFavorite: false, index };
      return updatedObject;
    },
    // updateItem: (
    //   // indexOfItemToUpdate: number,
    //   { tagsToUpdate = [], updateIsFavorite = undefined, index },
    // ): ListItem => {
    //   const updateObject = getItemByIndex(index);
    //   updateObject.isFavorite = updateIsFavorite;
    //   // store.allListItems[indexOfItemToUpdate];
    //   if (tagsToUpdate) updateObject.tags = tagsToUpdate;
    //   // TODO: fetch METHOD PUT && save response in updatedObject
    //   const updatedObject = { name: '', tags: [], isFavorite: false, index };
    //   return updatedObject;
    // },
    filterByTags: (tagsToSearch: String): void => {
      const tempArray: ListItem[] = [...store.allListItems];
      const tagsArray = tagsToSearch.split(' ');
      // for each item in tags Array
      for (let i = 0; i < tagsArray.length; i += 1) {
        let actualTag = tagsArray[i];
        if (actualTag.includes('!')) {
          // search if the item does not include this tag
          // !comedy => ['!', 'comedy']
          [, actualTag] = actualTag.split('!');
          for (let j = 0; j < tempArray.length; j += 1) {
            // remove each item with the unwanted tag
            if (tempArray[j].tags.includes(actualTag)) {
              tempArray.splice(j, 1);
            }
          }
        } else {
          // remove each item which does not has the searched tag
          for (let j = 0; j < tempArray.length; j += 1) {
            if (!tempArray[j].tags.includes(actualTag)) {
              tempArray.splice(j, 1);
            }
          }
        }
      }
      store.selectedListItems = tempArray;
    },
    addItem(item: ListItem): ListItem | null {
      if (item.name && item.tags.length > 0) {
        const newItem = item;
        console.log(item);
        newItem.isFavorite = false;
        newItem.index = store.allListItems.length;
        // 1. post to server
        // 2. wait for response, then add to both arrays in the store
        // 3. after adding the item, sort array
        store.allListItems.push(newItem);
        store.selectedListItems = sortByName(store.allListItems);
        return item;
      }
      // todo: error
      return null;
    },
    getSelectedListItems(): ListItem[] {
      return store.selectedListItems;
    },
    getItemByIndex(index: Number | String): ListItem {
      return store.selectedListItems.find(
        (item: ListItem) => item.index === Number(index),
      );
    },
  };

  // init
  // 1. fetch data and Sort
  // todo: fetch
  const result = sortByName([]);
  // 3. add result to both arrays
  store.allListItems = [...result];
  store.selectedListItems = [...result];
  return storeFunctions;
}
// todo: outsource renderer for list
