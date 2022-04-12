import express from 'express';
import controller from '../controllers/task';

const router = express.Router();

router.get('/', controller.GetTask);
router.post('/create', controller.CreateTask);
router.post('/update', controller.UpdateTask);
router.post('/delete', controller.DeleteTask);
router.post('/order', controller.OrderTask);
router.post('/pin', controller.PinTask);

export = router;
