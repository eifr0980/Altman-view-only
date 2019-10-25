/* Load Owner Data Access Object */
const ownerDao = require('../dao/ownerDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Owner entity */
const Owner = require('../model/owner');

/* Load enctyption method */
const bcrypt = require('bcrypt');

/* Load enctyption method */
const jwt = require('jsonwebtoken');
const fs = require("fs");

/**
 * Owner Controller
 */
class OwnerController {

    constructor() {
        this.ownerDao = new ownerDao();
        this.common = new ControllerCommon();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findOwner(req, res) {
        let id = req.userData.id;
        this.ownerDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Tries to login an entity using its Id / password Key
     * @params req, res
     * @return entity
     */
    login(req, res) {
        this.ownerDao.findById_Login(req.body.personal_id)
            .then(user => {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return this.common.notAuthError(err);
                    }
                    if (result) {
                        const key = fs.readFileSync("./server/keys/private.key");
                        const token = jwt.sign({
                                id: user.id,
                                isAdmin: user.is_admin
                            },
                            key, {
                                algorithm: 'RS256',
                                expiresIn: "12h"
                            });
                        return res.status(200).json({
                            message: "auth success",
                            token: token
                        })
                    }
                    
                    return this.common.notAuth(res);
                });
            })
            .catch(this.common.notAuthError(res));
    };


















































    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.ownerDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.AptDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let apt = new Owner();
        apt.id = req.body.id;
        apt.city = req.body.city;
        apt.address = req.body.address;
        apt.floor = req.body.floor;
        apt.rooms = req.body.rooms;
        apt.sqrMtr = req.body.sqrMtr;
        apt.parking = req.body.parking;
        apt.storage = req.body.storage;
        apt.arnona = req.body.arnona;
        apt.vaad = req.body.vaad;
        apt.price = req.body.price;

        return this.AptDao.update(apt)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {

        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                let user = new User();
                if (req.body.id) {
                    user.id = req.body.id;
                }
                user.username = req.body.username;
                user.password = hash;

                if (req.body.id) {
                    return this.ownerDao.createWithId(user)
                        .then(this.common.editSuccess(res))
                        .catch(this.common.serverError(res));
                } else {
                    return this.ownerDao.create(user)
                        .then(this.common.editSuccess(res))
                        .catch(this.common.serverError(res));
                }
            }
        });


    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res 
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.ownerDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.AptDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = OwnerController;