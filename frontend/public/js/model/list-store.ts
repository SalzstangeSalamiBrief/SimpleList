import ListItem from '../interfaces/list-item';

import ErrorController from '../controller/error-controller';
import FetchController from '../controller/fetch-controller';
import TableRenderer from '../view/table-renderer';

export default class Store {
  private allListItems: Array<ListItem>;

  public selectedListItems: Array<ListItem>;

  constructor(newListItemArray: Array<ListItem> = []) {
  	this.allListItems = [...this.sortByName(newListItemArray)];
  	this.selectedListItems = [...this.allListItems];
  }

  /**
   * Take the passed array and return an sorted array (asc)
   * the criterion for sorting the array is the name
   * @param arr Array<ListItem>
   */
  public sortByName(arr: Array<ListItem>): Array<ListItem> {
  	const temp: Array<ListItem> = [...arr];
  	return temp.sort((a: ListItem, b: ListItem): number => {
  		const lowerCaseA = a.name.toLowerCase();
  		const lowerCaseB = b.name.toLowerCase();
  		if (lowerCaseA > lowerCaseB) return 1;
  		if (lowerCaseA < lowerCaseB) return -1;
  		return 0;
  	});
  }

  /**
   * Take an array of list-items and sort them
   * first split both lists  by isFavorite and then sort both lists by name.
   * return a merged result of both lists
   * @param arr Array<ListItem>
   */
  public sortListsByFav(arr: Array<ListItem>): Array<ListItem> {
  	const isFavList = [];
  	const notFavList = [];

  	for (let i = 0; i < arr.length; i += 1) {
  		if (arr[i].isFavorite === true) {
  			isFavList.push(arr[i]);
  		} else {
  			notFavList.push(arr[i]);
  		}
  	}
  	const sortedIsFavList = this.sortByName(isFavList);
  	const sortedNotFavList = this.sortByName(notFavList);

  	return sortedIsFavList.concat(sortedNotFavList);
  }

  /**
	 *	Update a ListItem
	 *	Select an Item by id
	 *	If a value for a field is passed as argument, then update that field
   * @param ListItem ListItem
   */
  public updateItem({
  	tags: tagsToUpdate = undefined,
  	isFavorite: updateIsFavorite = undefined,
  	name: nameToUpdate = undefined,
  	_id,
  }: ListItem): ListItem {
  	const objectToUpdate = this.getItemByID(_id);
  	// Update only fields who are passed
  	if (tagsToUpdate) objectToUpdate.tags = tagsToUpdate;
  	if (updateIsFavorite !== undefined) { objectToUpdate.isFavorite = updateIsFavorite; }
  	if (nameToUpdate !== undefined) objectToUpdate.name = nameToUpdate;
  	this.selectedListItems = this.sortListsByFav(this.allListItems);
  	return objectToUpdate;
  }

  /**
   * Filter the Entries in allListItems-Array by their tags
	 *  and safe the result in the selectedListItems-Array
   * There are two cases considered:
   *  1. filter for absence of a tag (e.g. !comedy)
   *  2. filter for existence of a tag
   *
   * @param tagsToSearch string
   */
  public filterByTags(tagsToSearch: Array<string>): void {
  	if (tagsToSearch.length === 0) {
  		this.selectedListItems = this.sortListsByFav(this.allListItems);
  		return;
  	}

  	const tempArray: Array<ListItem> = [...this.allListItems];
  	const indexArrayToAdd: Array<number> = [];

  	for (let i = 0; i < tempArray.length; i += 1) {
  		// for each item in tempArray
  		const { tags: tagsOfEntry } = tempArray[i];
  		let shallEntryBeIncluded = true;
  		for (let j = 0; j < tagsToSearch.length; j += 1) {
  			// for each item in tagsToSearchArray
  			const actualTag = tagsToSearch[j];
  			if (actualTag[0] === '!') {
  				shallEntryBeIncluded = shallEntryBeIncluded
            && !tagsOfEntry.includes(actualTag.split('!')[1]);
  			} else {
  				//  else case: item has to include the tag
  				shallEntryBeIncluded = shallEntryBeIncluded && tagsOfEntry.includes(actualTag);
  			}
  		}
  		// if an item shall be included, push the index of the item to indexArrayToAdd
  		if (shallEntryBeIncluded) {
  			indexArrayToAdd.push(i);
  		}
  	}
  	//
  	const resultArray: Array<ListItem> = [];
  	// add each item from tempArray to resultArray
  	// with the corresponding index saved in indexArrayToAdd
  	for (let k = 0; k < indexArrayToAdd.length; k += 1) {
  		const itemFromTempArray = tempArray[indexArrayToAdd[k]];
  		resultArray.push(itemFromTempArray);
  	}
  	this.selectedListItems = this.sortListsByFav(resultArray);
  }

  public addItem(newItem: ListItem): ListItem {
  	const isNewItemValid = newItem.name && newItem.tags.length > 0 && newItem._id !== undefined;
  	if (isNewItemValid) {
  		const itemToAdd: ListItem = newItem;
  		if (itemToAdd.isFavorite === undefined) {
  			itemToAdd.isFavorite = false;
  		}
  		this.allListItems.push(itemToAdd);
  		this.selectedListItems = this.sortListsByFav(this.allListItems);
  		return newItem;
  	}
  	return null;
  }

  /**
	 * Function which inits the data of the store and renders the store
	 * @param fetchController FetchController
	 * @param errorController ErrorController
	 * @param tableRenderer TableController
	 */
  public async initOnSideLoad(fetchController: FetchController,
  	errorController: ErrorController,
  	tableRenderer: typeof TableRenderer): Promise<void> {
  	const initListEntries = <Array<ListItem>>(
			await fetchController.getAllEntriesFromServer()
		);

  	if (initListEntries === null) {
  		return errorController.setErrorMessage(
  			'An error happened on loading the content. Please refresh the site.',
  		);
  	}

  	this.allListItems = [];
  	this.selectedListItems = [];

  	for (let i = 0; i < initListEntries.length; i += 1) {
  		this.addItem(initListEntries[i]);
  	}

  	return tableRenderer(this.getSelectedListItems());
  }

  /**
   * delete an entry from the allListItems-Array and re-sort the selectedListItems Array
   * @param _id string
   */
  public deleteItemByID(_id: string): void {
  	const temp = [];
  	for (let i = 0; i < this.allListItems.length; i += 1) {
  		const itemIsNotSearched = this.allListItems[i]._id !== _id;
  		if (itemIsNotSearched) {
  			temp.push(this.allListItems[i]);
  		}
  	}
  	this.allListItems = temp;
  	this.selectedListItems = this.sortListsByFav(this.allListItems);
  }

  /**
   * get an Element from the allListItems-Array by their _id
   * @param _id string
   */
  public getItemByID(_id: string): ListItem {
  		return this.allListItems.find(
  			(item: ListItem): boolean => item._id === _id,
  		);
  }

  /**
   * Get the selectedListItems-array
   */
  public getSelectedListItems(): Array<ListItem> {
  	return this.selectedListItems;
  }
}
