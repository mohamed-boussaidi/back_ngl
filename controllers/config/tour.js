const Tour = require("../../models/config/tour");
const ObjectId = require('mongodb').ObjectID;


const add = async(req,res,next) => {

    try {
            const data = await Tour.create(req.body);
            res.status(200).json(data);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
const getAll =async (req, res, prev) => {
    try {
        const data = await Tour.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById =async (req, res, prev) => {
    try {
        const data = await Tour.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update =async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await Tour.findByIdAndUpdate(
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
        const data = await Tour.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getByResponsableId =async (req, res, prev) => {
    try {
        const data = await Tour.findOne({responsable:new ObjectId(req.params.id)});
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
    getByResponsableId
}