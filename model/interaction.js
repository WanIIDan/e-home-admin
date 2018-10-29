const mongoose = require('mongoose');

const interaction = new mongoose.Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'admin_user'
    },
    content: {
        type: String,
        required: true
    },
    common: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'common'
        }
    ]
},{versionKey: false, timestamps: {
   createdAt: 'create_time', updatedAt: 'update_time'}})

module.exports = mongoose.model('interaction', interaction)