const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const danhmucSchema = new Schema({
  tendanhmuc: {
    type: String,
    require: true,
    unique:true
  },
  mota: {
    type: String,
    require: true
  }
},{
    collection: 'danhmuc',
    versionKey: false // tat su dung truong __v
});


const danhmucModel = mongoose.model('danhmuc', danhmucSchema)
module.exports = danhmucModel