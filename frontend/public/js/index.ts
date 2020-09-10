import ListItem from './interfaces/list-item';

import Store from './model/list-store';
import ButtonHandler from './handler/button-handler';
import FormHandler from './handler/form-handler';
import DialogHandler from './handler/dialog-handler';
import EventHandler from './event-handler';
import TableRenderer from './table-renderer';
import FetchController from './fetch-controller';
import ErrorController from './error-controller';

window.addEventListener('DOMContentLoaded', async () => {
  const fetchController = new FetchController();
  const store = new Store();
  const formHandler = new FormHandler();
  const buttonHandler = new ButtonHandler();
  const dialogHandler = new DialogHandler();
  const errorController = new ErrorController();
  const eventHandler = new EventHandler(
    buttonHandler,
    dialogHandler,
    formHandler,
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
    console.log(store.getSelectedListItems());
    TableRenderer(store.getSelectedListItems());
  } else {
    errorController.setErrorMessage(
      'An error happened on loading the site. Please refresh the site.',
    );
  }
});
