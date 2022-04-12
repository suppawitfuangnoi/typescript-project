import express from 'express';
import controller from '../controllers/list';

const router = express.Router();

router.get('/', controller.GetList);
router.post('/create', controller.CreateList);
router.post('/update', controller.UpdateList);
router.post('/delete', controller.DeleteList);

export = router;
