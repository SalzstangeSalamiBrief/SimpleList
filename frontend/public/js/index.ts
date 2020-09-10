import ListItem from './interfaces/list-item';

import Store from './model/list-store';
import ButtonController from './controller/button-controller';
import InputFieldController from './controller/input-field-controller';
import DialogController from './controller/dialog-controller';
import ClickEventController from './controller/click-event-controller';
import TableRenderer from './table-renderer';
import FetchController from './controller/fetch-controller';
import ErrorController from './controller/error-controller';

window.addEventListener('DOMContentLoaded', async () => {
  const fetchController = new FetchController();
  const store = new Store();
  const inputFieldController = new InputFieldController();
  const buttonController = new ButtonController();
  const dialogController = new DialogController();
  const errorController = new ErrorController();
  const clickEventController = new ClickEventController(
    buttonController,
    dialogController,
    inputFieldController,
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
