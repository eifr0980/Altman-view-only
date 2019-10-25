/**
 * Owner Entity
 */

class Owner {
    constructor(id, personal_id, password, first_name, last_name, address, phone_number, email, is_admin) {
        this.id = id;
        this.personal_id = personal_id;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.address = address;
        this.phone_number = phone_number;
        this.email = email;

    }
}

module.exports =  Owner;
