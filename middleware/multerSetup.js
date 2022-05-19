const multer = require('multer')

const storage = multer.diskStorage({
    // setting file upload destination to public/images from project root dir
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    // setting up custom file names to not overwrite existing files with exact same names
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const filename = file.originalname.replace('public', '')
        cb(null, uniqueSuffix + '-' + filename)
    }
})
// check if file is of type png, jpg, or jpeg
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg')
        cb(null, true)
    else
        cb(null, false)
}

module.exports = [
    multer({storage: storage, fileFilter: fileFilter}).single('image')
]
