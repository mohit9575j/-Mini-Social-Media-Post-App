import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const post = sequelize.define("Post",{
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

});

export default post;