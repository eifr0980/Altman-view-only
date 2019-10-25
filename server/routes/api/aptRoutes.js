/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const AptController = require('../../controller/aptController');
const aptController = new AptController();

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
    if (Object.keys(req.query).length === 0) {
        aptController.findQuery(req, res);

    } else {
        aptController.findQuery(req, res);

    }
});

router.get('/:id', function (req, res) {
    aptController.findById(req, res)
});



/**
 * Admin's routes
 */

 /*

router.get('/count', function (req, res) {
    aptController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    aptController.exists(req, res);
});

router.get('/:id', function (req, res) {
    aptController.findById(req, res);
});



router.put('/:id', function (req, res) {
    aptController.update(req, res);
});

router.post('/create', checkAuth, upload.any(), function (req, res) {
    aptController.create(req, res)
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
    aptController.deleteById(req, res);
});

*/
module.exports = router;
