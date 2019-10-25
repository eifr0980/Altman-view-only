/* Load Resident entity */
const Resident = require('../model/resident');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


let fs = require('fs-extra');


/**
 * Resident Data Access Object
 */
class ResidentDao {

    constructor() {
        this.common = new daoCommon();
    }


    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findByOwner(id) {
        let sqlRequest = "SELECT * FROM residents WHERE contract_id IN ( SELECT id FROM contracts WHERE apt_id IN ( SELECT id from apartments WHERE owner_id = $id))";
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
    findById(id) {
        let sqlRequest = "SELECT * FROM residents WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Resident(row.id, row.contract_id, row.first_name, row.last_name, row.img, row.phone_number, row.email));
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findByAptId(id, owner_id) {
        let sqlRequest = "SELECT * FROM residents WHERE contract_id IN ( SELECT id FROM contracts WHERE apt_id = $id AND apt_id IN (SELECT id FROM apartments WHERE owner_id = $owner_id))";
        let sqlParams = {
            $id: id,
            $owner_id: owner_id
        };
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            return rows;
        });

    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findByContractId(id) {
        let sqlRequest = "SELECT * FROM residents WHERE contract_id = $id ";
        let sqlParams = { $id: id };
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            return rows;
        });

    };


























    /**
     * Tries to find an entity using its username / Primary Key
     * @params username
     * @return entity
     */
    findByUserName(username) {
        let sqlRequest = "SELECT * FROM resident WHERE username=$username";
        let sqlParams = { $username: username };

        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Resident(row.id, row.username, row.password));
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
     * @params Resident
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Resident) {
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
            $address: Resident.address,
            $floor: Resident.floor,
            $rooms: Resident.rooms,
            $sqrMtr: Resident.sqrMtr,
            $parking: Resident.parking,
            $storage: Resident.storage,
            $arnona: Resident.arnona,
            $vaad: Resident.vaad,
            $price: Resident.price,
            $id: Resident.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Resident
     * returns database insertion status
     */
    create(Resident) {
        let sqlRequest = "INSERT into resident (username, password) " +
            "VALUES ($username, $password)";
        let sqlParams = {
            $username: Resident.username,
            $password: Resident.password,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Resident
     * returns database insertion status
     */
    createWithId(Resident) {
        let sqlRequest = "INSERT into owners (id, password) VALUES ($id, $password)";
        let sqlParams = {
            $id: Resident.id,
            $username: Resident.username,
            $password: Resident.password,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM resident WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM resident WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = ResidentDao;
