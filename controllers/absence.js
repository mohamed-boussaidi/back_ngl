const Absence = require("../models/absence");
const Personnel = require("../models/personnel");
const Tour = require("../models/config/tour");
const moment =require("../instance/momentInstance");

const ObjectId = require('mongodb').ObjectID;

const add = async(req,res,next) => {

    try {
        const { data } = req.body;
        if (!(data)) {
            res.status(400).send("All input is required");
        }else{
            data.map(async (item, index) => {
                if(item.status!=="permutation"){
                    await Absence.create(item).catch(console.error)
                }
            })
            res.status(200).json(data);
        }

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
const getAll =async (req, res, prev) => {
    try {
        const data = await Absence.find().populate({path:"personal",
            populate:{path:"tour fonction"}})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById =async (req, res, prev) => {
    try {
        const data = await Absence.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update =async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await Absence.findByIdAndUpdate(
            id, updatedData
        )
        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const Delete =async (req, res, prev) => {
    try {
        const id = req.params.id;
        const data = await Absence.findByIdAndDelete(id)
        res.send(`Document with ${data.code} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getAbsenceByPersonalMatricule =async (req, res, prev) => {
    try {
        const { matricule } = req.body;
        const personel =  await Personnel.findOne({matricule:matricule,active:true})
        const absence =  await Absence.findOne(
            {
                personal:personel._id,
                start_date:
                    {$lte :new Date()},
                end_date:
                    {$gte:new Date()}}).populate("personal");
        res.send(absence)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getAbsenceByTime =async (req, res, prev) => {
    try {
        const absence =  await Absence.find(
            {
                start_date:
                    {$lte: new Date()},
                end_date:
                    {$gte: new Date()},
            }
        ).populate({path:"personal",
            populate:{path:"tour fonction"}})
        res.send(absence)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getAbsenceByTour =async (req, res, prev) => {
    try {
        const { tour } = req.body;
        const tourData=await Tour.findOne({responsable:tour})
        const personel =  await Personnel.find({tour:tourData._id}).select("_id")
        var arraypersonel=[]
        personel.map((item,index)=>{
            arraypersonel.push(item._id)
        })
        const absence =  await Absence.find(
            {
                personal: {$in: arraypersonel},
    }
    ).populate({path:"personal",
            populate:{path:"tour fonction"}})
        res.send(absence)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getAbsenceBytimeAndTour =async (req, res, prev) => {
    try {
        const { tour } = req.body;
        const tourData=await Tour.findOne({responsable:tour})
        const personel =  await Personnel.find({tour:tourData._id}).select("_id")
        var arraypersonel=[]
        personel.map((item,index)=>{
            arraypersonel.push(item._id)
        })
        const absence =  await Absence.find(
            {
                personal: {$in: arraypersonel},
                start_date:
                    {$lte: new Date()},
                end_date:
                    {$gte: new Date()},
    }
    ).populate({path:"personal",
            populate:{path:"tour fonction"}})

        res.send(absence)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const VerifyPersonalHaveAbsence=async (req,res,prev)=>{
    try {
        const matricule = req.params.matricule;

        const start_date=moment().startOf("day")

        var personal =  await Personnel.findOne({matricule:matricule,active:true}).populate("poste tour fonction")
        if(personal){
            const absence =  await Absence.findOne(
                {
                    personal: new ObjectId(personal._id),
                    start_date : {
                        $gte: start_date.toDate(),
                        $lt: moment(start_date).endOf("day").toDate()
                    },
                }
            )
            if(absence){
                res.send({absence:true})
            }else {
                res.send({absence:false,personal:personal})
            }
        }else {
            res.status(404).json({message: "No Personal available with this Matricule"})
        }

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const FilterAbsence =async (req, res, prev) => {
    try {
        const { tour ,fonction,start_date } = req.body;
        var tourData=null
        if(tour){
            tourData=await Tour.findOne({responsable:tour})
        }
        const filterpersonel=tourData?fonction?{tour:tourData,fonction:fonction}:{tour:tourData}:{}
        var personel =  await Personnel.find(filterpersonel).select("_id")
        var arraypersonel=[]
        if(personel){
            personel.map((item,index)=>{
                arraypersonel.push(item._id)
            })
        }
            const absence =  await Absence.find(
                {
                    personal: {$in: arraypersonel},
                    start_date:{$lte: start_date?start_date:new Date()},
                }

        ).populate({path:"personal",
            populate:{path:"tour fonction"}})
            res.send(absence)

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getById,
    Update,
    Delete,
    add,
    getAbsenceByPersonalMatricule,
    getAbsenceByTour,
    getAbsenceBytimeAndTour,
    getAbsenceByTime,
    FilterAbsence,
    VerifyPersonalHaveAbsence
}