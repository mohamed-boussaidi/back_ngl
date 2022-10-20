const Sousprojet = require("../../models/config/sousprojet");


const add = async(req,res,next) => {

    try {
            const data = await Sousprojet.create(req.body);
            res.status(200).json(data);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
const getAll =async (req, res, prev) => {
    try {
        const data = await Sousprojet.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById =async (req, res, prev) => {
    try {
        const data = await Sousprojet.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update =async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await Sousprojet.findByIdAndUpdate(
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
        const data = await Sousprojet.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAll,
    getById,
    Update,
    Delete,
    add
}