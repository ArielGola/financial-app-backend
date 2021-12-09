const router = require('express').Router();

const { 
    verifyToken
} = require('../middlewares/veryfyJWT');

const {
    getGoals,
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal
} = require('../controllers/goal.controllers');


router.route('/')
    .get(verifyToken, getGoals)
    .post(verifyToken, createGoal);

router.route('/:id')
    .get(verifyToken, getGoal)
    .put(verifyToken, updateGoal)
    .delete(verifyToken, deleteGoal);


module.exports = router;