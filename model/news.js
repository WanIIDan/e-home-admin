const mongoose = require('mongoose');

const news = new mongoose.Schema({
    title: String,
    content: String,
    contentText: String,
    img: String,
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'admin_user'      
    },
    type: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category' // 与分类表相关联
    },
    lookNum: {
        type: Number,
        default: 0
    }

},{versionKey: false, timestamps: {
   createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('news', news)