/* Load Apartment entity */
const Apartment = require('../model/apartment');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


let fs = require('fs-extra');


/**
 * Apartment Data Access Object
 */
class AptDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT * FROM apartments WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Apartment(row.id, row.owner_id, row.is_rented, row.address, row.img, row.value));
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
                apts.push(new Apartment(row.id, row.city, row.description, row.address, row.floor, row.rooms, row.sqrMtr, row.parking, row.storage, row.arnona, row.vaad, row.price, photos));
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
                apts.push(new Apartment(row.id, row.owner_id, row.is_rented, row.address, row.img, row.value));
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
     * @params Apartment
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Apartment) {
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
            $city: Apartment.city,
            $description: Apartment.description,
            $address: Apartment.address,
            $floor: Apartment.floor,
            $rooms: Apartment.rooms,
            $sqrMtr: Apartment.sqrMtr,
            $parking: Apartment.parking,
            $storage: Apartment.storage,
            $arnona: Apartment.arnona,
            $vaad: Apartment.vaad,
            $price: Apartment.price,
            $id: Apartment.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Apartment
     * returns database insertion status
     */
    create(Apartment) {
        let sqlRequest = "INSERT into apt (city, description, address, floor, rooms, sqrMtr, parking, storage, arnona, vaad, price) " +
            "VALUES ($city, $description, $address, $floor, $rooms, $sqrMtr, $parking, $storage, $arnona, $vaad, $price) ";
        let sqlParams = {
            $city: Apartment.city,
            $description: Apartment.description,
            $address: Apartment.address,
            $floor: Apartment.floor,
            $rooms: Apartment.rooms,
            $sqrMtr: Apartment.sqrMtr,
            $parking: Apartment.parking,
            $storage: Apartment.storage,
            $arnona: Apartment.arnona,
            $vaad: Apartment.vaad,
            $price: Apartment.price,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Apartment
     * returns database insertion status
     */
    createWithId(Apartment) {
        let sqlRequest = "INSERT into apt (id, city, description, address, floor, rooms, sqrMtr, parking, storage, arnona, vaad, price) " +
            "VALUES ($id, $city, $address, $floor, $rooms, $sqrMtr, $parking, $storage, $arnona, $vaad, $price)";
        let sqlParams = {
            $id: Apartment.id,
            $city: Apartment.city,
            $description: Apartment.description,
            $address: Apartment.address,
            $floor: Apartment.floor,
            $rooms: Apartment.rooms,
            $sqrMtr: Apartment.sqrMtr,
            $parking: Apartment.parking,
            $storage: Apartment.storage,
            $arnona: Apartment.arnona,
            $vaad: Apartment.vaad,
            $price: Apartment.price,
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

module.exports = AptDao;
