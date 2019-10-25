/**
 * Contract Entity
 */

class Contract {
    constructor(id, apt_id, created_on, updated_on, end_at, file, cheques_valid_date, is_last_cheque_valid) {
        this.id = id;
        this.apt_id = apt_id;
        this.created_on = created_on;
        this.updated_on = updated_on;
        this.end_at = end_at;
        this.file = file;
        this.cheques_valid_date = cheques_valid_date;
        this.is_last_cheque_valid = is_last_cheque_valid;
    }
}

module.exports = Contract;
