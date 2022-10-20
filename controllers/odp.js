const Odp = require("../models/odp");
const Article = require("../models/article");
const Cycleinstance = require("../models/cycleinstance");
const csv = require('@fast-csv/parse');
const fs = require('fs');
const moment =require("../instance/momentInstance");

const add = async (req, res, next) => {

    try {
        const {code, quantite, status, priorite, comment, article} = req.body;
        if (!(code && quantite && priorite && article)) {
            res.status(400).send("All input is required");
        } else {
            const articleData = await Article.findById(article).populate("cycle")

            const arraydatacyle = []
            articleData.cycle.map((item, index) => {
                arraydatacyle.push({cycle: item._id, status: "CREATED"})
            })

            const instanceCreated = await Cycleinstance.create({data: arraydatacyle})

            const data = await Odp.create({
                code, quantite, status, priorite, comment, article, cycleInstance: instanceCreated._id,createdAt:moment().format('YYYY-MM-DD[T]HH:mm:ss')
            });
            res.status(200).json(data);
        }

    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
const addWithFile = async (req, res, next) => {
    try {
        const articles = await Article.find()

        fs.createReadStream(req.file.path)
            .pipe(csv.parse({headers: true}))
            .on('error', error => console.error(error))
            .on('data',
                async function (data) {
                    const odpExist=await Odp.findOne({code:data.code})
                    if(odpExist){

                    }else{
                    const article = articles.find(element => element.code === data.article);
                    if(article){
                        const arraydatacyle = []
                        article.cycle.forEach((item, index) => {
                            arraydatacyle.push({cycle: item, status: "CREATED"})
                        })
                        const instanceCreated = await Cycleinstance.create({data: arraydatacyle})
                        try {
                            const datainsert = await Odp.create({
                                code: data.code,
                                article: article._id,
                                quantite: parseInt(data.quantite),
                                status: "CREATED",
                                comment: "ee",
                                createdAt:moment().format('YYYY-MM-DD[T]HH:mm:ss'),
                                priorite: 0,
                                cycleInstance: instanceCreated._id
                            });
                        } catch (e) {
                            res.status(400).json({message: e.message})
                        }
                    }

                      }

                })
            .on('end', rowCount => res.status(200).json("Upload succesfully")
            );


    } catch (err) {
        res.status(400).json({message: err.message})
    }
}
const getAll = async (req, res, prev) => {
    try {
        const data = await Odp.find().populate({
            path: "article",
            populate: {
                path: "sous_projet", populate: {path: "projet"}
            }
        }).populate({
            path: "article",
            populate: {path: "cycle"}
        }).populate({
            path: "cycleInstance",
            populate: {path: "data.cycle"}
        });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getAllNotDeleted = async (req, res, prev) => {
    try {
        const data = await Odp.find({is_deleted :{$ne :true}}).populate({
            path: "article",
            populate: {
                path: "sous_projet", populate: {path: "projet"}
            }
        }).populate({
            path: "article",
            populate: {path: "cycle"}
        }).populate({
            path: "cycleInstance",
            populate: {path: "data.cycle"}
        });
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById = async (req, res, prev) => {
    try {
        const data = await Odp.findById(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update = async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await Odp.findByIdAndUpdate(
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
        const result = await Odp.findByIdAndUpdate(id,
            {
                is_deleted: true
            }
        )
        if (result){
            res.send(`has been deleted..`)
        }else {
            res.status(400).json("error delete")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getOdpByCode = async (req, res, prev) => {
    try {
        const code = req.params.code;
        const data = await Odp.findOne({code:code,is_deleted :{$ne :true}}).populate({
            path: "article",
            populate: {
                path: "sous_projet", populate: {path: "projet"}
            }
        }).populate({
            path: "article",
            populate: {path: "cycle"}
        }).populate({
            path: "cycleInstance",
            populate: {path: "data.cycle"}
        });

        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const UpdatecycleInstance = async (req, res, prev) => {
    try {
        const id = req.params.id;
        const {cycle,status,odp,createdAt} = req.body;

        var result = await Cycleinstance.findById(id).populate("data.cycle")
        result.data.map((item,index)=>{
            if(item.cycle._id.equals(cycle)){
                item.status=status
                item.end_date=moment().format('YYYY-MM-DD[T]HH:mm:ss')
            }
        })
        var cyclesisdone=true
        var prodisdone=false
        result.data.map((item,index)=>{
            if(item.cycle.code!=="PROD"){
                if(item.status!=="DONE"){
                    cyclesisdone=false
                }
            }else {
                if (item.status === "DONE") {
                    prodisdone=true
                }
            }
        })
        if(cyclesisdone){
            await Odp.findByIdAndUpdate(
                odp,{status:"DONE",traited_at:createdAt})
        }
        if(prodisdone){
            await Odp.findByIdAndUpdate(
                odp,{status:"PROD",traited_at:createdAt})
        }
        if(status!=="DONE"){
            await Odp.findByIdAndUpdate(
                odp,{status:status,traited_at:createdAt})
        }
        const data = await Cycleinstance.findByIdAndUpdate(
            id,result)
        res.send(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getAllcycleInstanceToday = async (req, res, prev) => {
    try {
        const start_date=moment().startOf("day")

        var result = await Cycleinstance.find({
                data :{
                    $elemMatch : {start_date : {
                            $gte: start_date.toDate(),
                            $lt: moment(start_date).endOf("day").toDate()
                        }}
                }
        }).populate("data.cycle").select({data :{
                $elemMatch : {start_date : {
                        $gte: start_date.toDate(),
                        $lt: moment(start_date).endOf("day").toDate()
                    }}
            }})

        res.send(result)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getAllcycleInstance = async (req, res, prev) => {
    try {

        var result = await Cycleinstance.find({}).populate("data.cycle").select("data")

        res.send(result)
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
    addWithFile,
    getOdpByCode,
    UpdatecycleInstance,
    getAllcycleInstanceToday,
    getAllcycleInstance,
    getAllNotDeleted
}