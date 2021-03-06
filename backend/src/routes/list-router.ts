import { Router } from 'express';
import * as Controller from '../controller/list-controller';

const router = Router();

router.route('/').get(Controller.exportList).post(Controller.importList);

export default router;
