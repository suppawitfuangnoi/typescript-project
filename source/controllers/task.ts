import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { Task } from '../models/task';
import { List } from '../models/list';

const NAMESPACE = 'Task';

const GetTask = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Getting all Task.');
    try {
        const task = await Task.findAll({
            order: [
                ['pin', 'DESC'],
                ['sortOrder', 'ASC']
            ]
        });
        res.status(200).json({
            status: 200,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

const CreateTask = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Insert Task.');

    let { title, description, thumbnail, startDate, endDate, labels, member, createBy, list_id } = req.body;

    if (!title) {
        return res.status(500).json({
            message: 'title required'
        });
    }
    if (!description) {
        return res.status(500).json({
            message: 'description required'
        });
    }
    if (!thumbnail) {
        return res.status(500).json({
            message: 'thumbnail required'
        });
    }
    if (!startDate) {
        return res.status(500).json({
            message: 'startDate required'
        });
    }
    if (!endDate) {
        return res.status(500).json({
            message: 'endDate required'
        });
    }
    if (!labels) {
        return res.status(500).json({
            message: 'labels required'
        });
    }
    if (!member) {
        return res.status(500).json({
            message: 'member required'
        });
    }
    if (!createBy) {
        return res.status(500).json({
            message: 'createBy required'
        });
    }
    if (!list_id) {
        return res.status(500).json({
            message: 'list_id required'
        });
    }

    try {
        let list = await List.findByPk(list_id);
        if (list) {
            const task = await Task.create(req.body);

            const taskID = await Task.findByPk(task.id);
            if (taskID) {
                taskID.sortOrder = task.id;
                await taskID.save();
            }
            res.status(200).json({
                status: 200,
                data: task
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'Not Found list_id'
            });
        }
    } catch (error) {
        next(error);
    }
};

const UpdateTask = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Update Task.');

    let { id, title, description, thumbnail, startDate, endDate, labels, member, updateBy, updateDate, list_id } = req.body;

    if (!id) {
        return res.status(500).json({
            message: 'id required'
        });
    }
    if (!title) {
        return res.status(500).json({
            message: 'title required'
        });
    }
    if (!description) {
        return res.status(500).json({
            message: 'description required'
        });
    }
    if (!thumbnail) {
        return res.status(500).json({
            message: 'thumbnail required'
        });
    }
    if (!startDate) {
        return res.status(500).json({
            message: 'startDate required'
        });
    }
    if (!endDate) {
        return res.status(500).json({
            message: 'endDate required'
        });
    }
    if (!labels) {
        return res.status(500).json({
            message: 'labels required'
        });
    }
    if (!member) {
        return res.status(500).json({
            message: 'member required'
        });
    }
    if (!updateBy) {
        return res.status(500).json({
            message: 'updateBy required'
        });
    }
    if (!list_id) {
        return res.status(500).json({
            message: 'list_id required'
        });
    }

    try {
        const task = await Task.findByPk(id);
        if (task) {
            task.title = title;
            task.description = description;
            task.thumbnail = thumbnail;
            task.startDate = startDate;
            task.endDate = endDate;
            task.labels = labels;
            task.member = member;
            task.updateBy = updateBy;
            await task.save();
        } else {
            res.status(404).json({
                status: 404,
                message: 'Not Found'
            });
        }

        res.status(200).json({
            status: 200,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

const DeleteTask = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Delete Task.');

    let { id } = req.body;

    if (!id) {
        return res.status(500).json({
            message: 'id required'
        });
    }

    try {
        const task = await Task.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            status: 200,
            data: task
        });
    } catch (error) {
        next(error);
    }
};

const OrderTask = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'order Task.');

    let { ID_ARRAY } = req.body;

    if (!ID_ARRAY) {
        return res.status(500).json({
            message: 'ID_ARRAY[] required'
        });
    }
    try {
        ID_ARRAY.forEach(async (element: any, index: number) => {
            const task = await Task.findByPk(element);
            if (task) {
                task.sortOrder = index + 1;
                await task.save();
            }
        });
        res.status(200).json({
            status: 200
        });
    } catch (error) {
        next(error);
    }
};

const PinTask = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Pin Task.');

    let { id } = req.body;

    if (!id) {
        return res.status(500).json({
            message: 'id required'
        });
    }

    try {
        const task = await Task.findByPk(id);
        if (task) {
            if (task.pin == 0) {
                task.pin = 1;
            } else {
                task.pin = 0;
            }
            await task.save();
            res.status(200).json({
                status: 200
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'Not Found'
            });
        }
    } catch (error) {
        next(error);
    }
};

export default { GetTask, CreateTask, UpdateTask, DeleteTask, OrderTask, PinTask };
