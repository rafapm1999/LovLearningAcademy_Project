//
const multer = require("multer");
const fs = require("node:fs")
//

const uploadFile = () => {
    const upload = multer({dest:'upload/'});
    app.post('/courses/create-course', upload.single('file'),(req, res, next) => {
        console.log(req.file);
        saveImage(req.file)
        res.send("Termina");
      });
      function saveImage(file) {
      const newPath = `./upload/${file.originalname}`
      fs.renameSync(file.path, newPath)
      return newPath;
      }
}

module.exports = uploadFile;