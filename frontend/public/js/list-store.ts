import ListItem from '../interfaces/list-item';

export default class Store {
  private allListItems: Array<ListItem>;
  private selectedListItems: Array<ListItem>;
  constructor(newListItemArray: Array<ListItem> = []) {
    // sort and add to allListItems-Array
    this.allListItems = [...this.sortByName(newListItemArray)];
    // Copy allListItems into selectedListItems
    this.selectedListItems = [...this.allListItems];
  }
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
  filterByTags(tagsToSearch: string): void {
    const tempArray: Array<ListItem> = [...this.allListItems];
    const tagsArray: Array<string> = tagsToSearch.trim().split(' ');
    // for each item in tagsArray
    for (let i = 0; i < tagsArray.length; i += 1) {
      let actualTag = tagsArray[i];
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
        _id,
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
  getItemByID(_id: number | string): ListItem {
    const _idType = typeof _id;
    if (_idType === 'number' || _idType === 'string') {
      return this.selectedListItems.find(
        (item: ListItem): Boolean => item['_id'] === _id,
      );
    }
  }
  getSelectedListItems(): Array<ListItem> {
    return this.selectedListItems;
  }
}
