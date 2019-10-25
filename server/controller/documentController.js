/* Load Document Data Access Object */
const DocumentDao = require('../dao/documentDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Document entity */
const Document = require('../model/document');

/**
 * Document Controller
 */
class DocumentController {

    constructor() {
        this.DocumentDao = new DocumentDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.DocumentDao.findById(id)
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
        this.DocumentDao.findByAptId(id, owner_id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.DocumentDao.findAll()
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
        const owner_id = req.userData.id;

        this.DocumentDao.findDocumentsByAptIdAndCategory(id, category, owner_id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
    * Finds all entities.
    * @return all entities
    */
    findDocumentsCategoriesByAptId(req, res) {
        let id = req.params.id;
        const owner_id = req.userData.id;

        this.DocumentDao.findDocumentsCategories(id, owner_id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds query entities.
     * @return queried entities
     */
    findQuery(req, res) {
        let id = req.userData.id;
        this.DocumentDao.findByOwnerId(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.DocumentDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let apt = new Document();
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

        return this.DocumentDao.update(apt)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let apt = new Document();
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
            return this.DocumentDao.createWithId(apt)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.DocumentDao.create(apt)
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

        this.DocumentDao.deleteById(id)
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

        this.DocumentDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = DocumentController;
