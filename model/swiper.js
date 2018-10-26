const mongoose = require('mongoose');

const swiper = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    newsId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'news',
        required: true
    },
    status: {
        type: Number,
        default: 1
    },
    sort: {
        type: Number,
        default: 1
    } // 控制是否显示
},{versionKey: false, timestamps: {
   createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('swiper', swiper)