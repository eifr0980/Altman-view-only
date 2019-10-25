/* Load Report Data Access Object */
const ReportDao = require('../dao/reportDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Report entity */
const Report = require('../model/report');

/* Load enctyption method */
const bcrypt = require('bcrypt');

/* Load enctyption method */
const jwt = require('jsonwebtoken');

/**
 * Resident Controller
 */
class ReportController {

    constructor() {
        this.ReportDao = new ReportDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findByOwner(req, res) {
        let id = req.userData.id;
        this.ReportDao.findByOwner(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
         * Tries to find an entity using its Id / Primary Key
         * @params req, res
         * @return entity
         */
    findLastByOwner(req, res) {
        let id = req.userData.id;
        this.ReportDao.findLastByOwner(id)
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

        this.ReportDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findByReportId(req, res) {
        let id = req.params.id;

        this.ReportDao.findByReportId(id)
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

        this.ReportDao.findByContractId(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };






















    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.ReportDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };


    /**
     * Tries to login an entity using its Id / password Key
     * @params req, res
     * @return entity
     */
    login(req, res, next) {
        this.ReportDao.findByUserName(req.body.username)
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

        this.ReportDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let Report = new Report();
        Report.id = req.body.id;
        Report.city = req.body.city;
        Report.address = req.body.address;
        Report.floor = req.body.floor;
        Report.rooms = req.body.rooms;
        Report.sqrMtr = req.body.sqrMtr;
        Report.parking = req.body.parking;
        Report.storage = req.body.storage;
        Report.arnona = req.body.arnona;
        Report.vaad = req.body.vaad;
        Report.price = req.body.price;

        return this.ReportDao.update(Report)
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
                    return this.ReportDao.createWithId(user)
                        .then(this.common.editSuccess(res))
                        .catch(this.common.serverError(res));
                }
                else {
                    return this.ReportDao.create(user)
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

        this.ReportDao.deleteById(id)
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

        this.ReportDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = ReportController;
