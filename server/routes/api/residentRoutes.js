/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const ResidentController = require('../../controller/residentController');
const residentController = new ResidentController();

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
 * Resident Entity routes
 */
router.get('/', function (req, res) {
    residentController.findByOwner(req, res);
});

router.get('/:id', function (req, res) {
    residentController.findById(req, res);
});

router.get('/apt/:id', function (req, res) {
    residentController.findByAptId(req, res);
});

router.get('/contract/:id', function (req, res) {
    residentController.findByContractId(req, res);
});








router.get('/count', function (req, res) {
    residentController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    residentController.exists(req, res);
});





router.put('/:id', function (req, res) {
    residentController.update(req, res);
});

router.post('/create', checkAuth, upload.any(), function (req, res) {
    residentController.create(req, res)
        .then(() => {
            

            if (req.files) {

                let i = 1; //Naming files

                //Directory config
                const dir = './Owners/' + res.locals.id + '/';
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
    residentController.deleteById(req, res);
});

module.exports = router;
