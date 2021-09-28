const ListItem = require('../models/listItem.js');
const mongoose = require('mongoose');

exports.getListItems = async (req, res) => {
    try {
        const allListItems = await ListItem.find();

        res.status(200).json({
            status: 'success',
            data: allListItems,
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err,
        })
    }
}

exports.getUserItems = async (req, res) => {
    try {
        const userItems = await ListItem.find({ user: req.params.id });

        res.status(200).json({
            status: 'success',
            data: userItems,
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err
        })
    }
}

exports.addListItem = async (req, res) => {
    try {
        const newListItem = await ListItem.create(req.body);

        res.status(201).json({
            status: 'success',
            data: newListItem,
        })

    } catch (err) {
        res.status(404).json({
            status: 'failed to create list item...',
            message: err,
        })
    }
}

exports.getListItem = async (req, res) => {
    try {
        const listItem = await ListItem.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: listItem,
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed to find item...',
            message: err,
        })
    }
}

exports.updateListItem = async (req, res) => {
    try {
        const updatedListItem = await ListItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })

        res.status(200).json({
            status: 'success',
            data: updatedListItem,
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed to find item to update...',
            message: err,
        })
    }
}

exports.deleteListItem = async (req, res) => {
    try {
        await ListItem.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: 'success',
            data: null,
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed to find item to delete...',
            message: err,
        })
    }
}