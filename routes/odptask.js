const express = require('express');
const router = express.Router()
const odptask = require("../controllers/odptask");
const auth = require("../middleware/auth");

/**-------------------------------- User Routes ------------------------**/

router.post('/odptask',auth,async (req, res) => {
    odptask.add(req,res)
})
router.get('/odptasks',auth,async (req, res) => {
    odptask.getAll(req,res)
})

router.get('/odptask/:id',auth, async (req, res) => {
    odptask.getById(req,res)
})
router.get('/getOdpTaskByPersonnelMatricule/:matricule',auth, async (req, res) => {
    odptask.getOdpTaskByPersonnelMatricule(req,res)
})
router.get('/getOdpTaskByPersonnelMatriculeOpened/:matricule',auth, async (req, res) => {
    odptask.getOdpTaskByPersonnelMatriculeOpened(req,res)
})
router.patch('/odptask/:id',auth, async (req, res) => {
    odptask.Update(req,res)
})
router.delete('/odptask/:id',auth, async (req, res) => {
    odptask.Delete(req,res)
})
router.get('/getOdpTasksOpened',auth, async (req, res) => {
    odptask.getOdpTasksOpened(req,res)
})
module.exports = router;
