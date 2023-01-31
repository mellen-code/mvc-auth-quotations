const express = require('express')
const router = express.Router()
const quotesController = require('../controllers/quotations') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, quotesController.getQuotes)

router.post('/createQuote', quotesController.createQuote)

// router.put('/markComplete', todosController.markComplete)

// router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteQuote', quotesController.removeQuote)

module.exports = router