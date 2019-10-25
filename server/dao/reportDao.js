/* Load Report entity */
const Report = require('../model/report');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


let fs = require('fs-extra');


/**
 * Report Data Access Object
 */
class ReportDao {

    constructor() {
        this.common = new daoCommon();
    }


    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findByOwner(id) {
        let sqlRequest = "SELECT * FROM reports WHERE owner_id = $id";
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
    findLastByOwner(id) {
        let sqlRequest = "SELECT * FROM reports WHERE owner_id = $id ORDER BY created_on desc limit 1";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(rows => {
            return rows;
        });
    };
















    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT * FROM reports WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Report(row.id, row.contract_id, row.first_name, row.last_name, row.img, row.phone_number, row.email));
    };

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findByAptId(id) {
        let sqlRequest = "SELECT * FROM reports WHERE contract_id IN ( SELECT id FROM contracts WHERE apt_id = $id )";
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
    findByContractId(id) {
        let sqlRequest = "SELECT * FROM reports WHERE contract_id = $id ";
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
        let sqlRequest = "SELECT * FROM report WHERE username=$username";
        let sqlParams = { $username: username };

        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Report(row.id, row.username, row.password));
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
     * @params Report
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Report) {
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
            $address: Report.address,
            $floor: Report.floor,
            $rooms: Report.rooms,
            $sqrMtr: Report.sqrMtr,
            $parking: Report.parking,
            $storage: Report.storage,
            $arnona: Report.arnona,
            $vaad: Report.vaad,
            $price: Report.price,
            $id: Report.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Report
     * returns database insertion status
     */
    create(Report) {
        let sqlRequest = "INSERT into report (username, password) " +
            "VALUES ($username, $password)";
        let sqlParams = {
            $username: Report.username,
            $password: Report.password,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Report
     * returns database insertion status
     */
    createWithId(Report) {
        let sqlRequest = "INSERT into owners (id, password) VALUES ($id, $password)";
        let sqlParams = {
            $id: Report.id,
            $username: Report.username,
            $password: Report.password,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM report WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM report WHERE id=$id";
        let sqlParams = { $id: id };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = ReportDao;
