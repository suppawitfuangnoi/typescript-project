import { Sequelize } from 'sequelize';

// export const sequelize = new Sequelize('sqlite::memory:');

export const sequelize = new Sequelize('nodetest', 'Lms_Md', 'Adm1nLmsMd2022!', {
    host: '203.150.199.24',
    dialect: 'mysql'
});
