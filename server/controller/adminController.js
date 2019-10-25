/* Load Apt Data Access Object */
const adminDao = require('../dao/adminDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Models */
const Owner = require('../model/owner');
const Apartment = require('../model/apartment');
const Contract = require('../model/contract');
const Resident = require('../model/resident');
const Report = require('../model/report');
const Document = require('../model/document');
const Cheque = require('../model/cheque');

/* Load enctyption method */
const bcrypt = require('bcrypt');

/* Load enctyption method */
const jwt = require('jsonwebtoken');

/* Load UUID method */
var short = require('short-uuid');

let fs = require('fs-extra');


/**
 * Admin Owner\General Controller
 */
class AdminController {

    constructor() {
        this.adminDao = new adminDao();
        this.common = new ControllerCommon();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(req, res) {
        let id = req.userData.id;
        this.adminDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findOwner(req, res) {
        let id = req.params.id;
        this.adminDao.findOwner(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAllApts(res) {
        this.adminDao.findAllApts()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAptById(req, res) {
        let id = req.params.id;

        this.adminDao.findAptById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    createOwner(req, res) {

        return bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {

                let owner = new Owner();
                owner.id = short.generate();
                owner.personal_id = req.body.personal_id;
                owner.password = hash;
                owner.first_name = req.body.first_name;
                owner.last_name = req.body.last_name;
                owner.address = req.body.address;
                owner.phone_number = req.body.phone_number;
                owner.email = req.body.email;



                return this.adminDao.createOwner(owner)
                    .then(() => {
                        const dir = './Owners/' + owner.id + '/';
                        fs.mkdirpSync(dir);
                        const dir_apartments = './Owners/' + owner.id + '/apartments/';
                        fs.mkdirpSync(dir_apartments);
                        const dir_reports = './Owners/' + owner.id + '/reports/';
                        fs.mkdirpSync(dir_reports);

                    })
                    .then(this.common.editSuccess(res))
                    .catch(this.common.serverError(res));

            }
        });
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateOwner(req, res) {
        let owner = new Owner();
        owner.id = req.params.id;
        owner.personal_id = req.body.personal_id;
        owner.first_name = req.body.first_name;
        owner.last_name = req.body.last_name;
        owner.address = req.body.address;
        owner.phone_number = req.body.phone_number;
        owner.email = req.body.email;

        return this.adminDao.updateOwner(owner)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res 
     * returns database deletion status
     */
    deleteOwner(req, res) {
        let id = req.params.id;

        this.adminDao.deleteOwner(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };



    /**
     * Apartment Controller
     */

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    createApartment(req, res) {
        let apartment = new Apartment();
        apartment.id = short.generate();
        apartment.owner_id = req.body.owner_id;
        apartment.is_rented = req.body.is_rented;
        apartment.address = req.body.address;
        apartment.img = short.generate();
        apartment.value = req.body.value;

        return this.adminDao.createApartment(apartment)
            .then(() => {

                let file = req.file;
                let dir = './Owners/' + apartment.owner_id + '/apartments/' + apartment.id + '/';
                fs.mkdirSync(dir);
                let subdir = dir + '/contracts/';
                fs.mkdirSync(subdir, 777);
                subdir = dir + '/documents/';
                fs.mkdirSync(subdir, 777);
                let filename = dir + apartment.img;
                fs.rename(file.path, filename, function (err) {
                    if (err) throw err;
                })
            })
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateApartment(req, res) {
        let apartment = new Apartment();
        apartment.id = req.params.id;
        apartment.is_rented = req.body.is_rented;
        apartment.address = req.body.address;
        apartment.value = req.body.value;

        return this.adminDao.updateApartment(apartment)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res 
     * returns database deletion status
     */
    deleteApartment(req, res) {
        let id = req.params.id;

        this.adminDao.deleteApartment(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };



    /**
     * Contract Controller
     */

    /**
* Finds all entities.
* @return all entities
*/
    findContractsByAptId(req, res) {
        let id = req.params.id;

        this.adminDao.findContractByAptId(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    createContract(req, res) {
        let contract = new Contract();
        contract.id = short.generate();
        contract.apt_id = req.body.apt_id;
        contract.created_at = req.body.created_at;
        contract.updated_at = req.body.updated_at;
        contract.end_at = req.body.end_at;
        contract.file = short.generate();
        contract.cheques_valid_date = req.body.cheques_valid_date;
        contract.is_last_cheque_valid = req.body.is_last_cheque_valid;

        return this.adminDao.createContract(contract)
            .then(() => {
                this.adminDao.getOwnerbyApt(contract.apt_id)
                    .then((row) => {
                        let dir = './Owners/' + row.owner_id + '/apartments/' + contract.apt_id + '/contracts/' + contract.id;
                        fs.mkdirpSync(dir);
                        let file = req.file;
                        let filename = dir + '/' + contract.file;
                        fs.rename(file.path, filename, function (err) {
                            if (err) throw err;
                        })
                        const dir_contract = dir + '/residents/';
                        fs.mkdirpSync(dir_contract);
                    });
            })
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateContract(req, res) {
        let contract = new Contract();
        contract.id = req.params.id;
        contract.created_at = req.body.created_at;
        contract.updated_at = req.body.updated_at;
        contract.end_at = req.body.end_at;
        contract.cheques_valid_date = req.body.cheques_valid_date;
        contract.is_last_cheque_valid = req.body.is_last_cheque_valid;


        return this.adminDao.updateContract(contract)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res 
     * returns database deletion status
     */
    deleteContract(req, res) {
        let id = req.params.id;

        this.adminDao.deleteContract(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };



    /**
     * Resident Controller
     */

    /**
* Finds all entities.
* @return all entities
*/
    findResidentsByAptId(req, res) {
        let id = req.params.id;

        this.adminDao.findResidentsByAptId(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    createResident(req, res) {
        let resident = new Resident();
        resident.id = short.generate();
        resident.contract_id = req.body.contract_id;
        resident.first_name = req.body.first_name;
        resident.last_name = req.body.last_name;
        resident.img = short.generate();
        resident.phone_number = req.body.phone_number;
        resident.email = req.body.email;

        return this.adminDao.createResident(resident)
            .then(() => {
                this.adminDao.getOwnerAptByContract(resident.contract_id)
                    .then((row) => {
                        let dir = './Owners/' + row.owner_id + '/apartments/' + row.apt_id + '/contracts/' + resident.contract_id + '/residents/' + resident.id;
                        fs.mkdirpSync(dir, 777);
                        let subdir = dir + '/cheques/';
                        fs.mkdirSync(subdir, 777);
                        let file = req.file;
                        let filename = dir + '/' + resident.img;
                        fs.rename(file.path, filename, function (err) {
                            if (err) throw err;
                        })
                    });
            })
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateResident(req, res) {
        let resident = new Resident();
        resident.id = req.params.id;
        resident.first_name = req.body.first_name;
        resident.last_name = req.body.last_name;
        resident.phone_number = req.body.phone_number;
        resident.email = req.body.email;


        return this.adminDao.updateResident(resident)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res 
     * returns database deletion status
     */
    deleteResident(req, res) {
        let id = req.params.id;

        this.adminDao.deleteResident(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };



    /**
     * Reports Controller
     */

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findLastByOwner(req, res) {
        let id = req.params.id;
        this.adminDao.findLastByOwner(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    createReport(req, res) {
        let report = new Report();
        report.id = short.generate();
        report.owner_id = req.body.owner_id;
        report.file = short.generate();
        report.created_on = req.body.created_on;
        report.updated_on = req.body.updated_on;
        report.is_read = req.body.is_read;
        return this.adminDao.createReport(report)
            .then(() => {
                let file = req.file;
                let dir = './Owners/' + report.owner_id + '/reports/';
                let filename = dir + report.file;
                fs.rename(file.path, filename, function (err) {
                    if (err) throw err;
                })
            })
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateReport(req, res) {
        let report = new Report();
        report.id = req.params.id;
        report.created_on = req.body.created_on;
        report.updated_on = req.body.updated_on;
        report.is_read = req.body.is_read;


        return this.adminDao.updateReport(report)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res 
     * returns database deletion status
     */
    deleteReport(req, res) {
        let id = req.params.id;

        this.adminDao.deleteReport(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };




    /**
    * Documents Controller
    */

    /**
* Finds all entities.
* @return all entities
*/
    findDocumentsByAptId(req, res) {
        let id = req.params.id;

        this.adminDao.findDocumentsByAptId(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
* Finds all entities.
* @return all entities
*/
    findDocumentsByAptIdAndCategory(req, res) {
        const id = req.params.id;
        const category = req.query.category;

        this.adminDao.findDocumentsByAptIdAndCategory(id, category)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
* Finds all entities.
* @return all entities
*/
    findDocumentsCategoriesByAptId(req, res) {
        let id = req.params.id;

        this.adminDao.findDocumentsCategories(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    createDocument(req, res) {
        let document = new Document();
        document.id = short.generate();
        document.apt_id = req.body.apt_id;
        document.name = req.body.name;
        document.date = req.body.date;
        document.category = req.body.category;
        document.file = short.generate();

        return this.adminDao.createDocument(document)
            .then(() => {
                this.adminDao.getOwnerbyApt(document.apt_id)
                    .then((row) => {
                        let dir = './Owners/' + row.owner_id + '/apartments/' + document.apt_id + '/documents/';
                        fs.mkdirpSync(dir, 777);

                        let file = req.file;
                        let filename = dir + '/' + document.file;
                        fs.rename(file.path, filename, function (err) {
                            if (err) throw err;
                        })
                    });
            })
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateDocument(req, res) {
        let document = new Document();
        document.id = req.params.id;
        document.apt_id = req.body.apt_id;
        document.name = req.body.name;
        document.date = req.body.date;
        document.category = req.body.category;


        return this.adminDao.updateDocument(document)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res 
     * returns database deletion status
     */
    deleteDocument(req, res) {
        let id = req.params.id;

        this.adminDao.deleteDocument(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Cheques Controller
     */

    /**
* Finds all entities.
* @return all entities
*/
    findChequesByAptId(req, res) {
        let id = req.params.id;

        this.adminDao.findChequesByAptId(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
* Finds all entities.
* @return all entities
*/
    findChequesByAptIdAndYear(req, res) {
        const id = req.params.id;
        const year = req.params.year;

        this.adminDao.findChequesByAptIdAndYear(id, year)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    createCheque(req, res) {
        let cheque = new Cheque();
        cheque.id = short.generate();
        cheque.resident_id = req.body.resident_id;
        cheque.date = req.body.date;
        cheque.valid = req.body.valid;
        cheque.file = short.generate();


        return this.adminDao.createCheque(cheque)
            .then(() => {
                this.adminDao.getOwnerAptContractByResident(cheque.resident_id)
                    .then((row) => {
                        let dir = './Owners/' + row.owner_id + '/apartments/' + row.apt_id + '/contracts/' + row.contract_id + '/residents/' + cheque.resident_id + '/cheques/';
                        fs.mkdirpSync(dir, 777);
                        let file = req.file;
                        let filename = dir + cheque.file;
                        fs.rename(file.path, filename, function (err) {
                            if (err) throw err;
                        })
                    });
            })
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));

    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateCheque(req, res) {
        let cheque = new Cheque();
        cheque.id = req.params.id;
        cheque.date = req.body.date;
        cheque.valid = req.body.valid;


        return this.adminDao.updateCheque(cheque)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res 
     * returns database deletion status
     */
    deleteCheque(req, res) {
        let id = req.params.id;

        this.adminDao.deleteCheque(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };




































    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.adminDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };



    /**
     * Tries to login an entity using its Id / password Key
     * @params req, res
     * @return entity
     */
    login(req, res, next) {
        this.adminDao.findByUserName(req.body.username)
            .then(user => {

                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {

                        return this.common.notAuth(res);
                    }

                    if (result) {
                        const token = jwt.sign({
                            id: user.id,
                            username: user.userName,
                            isAdmin: user.is_admin
                        },
                            "SECRET", {
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

module.exports = AdminController;