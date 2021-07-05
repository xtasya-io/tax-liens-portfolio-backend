const sequelize = require("sequelize");
const config = require('../../src/config/config');

const sequelize = new Sequelize(
    'testDB',
    config.mysql.username,
    config.mysql.password,
    {
        host: config.mysql.host,
        dialect: "mysql"
    }
);

const setupTestDB = () => {

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {

    });

    afterAll(async () => {
        await sequelize.close();
    });

};

module.exports = setupTestDB;