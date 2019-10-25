/**
 * Documents Entity
 */

class Documents {
    constructor(id, apt_id, name, date, category, file) {
        this.id = id;
        this.apt_id = apt_id;
        this.name = name;
        this.date = date;
        this.category = category;
        this.file = file;
    }
}

module.exports = Documents;
