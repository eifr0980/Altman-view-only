/* Load Apt Data Access Object */
const ResidentDao = require('../dao/residentDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Apt entity */
const Resdient = require('../model/resident');

/* Load enctyption method */
const bcrypt = require('bcrypt');

/* Load enctyption method */
const jwt = require('jsonwebtoken');

/**
 * Resident Controller
 */
class ResidentController {

    constructor() {
        this.ResidentDao = new ResidentDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findByOwner(req, res) {
        let id = req.userData.id;
        this.ResidentDao.findByOwner(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.ResidentDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findByAptId(req, res) {
        let id = req.params.id;
        let owner_id = req.userData.id;
        this.ResidentDao.findByAptId(id, owner_id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

        /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findByContractId(req, res) {
        let id = req.params.id;

        this.ResidentDao.findByContractId(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };





















    
    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.ResidentDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };


    /**
     * Tries to login an entity using its Id / password Key
     * @params req, res
     * @return entity
     */
    login(req, res, next) {
        this.ResidentDao.findByUserName(req.body.username)
            .then(user => {

                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {

                        return this.common.notAuth(res);
                    }

                    if (result) {
                        const token = jwt.sign({
                            id: user.id,
                            username: user.userName
                        },
                            "SECRET",
                            {
                                expiresIn: "1h",
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
        let apt = new Apt();
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
                    return this.ResidentDao.createWithId(user)
                        .then(this.common.editSuccess(res))
                        .catch(this.common.serverError(res));
                }
                else {
                    return this.ResidentDao.create(user)
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

        this.ResidentDao.deleteById(id)
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

module.exports = ResidentController;
