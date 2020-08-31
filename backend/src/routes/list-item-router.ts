import * as Router from '@koa/router';
import * as Controller from './list-item-controller';

const router = new Router();

router
	.get('/', Controller.getAll)
	.get('/:name', Controller.getListItem)
	.post('/', Controller.createNewListItem)
	.put('/', Controller.updateSelectedListItem)
	.del('/', Controller.deleteSelectedListItem);

export default router;
