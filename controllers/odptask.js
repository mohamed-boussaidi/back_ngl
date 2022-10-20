const Odptask = require("../models/odptask");
const Odp = require("../models/odp");
const Personnel = require("../models/personnel");
const Cycleinstance = require("../models/cycleinstance");
const moment =require("../instance/momentInstance");
const Cycle = require("../models/config/cycle");


const add = async (req, res, next) => {
    try {
        const alldata = await Odptask.find();
        var reqdata=req.body
        var allCreated=true
        var resultCycleinstance = await Cycleinstance.findById(reqdata.odp.cycleInstance._id)

        resultCycleinstance.data.map((item,index)=>{
            if(item.status!=="CREATED"){
                allCreated=false
            }
        })
        if(allCreated){
            await Odp.findByIdAndUpdate(
                reqdata.odp._id,{status:"INPROGRESS"}
        )

        }
        resultCycleinstance.data.map((item,index)=>{
            if(item.cycle.equals(reqdata.cycle)){
                item.status="INPROGRESS"
                item.start_date=moment().format('YYYY-MM-DD[T]HH:mm:ss')

            }
        })
        await Cycleinstance.findByIdAndUpdate(
            resultCycleinstance._id,resultCycleinstance)
        const date=moment().format('DD-MM-YY');

        reqdata.code=date+"-"+(alldata.length+1)
        reqdata.start_date=moment().format('YYYY-MM-DD[T]HH:mm:ss')
        const data = await Odptask.create(reqdata);
            res.status(200).json(data);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
const getAll = async (req, res, prev) => {
    try {
        const data = await Odptask.find({}).populate("personnel").populate({
            path: "odp",
            populate: {
                path: "article", populate: {path: "sous_projet", populate: {path: "projet"}}
            }
        }).populate("cycle")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById = async (req, res, prev) => {
    try {
        const data = await Odptask.findById(req.params.id).populate("personnel").populate("odp");
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getOdpTaskByPersonnelMatriculeOpened = async (req, res, prev) => {
    try {
        const matricule = req.params.matricule;
        const personal = await Personnel.findOne({matricule:matricule});
        const data = await Odptask.findOne({"personnel":personal._id,'status': {$ne : "CLOSED"}}).populate("personnel").populate("cycle").populate({path:"odp",populate:{path:"article"}});
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getOdpTaskByPersonnelMatricule = async (req, res, prev) => {
    try {
        const matricule = req.params.matricule;
        const personal = await Personnel.findOne({matricule:matricule});
        const data = await Odptask.find({"personnel":personal._id}).populate("personnel").populate("cycle").populate({path:"odp",populate:{path:"article"}});
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update = async (req, res, prev) => {
    try {
        const id = req.params.id;
        var updatedData = req.body;
        updatedData.end_date=moment().format('YYYY-MM-DD[T]HH:mm:ss')
        const result = await Odptask.findByIdAndUpdate(
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
        const data = await Odptask.findByIdAndDelete(id)
        res.send(`Document with ${data.code} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getOdpTasksOpened = async (req, res, prev) => {
    try {
        const start_date=moment().startOf("day")
        const data = await Odptask.find({
                status: {$ne : "CLOSED"},
                start_date:{
                $gte: start_date.toDate(),
                $lt: moment(start_date).endOf("day").toDate()
            }}).populate("personnel").populate("cycle").populate({path:"odp",populate:{path:"article"}});
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
    getOdpTaskByPersonnelMatricule,
    getOdpTaskByPersonnelMatriculeOpened,
    getOdpTasksOpened
}