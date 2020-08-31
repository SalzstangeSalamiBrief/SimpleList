// interface ListItem{
//   name: String;
//   tags: String[];
//   isFavorite: boolean;
// }
import ListItem from '../interfaces/list-item';

interface Store {
	allListItems: ListItem[];
	selectedListItems: ListItem[];
}

interface StoreFunctions {
	updateItem: Function;
	filterByTags: Function;
	addItem: Function;
	getSelectedListItems: Function;
}

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
export function createStore(): StoreFunctions {
	// todo check if closure is proper behaving
	const store: Store = {
		allListItems: [],
		selectedListItems: [],
	};
	const storeFunctions: StoreFunctions = {
		updateItem: (
			indexOfitemToUpdate: number,
			{ tagsToUpdate = [], updateIsFavorite = undefined },
		): ListItem => {
			const updateObject = store.allListItems[indexOfitemToUpdate];
			updateObject.tags = tagsToUpdate;
			if (updateIsFavorite) updateObject.tags = updateIsFavorite;
			// TODO: fetch METHOD PUT && save response in updatedObject
			const updatedObject = { name: '', tags: [], isFavorite: false };
			return updatedObject;
		},
		filterByTags: (tagsToSearch: String) => {
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
		addItem(item: ListItem) {
			if (item.name && item.tags.length > 0) {
				const newItem = item;
				console.log(item);
				newItem.isFavorite = false;
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