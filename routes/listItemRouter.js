const express = require('express')
const listItemController = require('../controllers/listItemController.js')

const router = express.Router()

router
    .route('/')
    .get(listItemController.getListItems)
    .post(listItemController.addListItem)

router
    .route('/:id')
    .get(listItemController.getListItem)
    .patch(listItemController.updateListItem)
    .delete(listItemController.deleteListItem)

module.exports = router;