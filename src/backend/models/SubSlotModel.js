const mongoose = require('mongoose');

let subSlotSchema = mongoose.Schema({
    startTime : {
        type: String
    },
    endTime : {
        type: String
    },
    isBooked : {
        type: Boolean,
        default: false
    },
    isReserved : {
        type: Boolean,
        default: false
    },
});

let SubSlot = mongoose.model('subslot',subSlotSchema);

module.exports = {
    subSlotSchema : subSlotSchema,
    SubSlot: SubSlot
}