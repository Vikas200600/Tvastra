const Slot = require('./../models/SlotModel');

let createSchedule = async (req, res) => {
    let {slotStartTime, slotEndTime, interval, hospital, days } = req.body;
    console.log(req.body);
    let newSlot =  new Slot({
        slotStartTime: slotStartTime,
        slotEndTime: slotEndTime,
        interval: interval,
        hospital: hospital,
        days: days
    });
    let slotSaved = await newSlot.save();
    if(slotSaved) {
        console.log("Slot Saved Successfully.");
        res.send("Slot Saved Successfully.");
    } else {
        res.send(slotSaved);
    }
}


module.exports = {
    createSchedule: createSchedule
}