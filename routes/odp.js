const express = require('express');
const router = express.Router()
const odp = require("../controllers/odp");
const auth = require("../middleware/auth");
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
/**-------------------------------- Odp Routes ------------------------**/

//Get all Method
router.post('/odp',auth,async (req, res) => {
    odp.add(req,res)
})
router.post('/odpWithFile',auth,upload.single('file'),async (req, res) => {
    odp.addWithFile(req,res)
})
router.get('/odps',auth,async (req, res) => {
    odp.getAll(req,res)
})
router.get('/getAllNotDeleted',auth,async (req, res) => {
    odp.getAllNotDeleted(req,res)
})

//Get by ID Method
router.get('/odp/:id',auth, async (req, res) => {
    odp.getById(req,res)
})

//Update by ID Method
router.patch('/odp/:id',auth, async (req, res) => {
    odp.Update(req,res)
})
router.delete('/odp/:id',auth, async (req, res) => {
    odp.Delete(req,res)
})
router.get('/getOdpByCode/:code',auth, async (req, res) => {
    odp.getOdpByCode(req,res)
})
router.get('/getAllcycleInstanceToday',auth, async (req, res) => {
    odp.getAllcycleInstanceToday(req,res)
})
router.get('/getAllcycleInstance',auth, async (req, res) => {
    odp.getAllcycleInstance(req,res)
})
router.patch('/UpdatecycleInstance/:id',auth, async (req, res) => {
    odp.UpdatecycleInstance(req,res)
})

module.exports = router;