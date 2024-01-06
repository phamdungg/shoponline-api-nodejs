const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sanphamSchema = new Schema({
    tensanpham: {
      type: String,
      require: true,
      unique: true
    },
    dongia: {
      type: Number,
      require: true
    },
    mota: {
      type: String,
      require: true
    },
    soluong: {
      type: Number,
      require: true
    },
    anhdaidien: {
      type: String,
      require: true
    },
    danhmucid: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'danhmuc' 
    },
},{
    collection: 'sanpham',
    versionKey: false
})

const sanphamModel = mongoose.model('sanpham', sanphamSchema)
module.exports = sanphamModel