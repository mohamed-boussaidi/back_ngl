const Cycle = require("../models/config/cycle");
const Sousprojet = require("../models/config/sousprojet");
const Article = require("../models/article");
const csv = require('@fast-csv/parse');
const fs = require('fs');

const add = async(req,res,next) => {

    try {

            const data = await Article.create(req.body);
            res.status(200).json(data);
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const addWithFile = async(req,res,next) => {

    try {
        const cycle1015 = await Cycle.findOne({code:"010|015"})
        const cycle20 = await Cycle.findOne({code:"020"})
        const cycle25 = await Cycle.findOne({code:"025"})
        const cycle30l = await Cycle.findOne({code:"030L"})
        const cycle30c = await Cycle.findOne({code:"030C"})
        const cycleProd = await Cycle.findOne({code:"PROD"})
        const sousProjets = await Sousprojet.find()
            fs.createReadStream(req.file.path)
                .pipe(csv.parse({ headers: true }))
                .on('error', error => console.error(error))
                .on('data',  async function (data) {
                        const articleExist=await Article.findOne({code:data.code})
                    if(articleExist){

                    }else{
                        const sousprojet = sousProjets.find(element => element.name === data.sousprojet);
                        const cycle=[]
                        if(data.cycle1015==="1"){
                            cycle.push(cycle1015._id)
                        }
                        if(data.cycle20==="1"){
                            cycle.push(cycle20._id)
                        }
                        if(data.cycle25==="1"){
                            cycle.push(cycle25._id)
                        }
                        if(data.cycle30l==="1"){
                            cycle.push(cycle30l._id)
                        }
                        if(data.cycle30c==="1"){
                            cycle.push(cycle30c._id)
                        }
                        if(data.prod==="1"){
                            cycle.push(cycleProd._id)
                        }
                        try {
                            const datainsert = await Article.create({
                                code:data.code, description:data.description, nbr_fils:data.nbrfils, sous_projet:sousprojet ,cycle:cycle
                            });
                        }catch (e) {
                            res.status(400).json({message: e.message})
                        }
                    }

                    }
                )
                .on('end', rowCount => res.status(200).json("Upload succesfully"));

        }catch (e) {
            res.status(400).json({message: e.message})
        }





}
const getAll =async (req, res, prev) => {
    try {
        const data = await Article.find().populate({path:"cycle"}).populate({path:"sous_projet",
            populate:{path:"projet"}})

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById =async (req, res, prev) => {
    try {
        const data = await Article.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update =async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await Article.findByIdAndUpdate(
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
        const data = await Article.findByIdAndDelete(id)
        res.send(`Document with ${data.code} has been deleted..`)
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
    addWithFile
}