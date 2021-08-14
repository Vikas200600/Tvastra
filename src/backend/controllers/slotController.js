const Slot = require('./../models/SlotModel');

let createSchedule = async (req, res) => {
    console.log("called");
    let newSlot =  new Slot({
        slotStartTime: req.body.slotStartTime,
        slotEndTime: req.body.slotEndTime,
        interval: req.body.interval,
        doctorId: req.session.userId,
        hospital: req.body.hospital,
        days: req.body.days
    });
    let pastSchedules = await Slot.find({doctorId : req.session.userId}).select('-__v -_id -interval -hospital');
    let validated = await validateSlots(pastSchedules, newSlot);
    if(!validated){
            req.flash("fail","Failure");
            req.flash("msg","Unable To Add");
            return res.redirect('/add-schedule');
    } else {
        let slotSaved = await newSlot.save();
        req.flash("head","Success");
        req.flash("msg","Schedule Added");
        return res.redirect('/add-schedule');
    }
}

let validateSlots = async (pastSchedules,newSchedule) => {
    let flag = 1;
    pastSchedules.forEach((schedule) => {
        schedule.days.forEach((weekday => {
            newSchedule.days.forEach((newWeekday) => {
                if(weekday == newWeekday) {
                    let pastStart = ( parseInt(schedule.slotStartTime.split(':')[0]) * 60 ) + parseInt(schedule.slotStartTime.split(':')[1]);
                    let pastEnd = ( parseInt(schedule.slotEndTime.split(':')[0]) * 60 ) + parseInt(schedule.slotEndTime.split(':')[1]);
                    let newStart = ( parseInt(newSchedule.slotStartTime.split(':')[0]) * 60 ) + parseInt(newSchedule.slotStartTime.split(':')[1]);
                    let newEnd = ( parseInt(newSchedule.slotEndTime.split(':')[0]) * 60 ) + parseInt(newSchedule.slotEndTime.split(':')[1]);
                    console.log(`${pastStart} - ${pastEnd} - ${newStart}  - ${newEnd}`);
                    if(newStart > pastStart && newStart < pastEnd ){
                        console.log("fun dup");
                        flag = 0;
                    } else if(newEnd > pastStart && newEnd < pastEnd){
                        console.log("fun dup");
                        flag = 0;
                    }
                }
            })
        }))        
    })
    console.log("fun valid");
    return flag;
}


module.exports = {
    createSchedule: createSchedule
}