const mongoose = require('mongoose');

const swiper = new mongoose.Schema({
    title: String,
    img: String,
    newsId: String,
    status: String,
    sort: String,
    isShow: false
},{versionKey: false, timestamps: {
   createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('swiper', swiper)