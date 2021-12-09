const router = require('express').Router();

const { 
    verifyToken, 
    verifyRoleAdmin, 
    verifyRoleMod 
} = require('../middlewares/veryfyJWT');

const {
    getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllsUsers,
    changeRole
} = require('../controllers/user.controllers');


router.route('/')
    .get([verifyToken, verifyRoleAdmin], getAllsUsers)
    .post(createUser);

router.route('/log')
    .post(loginUser);

router.route('/:id')
    .get(verifyToken, getUser)
    .put(verifyToken, updateUser)
    .delete([verifyToken, verifyRoleAdmin], deleteUser);

router.route('/role/:id')
    .put([verifyToken, verifyRoleAdmin], changeRole);


module.exports = router;