const express = require('express')
const listItemController = require('../controllers/listItemController.js')
const authController = require('../controllers/authController.js')

const router = express.Router()

router
    .route('/')
    .get(authController.protect, listItemController.getListItems)
    .post(listItemController.addListItem)

router
    .route('/:id')
    .get(listItemController.getListItem)
    .patch(listItemController.updateListItem)
    .delete(listItemController.deleteListItem)

module.exports = router;