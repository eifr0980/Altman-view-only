/* Load Owner entity */
const Owner = require('../model/owner');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


let fs = require('fs-extra');


/**
 * Owner Data Access Object
 */
class OwnerDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT * FROM owners WHERE personal_id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Owner(row.id, row.personal_id, '', row.first_name, row.last_name, row.address, row.phone_number, row.email));
    };

    findById_Login(id) {
        let sqlRequest = "SELECT id, personal_id, password, is_admin FROM owners WHERE personal_id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams);
    };













































    
    /**
     * Tries to find an entity using its username / Primary Key
     * @params username
     * @return entity
     */
    findByUserName(username) {
        let sqlRequest = "SELECT * FROM owner WHERE username=$username";
        let sqlParams = { $username: username };

        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Owner(row.id, row.username, row.password));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM owners";
        return this.common.findAll(sqlRequest).then(rows => {
            let users = [];

            for (const row of rows) {
                users.push(row);
            }
            return users;
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
     * @params Owner
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Owner) {
        let sqlRequest = "UPDATE apt SET " +
            "city=$city, " +
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
            $address: Owner.address,
            $floor: Owner.floor,
            $rooms: Owner.rooms,
            $sqrMtr: Owner.sqrMtr,
            $parking: Owner.parking,
            $storage: Owner.storage,
            $arnona: Owner.arnona,
            $vaad: Owner.vaad,
            $price: Owner.price,
            $id: Owner.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Owner
     * returns database insertion status
     */
    create(Owner) {
        let sqlRequest = "INSERT into owner (username, password) " +
            "VALUES ($username, $password)";
        let sqlParams = {
            $username: Owner.username,
            $password: Owner.password,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Owner
     * returns database insertion status
     */
    createWithId(Owner) {
        let sqlRequest = "INSERT into owners (id, password) VALUES ($id, $password)";
        let sqlParams = {
            $id: Owner.id,
            $username: Owner.username,
            $password: Owner.password,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM owner WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM owner WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = OwnerDao;
