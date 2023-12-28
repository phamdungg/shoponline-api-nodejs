const express = require('express');
var router = express.Router();
const AccountModel = require('../Models/account');
const bcrypt = require('bcrypt');




//lay du lieu tu database
router.get('/', (req, res, next)=>{
     AccountModel.find({

     })
     .then(data=>{
        res.json(data)
     })
     .catch(err=>{
        res.status(500).json('Loi server')
     })
})

router.get('/:id', (req, res, next)=>{
    var id = req.params.id
    AccountModel.findById(id)
    .then(data=>{
       res.json(data)
    })
    .catch(err=>{
       res.status(500).json('Loi server')
    })
})

//them moi vao DB
router.post('/regiter', async (req, res, next)=>{
    var username = req.body.username
    var password = req.body.password

    // Kiểm tra xem username và password có tồn tại và không rỗng không
    if (!username || !password) {
        return res.status(500).json('chua nhap tai khoan mat khau.');
    }
    // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = await bcrypt.hash(password, 10);
    //thêm thông tin người dùng và cơ sở dữ liệu
    AccountModel.create({
        username: username,
        password: hashedPassword
    })
    .then(date=>{
        res.json('tao tai khoan thanh cong')
    })
    .catch(err=>{
        res.json('tao tai khoan that bai')
    })
})

router.post('/login', async (req, res, next)=>{
    var Username = req.body.username
    var Password = req.body.password

    AccountModel.findOne({
         username: Username
     })
     try {
        var data =await AccountModel.findOne({
            username: Username,
        })
        if (!data) {
                return res.status(501).json('Tai khoan sai');
            }
        const checkPassword = bcrypt.compareSync(Password, data.password);
        if (!checkPassword) {
            return res.status(501).json('Mat khau sai');
        }
        else return res.status(200).json('Dang nhap thanh cong');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//update du lieu trong DB
router.put('/:id', (req, res, next)=>{
    var id = req.params.id
    var newpassword = req.body.newpassword


    AccountModel.findByIdAndUpdate(id, {
        password: newpassword
    })
    .then(data=>{
        res.json('update thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Loi server')
    })

})

//xoa du lieu trong DB
router.delete('/:id', (req, res, next)=>{
    var id = req.params.id
    AccountModel.deleteOne({
        _id: id
    })
    .then(data=>{
        res.json('xoa thanh cong')
    })
    .catch(err=>{
        res.status(500).json('Loi server')
    })
})





module.exports = router