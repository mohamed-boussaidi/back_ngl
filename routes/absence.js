const express = require('express');
const router = express.Router()
const absence = require("../controllers/absence");
const auth = require("../middleware/auth");

/**-------------------------------- absence Routes ------------------------**/

//Get all Method
router.post('/absence',auth,async (req, res) => {
    absence.add(req,res)
})
router.post('/getAbsenceByPersonalMatricule',auth,async (req, res) => {
    absence.getAbsenceByPersonalMatricule(req,res)
})
router.get('/absences',auth,async (req, res) => {
    absence.getAll(req,res)
})
router.post('/getAbsenceByTour',auth,async (req, res) => {
    absence.getAbsenceByTour(req,res)
})

router.post('/getAbsenceBytimeAndTour',auth,async (req, res) => {
    absence.getAbsenceBytimeAndTour(req,res)
})
router.get('/getAbsenceByTime',auth,async (req, res) => {
    absence.getAbsenceByTime(req,res)
})

//Get by ID Method
router.get('/absence/:id',auth, async (req, res) => {
    absence.getById(req,res)
})
router.get('/VerifyPersonalHaveAbsence/:matricule',auth, async (req, res) => {
    absence.VerifyPersonalHaveAbsence(req,res)
})

//Update by ID Method
router.patch('/absence/:id',auth, async (req, res) => {
    absence.Update(req,res)
})
router.delete('/absence/:id',auth, async (req, res) => {
    absence.Delete(req,res)
})
router.post('/FilterAbsence',auth,async (req, res) => {
    absence.FilterAbsence(req,res)
})
module.exports = router;