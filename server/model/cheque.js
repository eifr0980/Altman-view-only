/**
 * Cheque Entity
 */

class Cheque {
    constructor(id, resident_id, date, valid, file) {
        this.id = id;
        this.resident_id = resident_id;
        this.date = date;
        this.valid = valid;
        this.file = file;
    }
}

module.exports = Cheque;
