const express = require('express');
const sanphamRouter = express.Router();
const sanphamModel = require('../Models/sanpham');

//tao san pham
sanphamRouter.post('/taosanpham', (req, res, next) =>{
    var tensanpham = req.body.tensanpham
    var dongia = req.body.dongia
    var mota = req.body.mota
    var soluong = req.body.soluong
    var anhdaidien = req.body.anhdaidien
    var danhmucid = req.body.danhmucid

    if (!tensanpham || !dongia || !mota || !soluong || !anhdaidien || !danhmucid) {
        return res.status(500).json('chua nhap day du du lieu');
    }

    sanphamModel.create({
        tensanpham: tensanpham,
        dongia: dongia,
        mota: mota,
        soluong: soluong,
        anhdaidien: anhdaidien,
        danhmucid: danhmucid
    })
    .then(data =>{
        res.json('tao san pham thanh cong')
    })
    .catch(err =>{
        res.status(500).json('loi server')
    })
})

//lay san pham
sanphamRouter.get('/laysanpham', (req, res, next) =>{
    var tensanpham = req.body.tensanpham
    var dongia = req.body.dongia
    var mota = req.body.mota
    var soluong = req.body.soluong
    var anhdaidien = req.body.anhdaidien
    var danhmucid = req.body.danhmucid

    sanphamModel.find({

    })
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.status(500).json('loi server')
    })
})

//lay san pham theo id
sanphamRouter.get('/:id', (req, res, next) =>{
    var id = req.params.id

    sanphamModel.findById(id)
    
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        res.status(500).json('loi server')
    })
})

//sua san pham
sanphamRouter.put('/:id', (req, res, next) =>{
    var id = req.params.id
    var newtensanpham = req.body.newtensanpham
    var newdongia = req.body.newdongia
    var newmota = req.body.newmota
    var newsoluong = req.body.newsoluong
    var newanhdaidien = req.body.newanhdaidien
    var newdanhmucid = req.body.newdanhmucid
    sanphamModel.findByIdAndUpdate(id, {
        tensanpham: newtensanpham,
        dongia: newdongia,
        mota: newmota,
        soluong: newsoluong,
        anhdaidien: newanhdaidien,
        danhmucid: newdanhmucid
    })
    
    .then(data =>{
        res.json('sua san pham thanh cong')
    })
    .catch(err =>{
        res.status(500).json('loi server')
    })
})

//xoa san pham 
sanphamRouter.delete('/:id', (req, res, next) =>{
    var id = req.params.id

    sanphamModel.deleteOne({
        id: id
    })
    .then(data =>{
        res.json('xoa san pham thanh cong')
    })
    .catch(err =>{
        res.status(500).json('loi server')
    })
})









module.exports = sanphamRouter