import ListItem from '../interfaces/list-item';

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
   *
   * @param ListItem ListItem
   */
  updateItem({
    tags: tagsToUpdate = undefined,
    isFavorite: updateIsFavorite = undefined,
    name: nameToUpdate = undefined,
    _id,
  }: ListItem): ListItem {
    const objectToUpdate = this.getItemByID(_id);
    // Update only fields who are passed
    if (tagsToUpdate) objectToUpdate.tags = tagsToUpdate;
    if (updateIsFavorite !== undefined)
      objectToUpdate.isFavorite = updateIsFavorite;
    if (name !== undefined) objectToUpdate.name = nameToUpdate;
    // todo fetch Method PUT
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
  addItem({
    name,
    tags,
    isFavorite = false,
    _id = undefined,
  }: ListItem): ListItem | null {
    if (name && tags.length > 0) {
      const newItem = {
        name,
        tags,
        isFavorite,
        _id: String(_id),
      };
      // check if id is defined, if not, postreq to server and set id with response id
      if (newItem['_id'] === undefined) {
        // TODO: Post-Req to backend and set response _id as id for the new item
        // newItem._id = response._id
      }
      // add to all ListItems
      this.allListItems.push(newItem);
      // sort allListItems and set selectedListItems
      this.selectedListItems = this.sortByName(this.allListItems);
      return newItem;
    }
    return null;
  }
  /**
   * delete an entry from the allListItems-Array and re-sort the selectedListItems Array
   * @param _id string
   */
  deleteItemByID(_id: string) {
    const indexOfEntry = this.allListItems.findIndex(
      (item: ListItem) => item['_id'] === _id,
    );
    this.allListItems.splice(indexOfEntry, 1);
    this.selectedListItems = this.sortByName(this.allListItems);
    console.log(this.allListItems);
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
