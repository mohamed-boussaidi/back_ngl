const Activitytask = require("../models/activitytask");
const Personnel = require("../models/personnel");
const moment =require("../instance/momentInstance");


const add = async (req, res, next) => {
    try {
        const alldata = await Activitytask.find();
        var reqdata=req.body
        const date=moment().format('DD-MM-YY');
        reqdata.start_date=moment().format('YYYY-MM-DD[T]HH:mm:ss')
        reqdata.code=date+"-"+(alldata.length+1)
            const data = await Activitytask.create(req.body);
            res.status(200).json(data);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
const getAll = async (req, res, prev) => {
    try {
        const data = await Activitytask.find({}).populate("personnel").populate("activity");
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById = async (req, res, prev) => {
    try {
        const data = await Activitytask.findById(req.params.id).populate("personnel");
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getActicityTasksByPersonnelMatriculeOpened = async (req, res, prev) => {
    try {
        const matricule = req.params.matricule;
        const personal = await Personnel.findOne({matricule:matricule});
        const data = await Activitytask.findOne({"personnel":personal._id,'status': {$ne : "CLOSED"}}).populate("personnel").populate("activity");
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getActicityTasksByPersonnelMatricule = async (req, res, prev) => {
    try {
        const matricule = req.params.matricule;
        const personal = await Personnel.findOne({matricule:matricule});
        const data = await Activitytask.find({"personnel":personal._id}).populate("personnel");
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update = async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        updatedData.end_date=moment().format('YYYY-MM-DD[T]HH:mm:ss')

        const result = await Activitytask.findByIdAndUpdate(
            id, updatedData
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const Delete = async (req, res, prev) => {
    try {
        const id = req.params.id;
        const data = await Activitytask.findByIdAndDelete(id)
        res.send(`Document with ${data.code} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getActivityTasksOpened = async (req, res, prev) => {
    try {
        const start_date=moment().startOf("day")
        const data = await Activitytask.find({
            status: {$ne : "CLOSED"},
            start_date:{
                $gte: start_date.toDate(),
                $lt: moment(start_date).endOf("day").toDate()
            }}).populate("personnel").populate({path: "activity",populate: {path: "classe"}})
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = {
    getAll,
    getById,
    Update,
    Delete,
    add,
    getActicityTasksByPersonnelMatricule,
    getActicityTasksByPersonnelMatriculeOpened,
    getActivityTasksOpened
}