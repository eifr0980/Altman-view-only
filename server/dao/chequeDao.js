/* Load Cheque entity */
const Cheque = require('../model/cheque');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


let fs = require('fs-extra');


/**
 * Cheque Data Access Object
 */
class ChequeDao {

    constructor() {
        this.common = new daoCommon();
    }   

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT * FROM cheques WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Cheque(row.id, row.resident_id, row.date, row.valid, row.file));
    };


     /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findByAptId(id) {
        let sqlRequest = "SELECT * FROM cheques WHERE resident_id IN ( SELECT id FROM residents WHERE contract_id IN ( SELECT id from contracts WHERE apt_id = $id))";
        let sqlParams = { $id: id };
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            return rows;
        });
    };

         /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findByResidentId(id) {
        let sqlRequest = "SELECT * FROM cheques WHERE resident_id = $id";
        let sqlParams = { $id: id };
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            return rows;
        });
    };


    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM apartments";
        return this.common.findAll(sqlRequest).then(rows => {
            let apts = [];

            for (const row of rows) {
                var photos = fs.readdirSync('./aptImages/' + row.id + '/');
                apts.push(new Cheque(row.id, row.city, row.description, row.address, row.floor, row.rooms, row.sqrMtr, row.parking, row.storage, row.arnona, row.vaad, row.price, photos));
            }
            return apts;
        });
    };

    /**
     * Finds Query entities.
     * @return queried entities
     */
    findQuery(sqlParams) {
        //  const sql = `WHERE city = ${formArray[0].location} AND rooms = ${formArray[1].rooms} AND sqrMtr = ${formArray[1].sqrMtr} AND price = ${formArray[2].price} AND parking = ${formArray[2].parking ? 1 : 0} AND storage = ${formArray[2].storage ? 1 : 0}`;
        let sqlRequest = "SELECT * FROM apartments WHERE " +
            "owner_id=$id";
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            let apts = [];
            for (const row of rows) {
               // var photos = fs.readdirSync('./aptImages/' + row.id + '/');
                apts.push(new Cheque(row.id, row.resident_id, row.date, row.valid, row.file));
            }
            return apts;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM apt";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Cheque
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Cheque) {
        let sqlRequest = "UPDATE apt SET " +
            "city=$city, " +
            "description=$description, " +
            "address=$address, " +
            "floor=$floor, " +
            "rooms=$rooms, " +
            "sqrMtr=$sqrMtr " +
            "parking=$parking " +
            "storage=$storage " +
            "arnona=$arnona " +
            "vaad=$vaad " +
            "price=$price " +
            "WHERE id=$id";

        let sqlParams = {
            $city: Cheque.city,
            $description: Cheque.description,
            $address: Cheque.address,
            $floor: Cheque.floor,
            $rooms: Cheque.rooms,
            $sqrMtr: Cheque.sqrMtr,
            $parking: Cheque.parking,
            $storage: Cheque.storage,
            $arnona: Cheque.arnona,
            $vaad: Cheque.vaad,
            $price: Cheque.price,
            $id: Cheque.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Cheque
     * returns database insertion status
     */
    create(Cheque) {
        let sqlRequest = "INSERT into apt (city, description, address, floor, rooms, sqrMtr, parking, storage, arnona, vaad, price) " +
            "VALUES ($city, $description, $address, $floor, $rooms, $sqrMtr, $parking, $storage, $arnona, $vaad, $price) ";
        let sqlParams = {
            $city: Cheque.city,
            $description: Cheque.description,
            $address: Cheque.address,
            $floor: Cheque.floor,
            $rooms: Cheque.rooms,
            $sqrMtr: Cheque.sqrMtr,
            $parking: Cheque.parking,
            $storage: Cheque.storage,
            $arnona: Cheque.arnona,
            $vaad: Cheque.vaad,
            $price: Cheque.price,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Cheque
     * returns database insertion status
     */
    createWithId(Cheque) {
        let sqlRequest = "INSERT into apt (id, city, description, address, floor, rooms, sqrMtr, parking, storage, arnona, vaad, price) " +
            "VALUES ($id, $city, $address, $floor, $rooms, $sqrMtr, $parking, $storage, $arnona, $vaad, $price)";
        let sqlParams = {
            $id: Cheque.id,
            $city: Cheque.city,
            $description: Cheque.description,
            $address: Cheque.address,
            $floor: Cheque.floor,
            $rooms: Cheque.rooms,
            $sqrMtr: Cheque.sqrMtr,
            $parking: Cheque.parking,
            $storage: Cheque.storage,
            $arnona: Cheque.arnona,
            $vaad: Cheque.vaad,
            $price: Cheque.price,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM apt WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM apt WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = ChequeDao;
