import express, { json } from 'express';
var router = express.Router();
//for upload package
let multer = require('multer');
let upload = multer();

let images = require('images');
let uuidv1 = require('uuid/v1');
var config = require("./config");

// set differnt upload image path route api
router.post("/admin/upload/category",upload.single('file'),(req,res) => {
    Uploader(req,res,'category');
});

router.post("/admin/upload/images",upload.single('file'),(req,res) => {
    Uploader(req,res,'stray');
});


router.post("/admin/upload/editor",upload.single('file'),(req,res) => {
    Uploader(req,res,'detail');
});

// upload images files
let Uploader = (req,res,path) => {
    var originalName = req.file.originalname;
    var format = originalName.split(".");

    //get format
    var extName = "." + format[format.length - 1];
    var filename = uuidv1();

    var fileFolder = "/images/" + path + "/";
    
    images(req.file.buffer).save("public" + fileFolder + filename + extName,{
        quality:100
    });

    res.json({
        code:0,
        message:"image upload success~",
        url:config.IMAGE_URL + fileFolder + filename + extName
    });

}

module.exports = router;
