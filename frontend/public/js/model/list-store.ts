import ListItem from '../interfaces/list-item';

/**
 * TODO:
 *  1. change sort on init
 *    a. first favorites by name
 *    b. rest by name
 *  2. change sortByName
 *  3. add filter-function
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
  sortByName(arr: Array<ListItem>): Array<ListItem> {
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
  sortListsByFav(arr: Array<ListItem>): Array<ListItem> {
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
  updateItem({
    tags: tagsToUpdate = undefined,
    isFavorite: updateIsFavorite = undefined,
    name: nameToUpdate = undefined,
    _id,
  }: ListItem) {
    const objectToUpdate = this.getItemByID(_id);
    // Update only fields who are passed
    if (tagsToUpdate) objectToUpdate.tags = tagsToUpdate;
    if (updateIsFavorite !== undefined)
      objectToUpdate.isFavorite = updateIsFavorite;
    if (name !== undefined) objectToUpdate.name = nameToUpdate;
    this.selectedListItems = this.sortListsByFav(this.allListItems);
    return objectToUpdate;
  }
  /**
   * Filter the Entries in allListItems-Array by their tags and safe the result in the selectedListItems-Array
   * There are two cases considered:
   *  1. filter for absence of a tag (e.g. !comedy)
   *  2. filter for existence of a tag
   *
   * @param tagsToSearch string
   */
  filterByTags(tagsToSearch: string): void {
    const tempArray: Array<ListItem> = [...this.allListItems];
    const tagsArray: Array<string> = tagsToSearch.trim().split(' ');
    // for each item in tagsArray
    for (let i = 0; i < tagsArray.length; i += 1) {
      // trim each entry in tagsArray before consume the tag
      let actualTag = tagsArray[i].trim();
      if (actualTag[0] === '!') {
        // items shall not include this tag;
        [, actualTag] = actualTag.split('!');
        // loop through each entry in tempArray and remove items with the corresponding tag
        for (let j = 0; j < tempArray.length; j += 1) {
          if (tempArray[j].tags.includes(actualTag)) {
            tempArray.splice(j, 1);
          }
        }
      } else {
        // item shall be include this tag
        for (let j = 0; j < tempArray.length; j += 1) {
          if (!tempArray[j].tags.includes(actualTag)) {
            tempArray.splice(j, 1);
          }
        }
      }
    }
    this.selectedListItems = tempArray;
  }
  addItem(newItem: ListItem) {
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
   * delete an entry from the allListItems-Array and re-sort the selectedListItems Array
   * @param _id string
   */
  deleteItemByID(_id: string) {
    const temp = [];
    for (let i = 0; i < this.allListItems.length; i += 1) {
      // push every item, which does not have the wanted _id into temp
      //  skip the entry with the wanted _id;
      if (this.allListItems[i]['_id'] === _id) continue;
      temp.push(this.allListItems[i]);
    }
    // set allListItems with the temp (result of the for-of loop)
    this.allListItems = temp;
    this.selectedListItems = this.sortListsByFav(this.allListItems);
  }
  /**
   * get an Element from the allListItems-Array by their _id
   * @param _id string
   */
  getItemByID(_id: string): ListItem {
    if (typeof _id === 'string') {
      return this.allListItems.find(
        (item: ListItem): Boolean => item['_id'] === _id,
      );
    }
  }
  /**
   * Get the selectedListItems-array
   */
  getSelectedListItems(): Array<ListItem> {
    return this.selectedListItems;
  }
}
