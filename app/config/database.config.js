import { Sequelize } from "sequelize";

export const DatabaseConfig = new Sequelize ({
    host: 'localhost',
    database: 'it41',
    username: 'root',
    password: '',
    dialect: 'mysql',
    timezone: '-05:00',
    port: 3306, // Actualizado a 3306
    logging: false, // Cambia a true para ver las instrucciones SQL
    pool: {
        max: 5,
        min: 5,
        acquire: 60000,
        idle: 15000
    }
});

export class Database {
    /**
     * Start the database connection
     * @returns {Promise<{ok: boolean, message: string}>}
     */
    async connection(){
        try {
            await DatabaseConfig.authenticate();
            console.log('Connection has been established successfully.');
            return { ok: true, message: 'Connection to the database established correctly' };
        } catch (e) {
            console.error('Unable to connect to the database', e);
            return { ok: false, message: 'Could not connect to the database. Please check the following: ' + e };
        }
    }
}
