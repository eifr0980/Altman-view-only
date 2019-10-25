/* Load Apartment Data Access Object */
const ApartmentDao = require('../dao/apartmentDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Apartment entity */
const Apartment = require('../model/apartment');

/**
 * Apartment Controller
 */
class ApartmentController {

    constructor() {
        this.ApartmentDao = new ApartmentDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.ApartmentDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.ApartmentDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds query entities.
     * @return queried entities
     */
    findQuery(req, res) {
        const range = 1000;
        let sqlParams = {
            $id: req.userData.id
        };
        this.ApartmentDao.findQuery(sqlParams)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.ApartmentDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let apt = new Apartment();
        apt.id = req.body.id;
        apt.city = req.body.city;
        apt.description = req.body.description;
        apt.address = req.body.address;
        apt.floor = req.body.floor;
        apt.rooms = req.body.rooms;
        apt.sqrMtr = req.body.sqrMtr;
        apt.parking = req.body.parking;
        apt.storage = req.body.storage;
        apt.arnona = req.body.arnona;
        apt.vaad = req.body.vaad;
        apt.price = req.body.price;

        return this.ApartmentDao.update(apt)
            .then(this.common.editSuccess(res))
            .catch  (this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let apt = new Apartment();
        if (req.body.id) {
            apt.id = req.body.id;
        }
        apt.city = req.body.city;
        apt.description = req.body.description;
        apt.address = req.body.address;
        apt.floor = req.body.floor;
        apt.rooms = req.body.rooms;
        apt.sqrMtr = req.body.sqrMtr;
        apt.parking = req.body.parking;
        apt.storage = req.body.storage;
        apt.arnona = req.body.arnona;
        apt.vaad = req.body.vaad;
        apt.price = req.body.price;

        if (req.body.id) {
            return this.ApartmentDao.createWithId(apt)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.ApartmentDao.create(apt)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.ApartmentDao.deleteById(id)
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

        this.ApartmentDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = ApartmentController;
