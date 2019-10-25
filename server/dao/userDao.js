/* Load Apt entity */
const User = require('../model/user');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


let fs = require('fs-extra');


/**
 * Apt Data Access Object
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
        let sqlRequest = "SELECT * FROM user WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.username, row.password));
    };

    /**
     * Tries to find an entity using its username / Primary Key
     * @params username
     * @return entity
     */
    findByUserName(username) {
        let sqlRequest = "SELECT * FROM user WHERE username=$username";
        let sqlParams = { $username: username };

        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new User(row.id, row.username, row.password));
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
     * @params Apt
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Apt) {
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
            $address: Apt.address,
            $floor: Apt.floor,
            $rooms: Apt.rooms,
            $sqrMtr: Apt.sqrMtr,
            $parking: Apt.parking,
            $storage: Apt.storage,
            $arnona: Apt.arnona,
            $vaad: Apt.vaad,
            $price: Apt.price,
            $id: Apt.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Apt
     * returns database insertion status
     */
    create(User) {
        let sqlRequest = "INSERT into user (username, password) " +
            "VALUES ($username, $password)";
        let sqlParams = {
            $username: User.username,
            $password: User.password,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params User
     * returns database insertion status
     */
    createWithId(User) {
        let sqlRequest = "INSERT into owners (id, password) VALUES ($id, $password)";
        let sqlParams = {
            $id: User.id,
            $username: User.username,
            $password: User.password,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM user WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM user WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = AptDao;
