const CronJob = require("node-cron");
const Tour = require("../models/config/tour");


/**------------------------------------ cron job every sunday -----------------------------------------**/
exports.initScheduledJobs = () => {
    const scheduledJobFunction = CronJob.schedule("5 8 * * 0", async () => {
        var data = await Tour.find({responsable: { $ne: null }})

        const tour1={
            _id: data[0]._id,
            name: data[0].name,
            start_date: data[1].start_date,
            end_date: data[1].end_date,
            start_break: data[1].start_break,
            end_break: data[1].end_break,
            responsable: data[0].responsable
            }

        const tour2={
                _id: data[1]._id,
                name: data[1].name,
                start_date: data[0].start_date,
                end_date: data[0].end_date,
                start_break: data[0].start_break,
                end_break: data[0].end_break,
                responsable: data[1].responsable
            }

        await Tour.findByIdAndUpdate(tour1._id,tour1)
        await Tour.findByIdAndUpdate(tour2._id,tour2)

        console.log("Permutation Terminé")

    });

    scheduledJobFunction.start();
}