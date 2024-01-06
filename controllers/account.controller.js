const AccountModel = require('../Models/account.controller');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.register = (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }

    var Username = req.body.username;
    var Password = req.body.password;
    let encryptedPassword = '';

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(Password, salt, (err, hash) => {
            encryptedPassword = hash;
            AccountModel.findOne({
                username: Username,
            })
                .then((data) => {
                    if (data) {
                        res.json('tai khoan nay da ton tai')
                    }
                    else {
                        return AccountModel.create({
                            username: Username,
                            password: encryptedPassword,
                        })
                    }
                })
                .then(data => {
                    if (data) {
                        res.json('tao tai khoan thanh cong')
                    }
                })
                .catch((err) => {
                    res.status(500).json('tao tai khoan that bai')
                });
        });
    });
}

exports.login = async(req, res, next) => {
    //lay thong tin tu request
    var Username = req.body.username
    var Password = req.body.password
    //tim tai khoan trong co so du lieu
    try {
        var account = await AccountModel.findOne({
            username: Username,
        })
        //kiem tra tai khoan
        if(!account) {
            return res.status(500).json('tai khoan khong chinh xac');
        }
        //so sanh mat khau
        const checkPassword = bcrypt.compareSync(Password, account.password);
        if(!checkPassword) {
            return res.status(500).json('mat khau khong chinh xac');
        }
        else {
            return res.status(500).json('dang nhap thanh cong');
        }
    } catch (err) {
        res.status(500).json('loi server');
    }
}

//lay all du lieu
exports.getAll = (req, res, next) => {
    AccountModel.find({})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status('loi server')
    })
}

//lay du lieu theo id
exports.getById = (req, res, next) => {
    var _id = req.params.id
    AccountModel.findById({_id})
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json('loi server')
    })
}

//su du lieu
exports.update = (req, res, next) => {
    var _id = req.params.id
    var NewPassword = req.body.newPassword
    AccountModel.findByIdAndUpdate(_id, {
        password: NewPassword
    })
        .then(data => {
            res.json('sua du lieu thanh cong')
        })
        .catch(err => {
            res.status(500).json('Loi server')
        })
}

exports.delete = (req, res, next) => {
    var id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
    .then(data => {
        res.json('xoa thanh cong')
    })
    .catch(err => {
        res.status(500).json('loi server')
    })
}

exports.changePassword = (req, res, next) => {
    var _id = req.params.id
    var NewPassword = req.body.newPassword
    AccountModel.findByIdAndUpdate(_id, {
        password: NewPassword
    })
    .then(data => {
        res.json('sua lu lieu thanh cong')
    })
    .catch(err => {
        res.status(500).json('loi server')
    })

}

exports.create = (req, res, next) => {
    var Username = req.body.username
    var Password = req.body.password

    AccountModel.create({
        username: Username,
        password: Password
    })
    .then(data => {
        res.json('them tai khoan thanh cong')
    })
    .catch(err => {
        res.status(500).json('loi server')
    })
}

