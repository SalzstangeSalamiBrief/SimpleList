import ListItem from './interfaces/list-item';

import Store from './model/list-store';
import TableRenderer from './view/table-renderer';
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

	// init content of the table
	store.initOnSideLoad(fetchController, errorController, TableRenderer);
});
