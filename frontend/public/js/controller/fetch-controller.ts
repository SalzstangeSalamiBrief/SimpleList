import ListItem from '../interfaces/list-item';

export default class FetchHandler {
  private backendURL;
  constructor() {
    this.backendURL = 'http://127.0.0.1:8081';
  }
  public async deleteEntryOnServer(_id: string) {
    try {
      await fetch(`${this.backendURL}/api/list-item/`, {
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
  public async updateEntryOnServer(itemToUpdate: ListItem): Promise<ListItem> {
    if (
      itemToUpdate.name === '' ||
      !Array.isArray(itemToUpdate.tags) ||
      itemToUpdate._id === undefined ||
      itemToUpdate.isFavorite === undefined
    ) {
      return null;
    }
    try {
      const response = await fetch(`${this.backendURL}/api/list-item/`, {
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
  public async postNewEntryToServer(
    name: string,
    tags: Array<string>,
  ): Promise<ListItem> | null {
    try {
      const response = await fetch(`${this.backendURL}/api/list-item/`, {
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
  public async getAllEntriesFromServer(): Promise<Array<ListItem>> {
    try {
      const response = await fetch(`${this.backendURL}/api/list-item/`, {
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

  public async initDownloadOfCSV() {
    try {
      const response = await fetch(`${this.backendURL}/api/list`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        const { route: routeForCSVFile } = await response.json();
        console.log(routeForCSVFile);
        this.downloadCSVFile(routeForCSVFile);
      }
    } catch (err) {
      console.log(err);
    }
  }
  /**
   * create an anchor-tag, add the dl-route as href, click the a-tag and remove it
   * @param routeForCSVFile string
   */
  private downloadCSVFile(routeForCSVFile: string) {
    const a: HTMLAnchorElement = document.createElement('a');
    a.style.display = 'none';
    console.log(`${this.backendURL}${routeForCSVFile}`);
    a.href = `${this.backendURL}${routeForCSVFile}`;
    a.setAttribute('download', 'simpleListExportedCSV');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
