const Activite = require("../models/activite");


const add = async(req,res,next) => {

    try {
            const data = await Activite.create(req.body);
            res.status(200).json(data);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
const getAll =async (req, res, prev) => {
    try {
        const data = await Activite.find().populate("classe")
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById =async (req, res, prev) => {
    try {
        const data = await Activite.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update =async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await Activite.findByIdAndUpdate(
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
        const data = await Activite.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getActiviteByCode = async (req, res, prev) => {
    try {
        const code = req.params.code;
        const data = await Activite.findOne({code:code});
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
    getActiviteByCode
}