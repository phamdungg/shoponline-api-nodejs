const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator');
const controller = require('../controllers/account.controller.js');

// Tao tai khoan
router.post('/register',
    [check('username').notEmpty().withMessage('ten khong duoc de trong'),
    check('password').notEmpty().withMessage('mat khau khong duoc de trong')],
    controller.register);

// get All
router.get('/', controller.getAll);
// getOne
router.get('/:id', controller.getById);
// dang nhap
router.post('/login', controller.login);
// update
router.put('/:id', controller.update);
// delete
router.delete('/:id', controller.delete);
// changePassword
router.put('/change-password/:id', controller.changePassword);

module.exports = router;