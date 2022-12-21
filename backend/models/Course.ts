// const mongoose = require("mongoose");
// var slug = require("mongoose-slug-generator");
// var mongooseDelete = require('mongoose-delete');


// const Schema = mongoose.Schema;

// const Course = new Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, maxLength: 600 },
//     image: { type: String, maxLength: 255 },
//     slug: { type: String, slug: 'name', unique: true },
//     level: { type: String, maxLength: 255 },
//     videoID: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// //Add plugins
// mongoose.plugin(slug);
// Course.plugin(mongooseDelete, {overrideMethods: 'all', deletedAt: true});
// //Đối số thứ nhất là thư viện, đối số 2 là cái mà mình sẽ áp dụng override lại để khi xóa mềm ko laod ra những file có deleted: true

// module.exports = mongoose.model("Course", Course);
