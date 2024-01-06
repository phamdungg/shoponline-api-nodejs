//import module mongoose
const mongoose = require('mongoose');
//khai báo biến MONGO_URI
const MONGO_URI ='mongodb://localhost/dangnhap'; 

//khai báo hàm db_connect để kết nối với MongoDB
const db_connect = () => mongoose.connect(MONGO_URI, {}).catch(err =>{
    setTimeout(db_connect, 5000)
});

//Exports module db_connect để sử dụng ở file khác
module.exports = {db_connect}

