/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./apts.db');

/* Init car and driver tables if they don't exist */
let init = function () {

    /**
    db.run("CREATE TABLE if not exists apt (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " city TEXT, " +
        " description TEXT," +
        " address TEXT," +
        " floor INT," +
        " rooms REAL," +
        " sqrMtr REAL," +
        " parking INT," +
        " storage INT," +
        " arnona INT," +
        " vaad INT," +
        " price INT" +
        ")");

    db.run("CREATE TABLE if not exists user (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " username TEXT UNIQUE, " +
        " password TEXT" +
        ")");
    */
   
    db.run("CREATE TABLE if not exists owners (" +
        "id STRING PRIMARY KEY," +
        "personal_id INTEGER UNIQUE," +
        "password STRING," +
        "first_name STRING," +
        "last_name STRING," +
        "address STRING," +
        "phone_number STRING," +
        "email STRING," +
        "is_admin BOOLEAN" +
        ");");

        db.run("CREATE TABLE if not exists apartments (" +
        "id STRING PRIMARY KEY," +
        "owner_id STRING," +
        "is_rented BOOLEAN," +
        "address STRING," +
        "img STRING," +
        "value INTEGER" +
        ");");

        db.run("CREATE TABLE if not exists contracts (" +
        "id STRING PRIMARY KEY," +
        "apt_id STRING," +
        "created_at date," +
        "updated_at date," +
        "end_at date," +
        "file STRING," +
        "cheques_valid_date INTEGER," +
        "is_last_cheque_valid BOOLEAN" +
        ");" );

        db.run(" CREATE TABLE if not exists residents (" +
        "id STRING PRIMARY KEY," +
        "contract_id STRING," +
        "first_name STRING," +
        "last_name STRING," +
        "img STRING," +
        "phone_number STRING," +
        "email STRING" +
        ");");

        db.run("CREATE TABLE if not exists reports (" +
        "id STRING PRIMARY KEY," +
        "owner_id STRING," +
        "file STRING," +
        "created_on date," +
        "updated_on date," +
        "is_read BOOLEAN" +
        ");");

        db.run("CREATE TABLE if not exists cheques (" +
        "id STRING PRIMARY KEY," +
        "resident_id STRING," +
        "date DATE," +
        "valid BOOLEAN," +
        "file STRING" +
        ");");

        db.run("CREATE TABLE if not exists documents (" +
        "id STRING PRIMARY KEY," +
        "apt_id STRING," +
        "name STRING," +
        "date DATE," +
        "category STRING," +
        "file STRING" +
        ");");

    
};

module.exports = {
    init: init,
    db: db
};


