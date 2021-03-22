import multer from 'multer';
import path from 'path';
import express from 'express';

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb('null', 'uploads/')
    },
    fileName(req, file, cb){
        // formating the file name
        cb('null',`${file.fieldName}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimeType)

    if(extname && mimeType){
        return cb('null', true)
    }
    else{
        cb("Images only")
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`${req.file.path}`)
})

export default router