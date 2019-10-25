/**
 * Reports Entity
 */

class Reports {
    constructor(id, owner_id, file, created_on, updated_on, is_read) {
        this.id = id;
        this.owner_id = owner_id;
        this.file = file;
        this.created_on = created_on;
        this.updated_on = updated_on;
        this.is_read = is_read;
    }
}

module.exports = Reports;
