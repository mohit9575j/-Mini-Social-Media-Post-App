// import {Sequelize} from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   dialect: 'mysql',
//   host: process.env.DB_HOST,
// })

// export default sequelize;



import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

// Make sure this is at the top, before accessing any env variables
dotenv.config();

// Then use the environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
  }
);

export default sequelize;