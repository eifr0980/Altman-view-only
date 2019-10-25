/* Load Modules */
const express = require('express');
const router = express.Router();
const path = require("path");

/* Load controller */
const AdminController = require('../../controller/adminController');
const adminController = new AdminController();

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

var upload = multer({
    storage
});

/* Load Check Auth */
const checkAuth = require('../../midware/check-auth');


/**
 * Admin Entity routes
 */


/**
 * Owner Entity routes
 */

router.get('/owners', function (req, res) {
    adminController.findAll(req, res);
});

router.get('/owners/:id', function (req, res) {
    adminController.findOwner(req, res);
});

router.post('/owners', function (req, res) {
    adminController.createOwner(req, res);
});

router.put('/owners/:id', function (req, res) {
    adminController.updateOwner(req, res);
});

router.delete('/owners/:id', function (req, res) {
    adminController.deleteOwner(req, res);
});

/**
 * Apartments Entity routes
 */

router.get('/apts', function (req, res) {
    adminController.findAllApts(res);
});
router.get('/apts/:id', function (req, res) {
    adminController.findAptById(req, res);
});
router.post('/apts', upload.single('img'), function (req, res) {
    adminController.createApartment(req, res);
});
router.put('/apts/:id', function (req, res) {
    adminController.updateApartment(req, res);
});
router.delete('/apts/:id', function (req, res) {
    adminController.deleteApartment(req, res);
});

/**
 * Contracts Entity routes
 */

router.get('/contracts/apt/:id', function (req, res) {
    adminController.findContractsByAptId(req, res);
});
router.post('/contracts', upload.single('file'), function (req, res) {
    adminController.createContract(req, res);
});
router.put('/contracts/:id', function (req, res) {
    adminController.updateContract(req, res);
});
router.delete('/contracts/:id', function (req, res) {
    adminController.deleteContract(req, res);
});

/**
 * Residents Entity routes
 */
router.get('/residents/apt/:id', function (req, res) {
    adminController.findResidentsByAptId(req, res);
});
router.post('/residents', upload.single('img'), function (req, res) {
    adminController.createResident(req, res);
});
router.put('/residents/:id', function (req, res) {
    adminController.updateResident(req, res);
});
router.delete('/residents/:id', function (req, res) {
    adminController.deleteResident(req, res);
});


/**
 * Reports Entity routes
 */
router.get('/reports/:id', function (req, res) {
    adminController.findLastByOwner(req, res);
});
router.post('/reports', upload.single('file'), function (req, res) {
    adminController.createReport(req, res);
});
router.put('/reports/:id', function (req, res) {
    adminController.updateReport(req, res);
});
router.delete('/reports/:id', function (req, res) {
    adminController.deleteReport(req, res);
});

/**
 * Cheques Entity routes
 */

router.get('/cheques/apt/:id', function (req, res) {
    adminController.findChequesByAptId(req, res);
});
router.get('/cheques/apt/:id/:year', function (req, res) {
    adminController.findChequesByAptIdAndYear(req, res);
});
router.post('/cheques', upload.single('file'), function (req, res) {
    adminController.createCheque(req, res);
});
router.put('/cheques/:id', function (req, res) {
    adminController.updateCheque(req, res);
});
router.delete('/cheques/:id', function (req, res) {
    adminController.deleteCheque(req, res);
});

/**
 * Documents Entity routes
 */

router.get('/documents/apt/:id', function (req, res) {
    adminController.findDocumentsByAptId(req, res);
});
router.get('/documents/category/apt/:id', function (req, res) {
    adminController.findDocumentsByAptIdAndCategory(req, res);
});
router.get('/documents/categories/:id', function (req, res) {
    adminController.findDocumentsCategoriesByAptId(req, res);
});
router.post('/documents', upload.single('file'), function (req, res) {
    adminController.createDocument(req, res);
});
router.put('/documents/:id', function (req, res) {
    adminController.updateDocument(req, res);
});
router.delete('/documents/:id', function (req, res) {
    adminController.deleteDocument(req, res);
});










/**
 * file download Entity routes
 */
router.get('/download/:file(*)', (req, res) => {
    var file = req.params.file;
    var fileLocation = path.join('./Owners', file);
    res.download(fileLocation, file);
});












































































router.get('/', function (req, res) {
    adminController.findByOwner(req, res);
});

router.get('/:id', function (req, res) {
    adminController.findById(req, res);
});

router.get('/apt/:id', function (req, res) {
    adminController.findByAptId(req, res);
});

router.get('/contract/:id', function (req, res) {
    adminController.findByContractId(req, res);
});








router.get('/count', function (req, res) {
    adminController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    adminController.exists(req, res);
});





router.put('/:id', function (req, res) {
    adminController.update(req, res);
});



router.delete('/:id', checkAuth, function (req, res) {
    adminController.deleteById(req, res);
});

module.exports = router;