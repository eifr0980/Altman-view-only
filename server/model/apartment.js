/**
 * Apartment Entity
 */

class Apartment {
    constructor(id, owner_id, is_rented, address, img, value) {
        this.id = id;
        this.owner_id = owner_id;
        this.is_rented = is_rented;
        this.address = address;
        this.img = img;
        this.value = value;
    }
}

module.exports = Apartment;
