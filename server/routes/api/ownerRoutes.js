/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const OwnerController = require('../../controller/ownerController');
const ownerController = new OwnerController();

const CheckAuth = require('../../midware/check-auth');


/**
 * User Entity routes
 */
router.get('/', CheckAuth, (req, res, next) => {
   // ownerController.find(req, res);
    ownerController.findOwner(req, res);
});

router.post('/login', function (req, res) {
    ownerController.login(req, res);
});












/** Not usable for now
 * 
router.post('/signup', (req, res, next) => {
    ownerController.create(req, res);
});

router.delete('/:id', checkAuth, function (req, res) {
    ownerController.deleteById(req, res);
});


 *
 */
module.exports = router;
