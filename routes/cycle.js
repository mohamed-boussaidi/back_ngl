const express = require('express');
const router = express.Router()
const cycle = require("../controllers/config/cycle");
const auth = require("../middleware/auth");

/**-------------------------------- Cycle Routes ------------------------**/

//Get all Method
router.post('/cycle',auth,async (req, res) => {
    cycle.add(req,res)
})
router.get('/cycles',auth,async (req, res) => {
    cycle.getAll(req,res)
})

//Get by ID Method
router.get('/cycle/:id',auth, async (req, res) => {
    cycle.getById(req,res)
})

//Update by ID Method
router.patch('/cycle/:id',auth, async (req, res) => {
    cycle.Update(req,res)
})
router.delete('/cycle/:id',auth, async (req, res) => {
    cycle.Delete(req,res)
})

module.exports = router;