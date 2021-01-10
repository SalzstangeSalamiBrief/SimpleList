import { Router } from 'express';
import * as Controller from '../controller/list-item-controller';

const router = Router();

router.route('/')
	.get(Controller.getAll)
	.post(Controller.createNewListItem)
	.put(Controller.updateSelectedListItem)
	.delete(Controller.deleteSelectedListItem);

router.route('/:_id').get(Controller.getListItem);

export default router;
