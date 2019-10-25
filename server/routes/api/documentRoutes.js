/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const DocumentController = require('../../controller/documentController');
const documentController = new DocumentController();

/* Load Multer (uploading files) */
let multer = require('multer');
let fs = require('fs-extra');

/* Load webp converter */
//var webp = require('webp-converter');
/*
var storage = multer.diskStorage({
    destination: './aptImages/',
    //(req, file, cb) => {
    //   const dir = 

    //fs.mkdir(dir, err => cb(err, dir))
    //  },
    filename: function (req, file, callback) {
        callback(null, file.fieldname)
    }
});
var upload = multer({ storage });


 Load Check Auth */
// const checkAuth = require('../../midware/check-auth');


/**
 * User's routes 
 */

router.get('/', function (req, res) {
    documentController.findQuery(req, res);
});

router.get('/:id', function (req, res) {
    documentController.findById(req, res)
});

router.get('/apt/:id', function (req, res) {
    documentController.findByAptId(req, res)
});
router.get('/category/apt/:id', function (req, res) {
    documentController.findDocumentsByAptIdAndCategory(req, res);
});
router.get('/categories/:id', function (req, res) {
    documentController.findDocumentsCategoriesByAptId(req, res);
});



/**
 * Admin's routes
 */

/*

router.get('/count', function (req, res) {
   documentController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
   documentController.exists(req, res);
});

router.get('/:id', function (req, res) {
   documentController.findById(req, res);
});



router.put('/:id', function (req, res) {
   documentController.update(req, res);
});

router.post('/create', checkAuth, upload.any(), function (req, res) {
   documentController.create(req, res)
       .then(() => {
           

           if (req.files) {

               let i = 1; //Naming files

               //Directory config
               const dir = './aptImages/' + res.locals.id + '/';
               fs.mkdirSync(dir);

               req.files.forEach((file) => {

                   //Naming and saving file
                   let filename = dir + i + '-' + file.originalname;

                   fs.rename(file.path, filename, function (err) {
                       if (err) throw err;
                   })

                      webp.cwebp(filename, dir+i+".webp" ,"-q 80",function(status,error) {
                          //if conversion successful status will be '100'
                          if(status==='100'){
                              fs.unlink(filename, (err) => {
                                  if (err) throw err;
                              // console.log(filename+' was deleted');
                              });
                          }
                          //if conversion fails status will be '101'
                             // console.log(status,error);	
                      }); 
                   i++;
               })
           }

       });
});

router.delete('/:id', checkAuth, function (req, res) {
   documentController.deleteById(req, res);
});

*/
module.exports = router;
