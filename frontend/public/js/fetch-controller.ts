import ListItem from './interfaces/list-item';
// TODO: JSON.parse the responses and handle the resulting json-object
export default class FetchHandler {
  private backendURL;
  constructor() {
    this.backendURL = 'http://127.0.0.1:8081/api/list-item/';
  }
  async deleteEntryOnServer(_id: string) {
    // TODO: Responsetype
    try {
      const response = await fetch(this.backendURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }),
      });
      // return something
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }
  async updateEntryOnServer(itemToUpdate: ListItem): Promise<ListItem> {
    if (
      itemToUpdate.name === undefined ||
      itemToUpdate.tags.length < 1 ||
      itemToUpdate._id === undefined ||
      itemToUpdate.isFavorite === undefined
    ) {
      console.error('error update: passed entry');
      return;
    }
    try {
      const response = await (
        await fetch(this.backendURL, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemToUpdate),
        })
      ).json();
      console.log(response);
      // return something
      return response.succ;
    } catch (err) {
      console.error(err);
    }
  }
  async postNewEntryToServer(
    name: string,
    tags: Array<string>,
  ): Promise<string> {
    console.log(name, tags);
    try {
      const response = await (
        await fetch(this.backendURL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, tags }),
        })
      ).json();
      console.log(response);
      // return response.succ['_id'];
      // return something
      return response.succ['_id'];
    } catch (err) {
      console.error(err);
    }
  }
  async getAllEntriesFromServer(): Promise<Array<ListItem>> {
    try {
      const response = await (
        await fetch(this.backendURL, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();
      // const responseData = await JSON.parse(response);
      console.log(response);
      // return response.succ;
      // return something
      return response.succ;
    } catch (err) {
      console.error(err);
    }
  }
}
