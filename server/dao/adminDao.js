/* Load Models */
const Owner = require('../model/owner');
const Apartment = require('../model/apartment');
const Contract = require('../model/contract');
const Resident = require('../model/resident');
const Report = require('../model/report');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');


let fs = require('fs-extra');


/**
 * Admin Data Access Object
 */
class AdminDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM owners";
        return this.common.findAll(sqlRequest).then(rows => {
            let apartments = [];

            for (const row of rows) {
                apartments.push(row);
            }
            return apartments;
        });
    };


    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findOwner(id) {
        let sqlRequest = "SELECT * FROM owners WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        let owner = {
            details: {},
            apartments: [],
            reports: []
        };
        return this.common.findOne(sqlRequest, sqlParams).then(row => {
            Object.assign(owner.details, new Owner(row.id, row.personal_id, '', row.first_name, row.last_name, row.address, row.phone_number, row.email));

            let sqlRequest = "SELECT * FROM apartments WHERE owner_id=$id";
            return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
                Object.assign(owner.apartments, rows);

                let sqlRequest = "SELECT * FROM reports WHERE owner_id=$id";
                return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
                    Object.assign(owner.reports, rows);

                    return owner;
                });
            }).catch(() => {
                let sqlRequest = "SELECT * FROM reports WHERE owner_id=$id";
                return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
                    Object.assign(owner.reports, rows);


                }).catch(() => {
                    return owner;
                });
            });
        });
    };


    /**
     * Finds all entities.
     * @return all entities
     */
    findAllApts() {
        let sqlRequest = "SELECT * FROM apartments";
        return this.common.findAll(sqlRequest).then(rows => {
            let apartments = [];
            for (const row of rows) {
                apartments.push(row);
            }
            return apartments;
        });
    };


    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findAptById(id) {
        let apt = {
            owner: {},
            apartment: {},
            contracts: [],
            residents: []
        };

        let sqlRequest = "SELECT * FROM owners WHERE id IN (SELECT owner_id FROM apartments WHERE id=$id)";
        let sqlParams = {
            $id: id
        };
        return this.common.findOne(sqlRequest, sqlParams).then(row => {
            Object.assign(apt.owner, new Owner(row.id, row.personal_id, row.first_name, row.last_name, row.address, row.phone_number, row.email));

            let sqlRequest = "SELECT * FROM apartments WHERE id=$id";
            return this.common.findOne(sqlRequest, sqlParams).then(row => {
                Object.assign(apt.apartment, new Apartment(row.id, row.owner_id, row.is_rented, row.address, row.img, row.value));

                let sqlRequest = "SELECT * FROM contracts WHERE apt_id=$id";
                return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
                    let contracts = [];
                    for (const row of rows) {
                        contracts.push(row);
                    }
                    Object.assign(apt.contracts, contracts);

                    let sqlRequest = "SELECT * FROM residents WHERE contract_id IN (SELECT id FROM contracts WHERE apt_id=$id)";
                    return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
                        let residents = [];
                        for (const row of rows) {
                            residents.push(row);
                        }
                        Object.assign(apt.residents, residents);
                        return apt;
                    });
                });
            });

        });
    };



    /**
     * Creates the given entity in the database
     * @params Owner
     * returns database insertion status
     */
    createOwner(Owner) {
        let sqlRequest = "INSERT into owners (id, personal_id, password, first_name, last_name, address, phone_number, email, is_admin) " +
            "VALUES ($id, $personal_id, $password, $first_name, $last_name, $address, $phone_number, $email, $is_admin)";
        let sqlParams = {
            $id: Owner.id,
            $personal_id: Owner.personal_id,
            $password: Owner.password,
            $first_name: Owner.first_name,
            $last_name: Owner.last_name,
            $address: Owner.address,
            $phone_number: Owner.phone_number,
            $email: Owner.email,
            $is_admin: 0
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Updates the given entity in the database
     * @params Owner
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateOwner(Owner) {
        let sqlRequest = "UPDATE owners SET " +
            "personal_id=$personal_id, " +
            "first_name=$first_name, " +
            "last_name=$last_name, " +
            "address=$address, " +
            "phone_number=$phone_number, " +
            "email=$email " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Owner.id,
            $personal_id: Owner.personal_id,
            $first_name: Owner.first_name,
            $last_name: Owner.last_name,
            $address: Owner.address,
            $phone_number: Owner.phone_number,
            $email: Owner.email,
        };

        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteOwner(id) {
        let sqlRequest = "DELETE FROM owners WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };


    /**
     * Apartment Data
     */


    /**
     * Creates the given entity in the database
     * @params Owner
     * returns database insertion status
     */
    createApartment(Apartment) {
        let sqlRequest = "INSERT into apartments (id, owner_id, is_rented, address, img, value) " +
            "VALUES ($id, $owner_id, $is_rented, $address, $img, $value)";
        let sqlParams = {
            $id: Apartment.id,
            $owner_id: Apartment.owner_id,
            $is_rented: Apartment.is_rented,
            $address: Apartment.address,
            $img: Apartment.img,
            $value: Apartment.value
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Updates the given entity in the database
     * @params Apartment
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateApartment(Apartment) {
        let sqlRequest = "UPDATE apartments SET " +
            "is_rented=$is_rented, " +
            "address=$address, " +
            "value=$value " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Apartment.id,
            $is_rented: Apartment.is_rented,
            $address: Apartment.address,
            $value: Apartment.value
        };

        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteApartment(id) {
        let sqlRequest = "DELETE FROM apartments WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };



    /**
     * Contract Data
     */

    /**
* Tries to find an entity using its Id / Primary Key
* @params id
* @return entity
*/
    findContractsByAptId(id) {
        let sqlRequest = "SELECT * FROM contracts WHERE apt_id = $id";
        let sqlParams = { $id: id };
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            return rows;
        });
    };

    /**
     * Creates the given entity in the database
     * @params Contract
     * returns database insertion status
     */
    createContract(Contract) {
        let sqlRequest = "INSERT into contracts (id, apt_id, created_at, updated_at, end_at, file, cheques_valid_date, is_last_cheque_valid) " +
            "VALUES ($id, $apt_id, $created_at, $updated_at, $end_at, $file, $cheques_valid_date, $is_last_cheque_valid)";
        let sqlParams = {
            $id: Contract.id,
            $apt_id: Contract.apt_id,
            $created_at: Contract.created_at,
            $updated_at: Contract.updated_at,
            $end_at: Contract.end_at,
            $file: Contract.file,
            $cheques_valid_date: Contract.cheques_valid_date,
            $is_last_cheque_valid: Contract.is_last_cheque_valid
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Updates the given entity in the database
     * @params Apartment
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateContract(Contract) {
        let sqlRequest = "UPDATE contracts SET " +
            "created_at=$created_at, " +
            "updated_at=$updated_at, " +
            "end_at=$end_at, " +
            "cheques_valid_date=$cheques_valid_date, " +
            "is_last_cheque_valid=$is_last_cheque_valid " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Contract.id,
            $created_at: Contract.created_at,
            $updated_at: Contract.updated_at,
            $end_at: Contract.end_at,
            $cheques_valid_date: Contract.cheques_valid_date,
            $is_last_cheque_valid: Contract.is_last_cheque_valid
        };

        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteContract(id) {
        let sqlRequest = "DELETE FROM contracts WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };



    /**
     * Residents Data
     */

    /**
* Tries to find an entity using its Id / Primary Key
* @params id
* @return entity
*/
    findResidentsByAptId(id) {
        let sqlRequest = "SELECT * FROM residents WHERE contract_id IN ( SELECT id FROM contracts WHERE apt_id = $id)";
        let sqlParams = {
            $id: id
        };
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            return rows;
        });

    };

    /**
     * Creates the given entity in the database
     * @params Contract
     * returns database insertion status
     */
    createResident(Resident) {
        let sqlRequest = "INSERT into residents (id, contract_id, first_name, last_name, img, phone_number, email) " +
            "VALUES ($id, $contract_id, $first_name, $last_name, $img, $phone_number, $email)";
        let sqlParams = {
            $id: Resident.id,
            $contract_id: Resident.contract_id,
            $first_name: Resident.first_name,
            $last_name: Resident.last_name,
            $img: Resident.img,
            $phone_number: Resident.phone_number,
            $email: Resident.email
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Updates the given entity in the database
     * @params Apartment
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateResident(Resident) {
        let sqlRequest = "UPDATE residents SET " +
            "first_name=$first_name, " +
            "last_name=$last_name, " +
            "phone_number=$phone_number, " +
            "email=$email " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Resident.id,
            $first_name: Resident.first_name,
            $last_name: Resident.last_name,
            $phone_number: Resident.phone_number,
            $email: Resident.email,
        };

        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteResident(id) {
        let sqlRequest = "DELETE FROM residents WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };


    /**
     * Reports Data
     */
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
     * Creates the given entity in the database
     * @params Contract
     * returns database insertion status
     */
    createReport(Report) {
        let sqlRequest = "INSERT into reports (id, owner_id, file, created_on, updated_on, is_read) " +
            "VALUES ($id, $owner_id, $file, $created_on, $updated_on, $is_read)";
        let sqlParams = {
            $id: Report.id,
            $owner_id: Report.owner_id,
            $file: Report.file,
            $created_on: Report.created_on,
            $updated_on: Report.updated_on,
            $is_read: Report.is_read
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Updates the given entity in the database
     * @params Apartment
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateReport(Report) {
        let sqlRequest = "UPDATE reports SET " +
            "created_on=$created_on, " +
            "updated_on=$updated_on, " +
            "is_read=$is_read " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Report.id,
            $created_on: Report.created_on,
            $updated_on: Report.updated_on,
            $is_read: Report.is_read
        };

        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteReport(id) {
        let sqlRequest = "DELETE FROM reports WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
 * Cheques Data
 */

    /**
   * Tries to find an entity using its Id / Primary Key
   * @params id
   * @return entity
   */
    findChequesByAptId(id) {
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
    findChequesByAptIdAndYear(id, year) {
        let sqlRequest = "SELECT strftime('%m', date) as month, MIN(valid) as valid FROM cheques WHERE resident_id IN(SELECT id FROM residents WHERE contract_id IN (SELECT id FROM contracts WHERE apt_id = $id)) AND strftime('%Y', date) = $year  GROUP BY strftime('%m', date)";
        let sqlParams = {
            $id: id,
            $year: year
        };
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            return rows;
        });
    };
    /**
     * Creates the given entity in the database
     * @params Contract
     * returns database insertion status
     */
    createCheque(Document) {
        let sqlRequest = "INSERT into cheques (id, resident_id, date, valid, file) " +
            "VALUES ($id, $resident_id, $date, $valid, $file)";
        let sqlParams = {
            $id: Document.id,
            $resident_id: Document.resident_id,
            $date: Document.date,
            $valid: Document.valid,
            $file: Document.file
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Updates the given entity in the database
     * @params Apartment
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateCheque(Document) {
        let sqlRequest = "UPDATE cheques SET " +
            "date=$date, " +
            "valid=$valid " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Document.id,
            $date: Document.date,
            $valid: Document.valid
        };

        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteCheque(id) {
        let sqlRequest = "DELETE FROM cheques WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
 * Documents Data
 */

    /**
    * Tries to find an entity using its Id / Primary Key
    * @params id
    * @return entity
    */
    findDocumentsByAptId(id) {
        let sqlRequest = "SELECT * FROM documents WHERE apt_id = $id";
        let sqlParams = {
            $id: id
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
    findDocumentsByAptIdAndCategory(id, category) {
        let sqlRequest = "SELECT * FROM documents WHERE apt_id = $id AND category = $category";
        let sqlParams = {
            $id: id,
            $category: category
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
    findDocumentsCategories(id) {
        let sqlRequest = "SELECT DISTINCT category FROM documents WHERE apt_id = $id";
        let sqlParams = {
            $id: id
        };
        return this.common.findQuery(sqlRequest, sqlParams).then(rows => {
            return rows;
        });

    };

    /**
     * Creates the given entity in the database
     * @params Contract
     * returns database insertion status
     */
    createDocument(Document) {
        let sqlRequest = "INSERT into documents (id, apt_id, name, date, category, file) " +
            "VALUES ($id, $apt_id, $name, $date, $category, $file)";
        let sqlParams = {
            $id: Document.id,
            $apt_id: Document.apt_id,
            $name: Document.name,
            $date: Document.date,
            $category: Document.category,
            $file: Document.file
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Updates the given entity in the database
     * @params Apartment
     * @return true if the entity has been updated, false if not found and not updated
     */
    updateDocument(Document) {
        let sqlRequest = "UPDATE documents SET " +
            "apt_id=$apt_id, " +
            "name=$name, " +
            "date=$date, " +
            "category=$category " +
            "WHERE id=$id";

        let sqlParams = {
            $id: Document.id,
            $apt_id: Document.apt_id,
            $date: Document.date,
            $category: Document.category
        };

        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteDocument(id) {
        let sqlRequest = "DELETE FROM documents WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };






    /**
     * Helpful functions
     */
    getOwnerbyApt(apt_id) {

        let sqlRequest = "SELECT owner_id FROM apartments WHERE id=$id";
        let sqlParams = {
            $id: apt_id
        };
        return this.common.findOne(sqlRequest, sqlParams).then().catch(err => console.log(err));
    };

    getOwnerAptByContract(contact_id) {
        let sqlRequest = "SELECT apt_id FROM contracts WHERE id=$id";
        let sqlParams = {
            $id: contact_id
        };
        let id = {};
        return this.common.findOne(sqlRequest, sqlParams).then((row) => {
            Object.assign(id, row);
            let sqlRequest = "SELECT owner_id FROM apartments WHERE id=$id";
            let sqlParams = {
                $id: row.apt_id
            };
            return this.common.findOne(sqlRequest, sqlParams).then((row) => {
                Object.assign(id, row);
                return id;
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    };

    getOwnerAptContractByResident(resident_id) {
        let sqlRequest = "SELECT contract_id FROM residents WHERE id=$id";
        let sqlParams = {
            $id: resident_id
        };
        let id = {};
        return this.common.findOne(sqlRequest, sqlParams).then((row) => {
            Object.assign(id, row);
            let sqlRequest = "SELECT apt_id FROM contracts WHERE id=$id";
            let sqlParams = {
                $id: row.contract_id
            };
            return this.common.findOne(sqlRequest, sqlParams).then((row) => {
                Object.assign(id, row);
                let sqlRequest = "SELECT owner_id FROM apartments WHERE id=$id";
                let sqlParams = {
                    $id: row.apt_id
                };
                return this.common.findOne(sqlRequest, sqlParams).then((row) => {
                    Object.assign(id, row);

                    return id;
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    };





















    /**
     * Tries to find an entity using its username / Primary Key
     * @params username
     * @return entity
     */
    findByUserName(username) {
        let sqlRequest = "SELECT * FROM owner WHERE username=$username";
        let sqlParams = {
            $username: username
        };

        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Owner(row.id, row.username, row.password, row.first_name, row.last_name, row.address, row.phone_number, row.email, row.is_admin));
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
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM owner WHERE id=$id";
        let sqlParams = {
            $id: id
        };
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = AdminDao;