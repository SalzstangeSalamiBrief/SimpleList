import ListItem from './interfaces/list-item';

import Store from './model/list-store';
import TableRenderer from './table-renderer';
import FetchController from './controller/fetch-controller';
import ErrorController from './controller/error-controller';
import EventController from './controller/event-controller/event-controller';
window.addEventListener('DOMContentLoaded', async () => {
  const fetchController = new FetchController();
  const store = new Store();

  const errorController = new ErrorController();

  const eventController = new EventController(
    TableRenderer,
    store,
    errorController,
    fetchController,
  );
  const initListEntries = <Array<ListItem>>(
    await fetchController.getAllEntriesFromServer()
  );
  if (initListEntries !== null) {
    for (let i = 0; i < initListEntries.length; i += 1) {
      store.addItem(initListEntries[i]);
    }
    // console.log(store.getSelectedListItems());
    TableRenderer(store.getSelectedListItems());
  } else {
    errorController.setErrorMessage(
      'An error happened on loading the site. Please refresh the site.',
    );
  }
});
