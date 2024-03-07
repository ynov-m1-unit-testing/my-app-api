const dotenv = require('dotenv');

// On récupère l'environement dans lequel on se trouve (développement, production, test)
const environment = process.env.NODE_ENV || 'development';

let envFile;

// On détermine le fichier .env à utiliser en fonction de l'environement
switch (environment) {
  case 'development':
    envFile = '.env';
    break;
  case 'production':
    envFile = '.env';
    break;
  case 'test':
    envFile = '.env.test';
    break;
  default:
    envFile = '.env';
    break;
}

// On charge les variables d'environement du fichier .env
dotenv.config({ path: envFile });

// destructuration des variables d'environement dans le fichier .env
const { DB_USER, DB_PWD, DB_NAME, DB_HOST, DB_PORT } = process.env;

// Si pas de variables d'environement, on lève une erreur
if (!DB_USER || !DB_PWD || !DB_NAME || !DB_HOST || !DB_PORT) {
  throw new Error('Please provide env variables.');
}

// Configuration de sequelize pour se connecter à la base de données
const commonConfig = {
  username: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql"
}

// Export de la configuration
module.exports = {
  development: commonConfig,
  test: commonConfig,
  production: commonConfig
}
