const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dangnhap', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const Schema = mongoose.Schema;
const sanphamSchema = new Schema({
    tensanpham: String,
    dongia: Number,
    mota: String,
    soluong: Number,
    anhdaidien: String,
    danhmucid: { type: mongoose.Schema.Types.ObjectId, ref: 'danhmuc' }
},{
    collection: 'sanpham'
})

const sanphamModel = mongoose.model('sanpham', sanphamSchema)
module.exports = sanphamModel