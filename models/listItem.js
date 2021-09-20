const mongoose = require('mongoose');

const listItemSchema = new mongoose.Schema({
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // start: {
    //     type: Date,
    //     required: true,
    // },
    // end: {
    //     type: Date,
    //     required: true,
    // }
})

const ListItem = mongoose.model("ListItem", listItemSchema);

module.exports = ListItem;