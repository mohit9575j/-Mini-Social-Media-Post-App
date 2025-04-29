import {DataTypes} from 'sequelize';
import sequelize from '../config/db.js';
import Post from './post.js';

const comment = sequelize.define('comment', {
    commentText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

Post.hasMany(comment, {foreignKey: 'postId',});
comment.belongsTo(Post, {foreignKey: 'postId',});

export default comment;

