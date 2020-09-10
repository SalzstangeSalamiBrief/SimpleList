import ListItem from '../interfaces/list-item';

export default class FetchHandler {
  private backendURL;
  constructor() {
    this.backendURL = 'http://127.0.0.1:8081/api/list-item/';
  }
  async deleteEntryOnServer(_id: string) {
    try {
      await fetch(this.backendURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }),
      });
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
      return null;
    }
    try {
      const response = await fetch(this.backendURL, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemToUpdate),
      });
      if (response.status !== 200) {
        return null;
      }
      const { succ } = await response.json();
      return succ;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async postNewEntryToServer(
    name: string,
    tags: Array<string>,
  ): Promise<ListItem> | null {
    try {
      const response = await fetch(this.backendURL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, tags }),
      });
      if (response.status !== 201) {
        return null;
      }
      const { succ } = await response.json();
      return succ;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async getAllEntriesFromServer(): Promise<Array<ListItem>> {
    try {
      const response = await fetch(this.backendURL, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const { succ } = await response.json();
        // return all entries
        return succ;
      }
      return null;
    } catch (err) {
      console.error(err);
    }
  }
}
