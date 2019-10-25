/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ReportsController = require('../../controller/reportsController');
const reportsController = new ReportsController();

/* Load Multer (uploading files) */
let multer = require('multer');
let fs = require('fs-extra');

/* Load webp converter */
// var webp = require('webp-converter');

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

/* Load Check Auth */
const checkAuth = require('../../midware/check-auth');


/**
 * Reports Entity routes
 */


router.get('/', function (req, res) {
        reportsController.findByOwner(req, res);
});

router.get('/last', function (req, res) {
    reportsController.findLastByOwner(req, res);
});























router.get('/count', function (req, res) {
    reportsController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    reportsController.exists(req, res);
});

router.get('/:id', function (req, res) {
    reportsController.findById(req, res);
});



router.put('/:id', function (req, res) {
    reportsController.update(req, res);
});

router.post('/create', checkAuth, upload.any(), function (req, res) {
    reportsController.create(req, res)
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

                    /*   webp.cwebp(filename, dir+i+".webp" ,"-q 80",function(status,error) {
                           //if conversion successful status will be '100'
                           if(status==='100'){
                               fs.unlink(filename, (err) => {
                                   if (err) throw err;
                               // console.log(filename+' was deleted');
                               });
                           }
                           //if conversion fails status will be '101'
                              // console.log(status,error);	
                       }); */
                    i++;
                })
            }

        });
});

router.delete('/:id', checkAuth, function (req, res) {
    reportsController.deleteById(req, res);
});

module.exports = router;
