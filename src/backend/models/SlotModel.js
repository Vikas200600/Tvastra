const mongoose = require('mongoose');

const subSlotSchema = require('./SubSlotModel').subSlotSchema;
const SubSlot = require('./SubSlotModel').SubSlot;

let slotSchema = mongoose.Schema({
    days: {
        type: [String],
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    slotStartTime: {
        type: String,
    },
    slotEndTime: {
        type: String,
    },
    interval: {
        type: Number
    },
    doctorId: {
        type: mongoose.ObjectId,
        ref: 'Doctor'
    },
    hospital: {
        type: String
    },
    holiday: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    subSlots: [subSlotSchema],
}, { timestamps: true });


slotSchema.pre('save', async function(next) {
    let startTime = new Date();
    let endTime = new Date();
    let duration = parseInt(this.interval) * 60 * 1000;

    startTime.setHours(parseInt(this.slotStartTime.split(':')[0]));
    startTime.setMinutes(parseInt(this.slotStartTime.split(':')[1]));
    startTime.setSeconds(0);
    endTime.setHours(parseInt(this.slotEndTime.split(':')[0]));
    endTime.setMinutes(parseInt(this.slotEndTime.split(':')[1]));
    endTime.setSeconds(0);

    let slotStartTimeInms = startTime.getTime();
    let slotEndTimeInms = startTime.getTime() + duration;

    while (slotStartTimeInms < endTime.getTime()) {
        let slotStartTime = new Date(slotStartTimeInms);
        let slotEndTime = new Date(slotEndTimeInms);
        let newSubSlot = new SubSlot({
            startTime: `${slotStartTime.toLocaleTimeString().split(':')[0]}:${slotStartTime.toLocaleTimeString().split(':')[1]} ${slotStartTime.toLocaleTimeString().split(' ')[1]}`,
            endTime: `${slotEndTime.toLocaleTimeString().split(':')[0]}:${slotEndTime.toLocaleTimeString().split(':')[1]} ${slotEndTime.toLocaleTimeString().split(' ')[1]}`,
        });
        let slot = await newSubSlot.save();
        this.subSlots.push(slot);
        slotStartTimeInms = slotEndTimeInms;
        slotEndTimeInms = slotStartTimeInms + duration;
    }
    next();
})

module.exports = mongoose.model('slot', slotSchema);