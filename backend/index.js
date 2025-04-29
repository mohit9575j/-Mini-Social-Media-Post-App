// import express  from 'express';
// import dotenv  from 'dotenv';
// import sequelize from './config/db.js'
// import postRouter from '../routes/postRoutes.js'
// import commentRouter from '../routes/commentRoutes.js'




import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();


// console.log('Environment variables:');
// console.log('DB_NAME:', process.env.DB_NAME);
// console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
// console.log('DB_HOST:', process.env.DB_HOST);
import sequelize from './config/db.js'
 import postRouter from './routes/postRoutes.js'
import commentRouter from './routes/commentRoutes.js'


//dotenv.config();
const app = express();


app.use(express.json());
 
//app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors());

app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

const PORT = process.env.PORT || 3000;

const serverstart = async() => {
    try{
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });

       await sequelize.authenticate();
       console.log("Database connected successfully");
       await sequelize.sync({alert:true});
      }
      catch(error){
        console.error("Unable to connect to the database" , error);
     }
}

serverstart();