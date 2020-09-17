import ListItem from '../interfaces/list-item';

/**
 * TODO:
 *  1. change sort on init
 *    a. first favorites by name
 *    b. rest by name
 *  2. change sortByName
 */
export default class Store {
  private allListItems: Array<ListItem>;

  public selectedListItems: Array<ListItem>;

  constructor(newListItemArray: Array<ListItem> = []) {
  	// sort and add to allListItems-Array
  	this.allListItems = [...this.sortByName(newListItemArray)];
  	// Copy allListItems into selectedListItems
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
  	// 1. split list into favorites and not favorites
  	const isFavList = [];
  	const notFavList = [];

  	for (let i = 0; i < arr.length; i += 1) {
  		if (arr[i].isFavorite === true) {
  			isFavList.push(arr[i]);
  		} else {
  			notFavList.push(arr[i]);
  		}
  	}
  	// 2. sort both lists by name
  	const sortedIsFavList = this.sortByName(isFavList);
  	const sortedNotFavList = this.sortByName(notFavList);
  	// 3. merge both lists into one and return the result;
  	return sortedIsFavList.concat(sortedNotFavList);
  }

  /**
   *
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
  	if (name !== undefined) objectToUpdate.name = nameToUpdate;
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
  	// case if the tagsToSearch array is empty: display all items
  	if (tagsToSearch.length === 0) {
  		this.selectedListItems = this.sortListsByFav(this.allListItems);
  		return;
  	}
  	// case: tagsToSearch.length is greater than 1
  	const tempArray: Array<ListItem> = [...this.allListItems];
  	const indexArrayToAdd: Array<number> = [];
  	// for each item in tagsArray
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
  		resultArray.push(tempArray[indexArrayToAdd[k]]);
  	}
  	this.selectedListItems = this.sortListsByFav(resultArray);
  }

  public addItem(newItem: ListItem): ListItem {
  	if (newItem.name && newItem.tags.length > 0 && newItem._id !== undefined) {
  		if (newItem.isFavorite === undefined) {
  			newItem.isFavorite = false;
  		}
  		// add to all ListItems
  		this.allListItems.push(newItem);
  		// sort allListItems and set selectedListItems
  		this.selectedListItems = this.sortListsByFav(this.allListItems);
  		return newItem;
  	}
  }

  /**
	 * Function which inits the data of the store and renders the store
	 * @param fetchController FetchController
	 * @param errorController ErrorController
	 * @param tableRenderer TableController
	 */
  public async initOnSideLoad(fetchController, errorController, tableRenderer): Promise<void> {
  	// fetch all ListItems from the server
  	const initListEntries = <Array<ListItem>>(
			await fetchController.getAllEntriesFromServer()
		);
  	// if the response is null, then display an error
  	if (initListEntries === null) {
  		return errorController.setErrorMessage(
  			'An error happened on loading the content. Please refresh the site.',
  		);
  	}
  	// add each item in initListEntries to the store
  	for (let i = 0; i < initListEntries.length; i += 1) {
  		this.addItem(initListEntries[i]);
  	}
  	// render stable
  	return tableRenderer(this.getSelectedListItems());
  }

  /**
   * delete an entry from the allListItems-Array and re-sort the selectedListItems Array
   * @param _id string
   */
  public deleteItemByID(_id: string): void {
  	const temp = [];
  	for (let i = 0; i < this.allListItems.length; i += 1) {
  		// push every item, which does not have the wanted _id into temp
  		//  skip the entry with the wanted _id;
  		if (this.allListItems[i]._id !== _id) {
  			temp.push(this.allListItems[i]);
  		}
  	}
  	// set allListItems with the temp (result of the for-of loop)
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
