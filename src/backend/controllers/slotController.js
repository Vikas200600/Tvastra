const Slot = require('./../models/SlotModel');

let createSchedule = async (req, res) => {
    let newScheduleDays = [];
    if(typeof req.body.days == "string") {
        newScheduleDays.push(req.body.days);
    } else {
        newScheduleDays = req.body.days;
    }
    newScheduleDays.forEach(async (weekDay) => {
        let newSchedule = new Slot({
            slotStartTime: req.body.slotStartTime,
            slotEndTime: req.body.slotEndTime,
            interval: req.body.interval,
            doctorId: req.session.userId,
            hospital: req.body.hospital,
            day: weekDay
        });
        let validated = await validateSlots(newSchedule);
        console.log(validated);
        if(!validated){
            req.flash("fail","Failure");
            req.flash("msg","Unable To Add");
            return res.redirect('/add-schedule');
        } else {
            let slotSaved = await newSchedule.save();
            req.flash("head","Success");
            req.flash("msg","Schedule Added");
            return res.redirect('/add-schedule');
        }
    })
}

let validateSlots = async (newSchedule) => {
    let flag = 1;
    let pastSchedules = await Slot.find({
        "day": newSchedule.day,
        "doctorId": newSchedule.doctorId
    });
    pastSchedules.forEach((schedule) => {
        let pastStart = ( parseInt(schedule.slotStartTime.split(':')[0]) * 60 ) + parseInt(schedule.slotStartTime.split(':')[1]);
        let pastEnd = ( parseInt(schedule.slotEndTime.split(':')[0]) * 60 ) + parseInt(schedule.slotEndTime.split(':')[1]);
        let newStart = ( parseInt(newSchedule.slotStartTime.split(':')[0]) * 60 ) + parseInt(newSchedule.slotStartTime.split(':')[1]);
        let newEnd = ( parseInt(newSchedule.slotEndTime.split(':')[0]) * 60 ) + parseInt(newSchedule.slotEndTime.split(':')[1]);
        if(newStart >= pastStart && newStart < pastEnd ){
            flag = 0;
        } else if(newEnd > pastStart && newEnd <= pastEnd){
            flag = 0;
        }        
    })
    return flag;
}


module.exports = {
    createSchedule: createSchedule
}