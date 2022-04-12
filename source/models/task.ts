import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from '../config/sequelize';
export class Task extends Model<InferAttributes<Task>, InferCreationAttributes<Task>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare thumbnail: string;
    declare startDate: Date;
    declare endDate: Date;
    declare labels: string[];
    declare member: string[];
    declare createBy: string;
    declare createDate: CreationOptional<Date>;
    declare updateBy: string;
    declare updateDate: CreationOptional<Date>;
    declare list_id: number;
    declare sortOrder: number;
    declare pin: number;
}

import { List } from '../models/list';

Task.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        thumbnail: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        startDate: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        endDate: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        labels: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        member: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        createBy: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createDate: DataTypes.DATE,
        updateBy: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        updateDate: DataTypes.DATE,
        list_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'list',
                key: 'id'
            }
        },
        sortOrder: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        pin: {
            type: DataTypes.INTEGER.UNSIGNED,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'task'
    }
);

List.hasMany(Task);
