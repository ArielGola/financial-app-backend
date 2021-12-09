const router = require('express').Router();

const { 
    verifyToken
} = require('../middlewares/veryfyJWT');

const {
    getExpenses,
    createExpenses,
    updateExpenses,
    deleteExpenses
} = require('../controllers/expenses.controllers');


router.route('/')
    .get(verifyToken, getExpenses)
    .post(verifyToken, createExpenses);

router.route('/:id')
    .put(verifyToken, updateExpenses)
    .delete(verifyToken, deleteExpenses);


module.exports = router;