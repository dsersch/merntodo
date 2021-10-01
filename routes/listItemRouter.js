const express = require('express')
const listItemController = require('../controllers/listItemController.js')
const authController = require('../controllers/authController.js')

const router = express.Router()

router
    .route('/')
    .get(authController.protect, listItemController.getListItems)
    .post(authController.protect, listItemController.addListItem)

router
    .route('/:id')
    .get(authController.protect, listItemController.getListItem)
    .patch(authController.protect, listItemController.updateListItem)
    .delete(authController.protect, listItemController.deleteListItem)

router
    .route('/user/:id')
    .get(authController.protect, listItemController.getUserItems)

module.exports = router;