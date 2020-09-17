import ListItem from '../interfaces/list-item';

export default class FetchHandler {
  private backendURL: string;

  private csvRoutes: string;

  private listItemRoute: string;

  constructor() {
  	this.backendURL = 'http://127.0.0.1:8081';
  	this.csvRoutes = '/list';
  	this.listItemRoute = '/list-item/';
  }

  public async deleteEntryOnServer(_id: string): Promise<void> {
  	console.log(_id);
  	try {
  		await fetch(`${this.backendURL}/api${this.listItemRoute}`, {
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
  		itemToUpdate.name === ''
      || !Array.isArray(itemToUpdate.tags)
      || itemToUpdate._id === undefined
      || itemToUpdate.isFavorite === undefined
  	) {
  		return null;
  	}
  	try {
  		const response = await fetch(`${this.backendURL}/api${this.listItemRoute}`, {
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
  		const response = await fetch(`${this.backendURL}/api${this.listItemRoute}`, {
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
  		const response = await fetch(`${this.backendURL}/api${this.listItemRoute}`, {
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
  	return [];
  }

  public async initDownloadOfCSV(): void {
  	try {
  		const response = await fetch(`${this.backendURL}/api${this.csvRoutes}`, {
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

  public async postImportFile(fileToUpload: File): Promise<boolean> {
  	console.log(fileToUpload.type);
  	try {
  		const fileData = new FormData();
  		fileData.append('file', fileToUpload);
  		console.log(fileData);
  		const response = await fetch(`${this.backendURL}/api${this.csvRoutes}`, {
  			method: 'POST',
  			mode: 'cors',
  			body: fileData,
  		});
  		if (response.status === 200) {
  			return true;
  		}
  		return false;
  	} catch (err) {
  		console.error(err);
  		return null;
  	}
  }
}
