import * as Router from '@koa/router';
import * as Controller from './list-controller';

const router = new Router();

router.get('/', Controller.exportList).post('/', Controller.importList);

export default router;
