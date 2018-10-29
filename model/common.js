const mongoose = require('mongoose');

const common = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'admin_user'
    },
    interaction: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'interaction'
    }
},{versionKey: false, timestamps: {
   createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('common', common)