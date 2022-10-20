const express = require('express');
const router = express.Router()
const personnel = require("../controllers/personnel");
const auth = require("../middleware/auth");

/**-------------------------------- Personals Routes ------------------------**/

//Get all Method
router.post('/personal',auth,async (req, res) => {
    personnel.add(req,res)
})

router.post('/filterBy',auth,async (req, res) => {
    personnel.filterBy(req,res)
})
router.get('/personals',auth,async (req, res) => {
    personnel.getAll(req,res)
})

router.get('/getPersonelByMatricule/:matricule',auth,async (req, res) => {
    personnel.getPersonelByMatricule(req,res)
})

//Get by ID Method
router.get('/personal/:id',auth, async (req, res) => {
    personnel.getById(req,res)
})
//Update by ID Method
router.patch('/personal/:id',auth, async (req, res) => {
    personnel.Update(req,res)
})

//Delete by ID Method
router.delete('/personal/:id',auth, async (req, res) => {
    personnel.Delete(req,res)
})

//Delete by ID Method
router.get('/getAllPersonalsByResponsable/:responsable',auth, async (req, res) => {
    personnel.getAllPersonalsByResponsable(req,res)
})

module.exports = router;