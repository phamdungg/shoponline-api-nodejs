const express = require('express');
const danhmucRouter = express.Router();
const danhmucModel = require('../Models/danhmuc');

//tao danh muc
danhmucRouter.post('/taodanhmuc', (req, res, next)=>{
    var tendanhmuc = req.body.tendanhmuc
    var mota = req.body.mota

    if (!tendanhmuc || !mota) {
        return res.status(500).json('chua nhap ten hoac mo ta');
    }

    danhmucModel.create({
        tendanhmuc: tendanhmuc,
        mota: mota
    })
    .then(date=>{
        res.json('tao danh muc thanh cong')
    })
    .catch(err=>{
        res.json('tao danh muc that bai')
    })
})

//lay danh muc
danhmucRouter.get('/laydanhmuc', (req, res, next) =>{
    var tendanhmuc = req.body.tendanhmuc
    var mota = req.body.mota

    danhmucModel.find({
        
    })
    .then(data=>{
        res.json(data)
     })
     .catch(err=>{
        res.status(500).json('Loi server')
     })
})

//lay danh muc theo id
danhmucRouter.get('/:id', (req, res, next) =>{
    var id = req.params.id

    danhmucModel.findById(id)
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.status(500).json('loi server')
    })
})

//sua danh muc
danhmucRouter.put('/:id', (req, res, next) =>{
    var id = req.params.id
    var newtendanhmuc = req.body.newtendanhmuc
    var newmota = req.body.newmota

    danhmucModel.findByIdAndUpdate(id, {
        tendanhmuc: newtendanhmuc,
        mota: newmota
    })
    .then(data =>{
        res.json('sua thanh cong')
    })
    .catch(err =>{
        res.status(500).json('loi server')
    })

})

//xoa danh muc
danhmucRouter.delete('/:id', (req, res, next) =>{
    var id = req.params.id

    danhmucModel.deleteOne({
        _id: id
    })
    .then(data =>{
        res.json('xoa thanh cong')
    })
    .catch(err =>{
        res.status(500).json('loi server')
    })
})


module.exports = danhmucRouter
