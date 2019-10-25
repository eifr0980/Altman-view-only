/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();
const CONSTANTS = require("../constants");
const path = require("path");
const fs = require('fs');

/* Load Check Auth */
const CheckAuth = require('../midware/check-auth');
const CheckAuthAdmin = require('../midware/check-admin');

/* API routes */
router.use(CONSTANTS.ENDPOINT.OWNERS, require('./api/ownerRoutes'));
router.use(CONSTANTS.ENDPOINT.APTS, CheckAuth, require('./api/aptRoutes'));
router.use(CONSTANTS.ENDPOINT.CONTRACTS, CheckAuth, require('./api/contractRoutes'));
router.use(CONSTANTS.ENDPOINT.RESIDENTS, CheckAuth, require('./api/residentRoutes'));
router.use(CONSTANTS.ENDPOINT.REPORTS, CheckAuth, require('./api/reportRoutes'));
router.use(CONSTANTS.ENDPOINT.CHEQUES, CheckAuth, require('./api/chequeRoutes'));
router.use(CONSTANTS.ENDPOINT.DOCUMENTS, CheckAuth, require('./api/documentRoutes'));

router.get('/download/:file(*)', (req, res) => {
    var file = req.params.file;
   // const file = fs.createWriteStream(req.params.file);
    
    var fileLocation = path.join('./Owners', req.userData.id, file);
  //  res.pipe(file);
    res.download(fileLocation, file);
});

router.use(CONSTANTS.ENDPOINT.ADMINS, CheckAuthAdmin, require('./api/adminRoutes'));




module.exports = router;
