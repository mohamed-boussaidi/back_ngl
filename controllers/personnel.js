const Personnel = require("../models/personnel");
const Tour = require("../models/config/tour");
const Absence = require("../models/absence");
const moment = require("../instance/momentInstance");
const ObjectId = require('mongodb').ObjectID;

const add = async (req, res, prev) => {
    try {
        const user = await Personnel.create(req.body);
        res.status(200).json("new Personal Successfully Added");

    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const getAll = async (req, res, prev) => {
    try {
        const data = await Personnel.find({active: true});
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getById = async (req, res, prev) => {
    try {
        const data = await Personnel.find(req.params.id);
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const Update = async (req, res, prev) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;

        const result = await Personnel.findByIdAndUpdate(
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
        const data = await Personnel.findByIdAndUpdate(id, {
            active: false
        })
        res.send(`Document with ${data.first_name + " " + data.last_name} has been deleted..`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getAllPersonalsByResponsable = async (req, res, prev) => {
    try {
        const responsable = req.params.responsable;

        const datatour = await Tour.aggregate([{
            $project: {
                responsable: 1,
                start_date_o: {$hour: "$start_date"},
                end_date_o: {$hour: "$end_date"}
            }
        },
            {
                $match: {
                    $or: [{responsable: new ObjectId(responsable)}, {
                        start_date_o: {
                            "$lte": parseInt(moment().format("HH"))
                        },
                        end_date_o: {
                            "$gte": parseInt(moment().format("HH"))
                        }
                    }]
                }
            }
        ]);

        var arraytour = []
        datatour.map((item, index) => {
            arraytour.push(item._id)
        })

        const personel = await Personnel.find({
            tour: {$in: datatour},
            active: true,
            type: "internal"
        }).populate("poste tour fonction")

        const start_date = moment().startOf("day")

        const absence = await Absence.find({
            start_date: {
                $gte: start_date.toDate(),
                $lt: moment(start_date).endOf("day").toDate()
            }
        })
        var verifPersonnel = []
        personel.map((item, index) => {
            const verif = absence.find(element => new ObjectId(element.personal).equals(item._id))
            if (!verif) {
                verifPersonnel.push(item)
            }
        })
        res.status(200).json(verifPersonnel)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
const getPersonelByMatricule = async (req, res, prev) => {
    try {

        const matricule = req.params.matricule;

        if (!matricule) {
            res.status(400).send("All input is required");
        } else {
            const personel = await Personnel.findOne({
                matricule: matricule,
                active: true
            }).populate("poste tour fonction")
            if (!personel) {
                res.status(404).json({message: "matricule invalid"})
            } else {
                const start_date = moment().startOf("day")

                const absence = await Absence.findOne({
                    personal: personel._id,
                    start_date: {
                        $gte: start_date.toDate(),
                        $lt: moment(start_date).endOf("day").toDate()
                    }
                })

                if (absence) {
                    res.status(200).json(personel)
                } else {
                    res.status(307).json({message: "Absence"})
                }
            }


        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }


}

module.exports = {
    add,
    getAll,
    getById,
    Update,
    Delete,
    getAllPersonalsByResponsable,
    getPersonelByMatricule
}