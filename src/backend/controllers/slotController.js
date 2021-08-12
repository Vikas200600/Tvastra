const Slot = require('./../models/SlotModel');

let createSchedule = async (req, res) => {
    let newSlot =  new Slot({
        slotStartTime: req.body.slotStartTime,
        slotEndTime: req.body.slotEndTime,
        interval: req.body.interval,
        doctorId: req.session.userId,
        hospital: req.body.hospital,
        days: req.body.days
    });
    let slotSaved = await newSlot.save();
    if(slotSaved) {
        req.flash("head","Success");
        req.flash("msg","Schedule Added");
        return res.redirect('/add-schedule');
    } else {
        req.flash("fail","Failure");
        req.flash("msg","Unable To Add");
        return res.redirect('/add-schedule');
    }
}


module.exports = {
    createSchedule: createSchedule
}