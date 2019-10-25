/**
 * Resident Entity
 */

class Resident {
    constructor(id, contract_id, first_name, last_name, img, phone_number, email) {
        this.id = id;
        this.contract_id = contract_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.img = img;
        this.phone_number = phone_number;
        this.email = email;
    }
}

module.exports = Resident;
