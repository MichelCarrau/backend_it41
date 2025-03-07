import { Sequelize } from "sequelize"; // Importa la clase Sequelize desde el paquete 'sequelize'

// Configuración de la conexión a la base de datos
export const DatabaseConfig = new Sequelize({
  host: "localhost", // El host suele ser 'localhost' si MySQL está en la misma máquina
  database: "it41", // El nombre de la base de datos que estás usando
  username: "root", // El usuario por defecto es 'root'
  password: "", // Aquí debes poner la nueva contraseña si la cambiaste
  dialect: "mysql", // Especifica que el dialecto de la base de datos es MySQL
  timezone: "-05:00", // Define la zona horaria
  port: 3306, // El puerto por defecto es 3306 (si no lo cambiaste)
  logging: false, // Deshabilita el logging de las consultas SQL
  pool: { // Configuración del pool de conexiones
    max: 5, // Número máximo de conexiones en el pool
    min: 5, // Número mínimo de conexiones en el pool
    acquire: 60000, // Tiempo máximo en milisegundos para adquirir una conexión
    idle: 15000, // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada
  },
});

// Clase maneja la conexión a la base de datos
export class Database {
  // Método establecer la conexión
  async connection() {
    try {
      // Intenta autenticar la conexión con la base de datos
      await DatabaseConfig.authenticate();
      console.log("Connection has been established successfully"); 
      return { ok: true, message: "Connection to the database established correctly" }; // Retorna 1 objeto indicando éxito
    } catch (error) {
      // Si ocurre un error:
      console.error("Unable to connect to the database: ", error); 
      return { ok: false, message: `Could not connect to database. Please check the following: ${error} ` }; // Retorna un objeto
    }
  }
}