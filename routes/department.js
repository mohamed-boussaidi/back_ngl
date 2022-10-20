const express = require('express');
const router = express.Router()
const department = require("../controllers/config/department");
const auth = require("../middleware/auth");

/**-------------------------------- department Routes ------------------------**/

//Get all Method
router.post('/department',auth,async (req, res) => {
    department.add(req,res)
})
router.get('/departments',auth,async (req, res) => {
    department.getAll(req,res)
})

//Get by ID Method
router.get('/department/:id',auth, async (req, res) => {
    department.getById(req,res)
})

//Update by ID Method
router.patch('/department/:id',auth, async (req, res) => {
    department.Update(req,res)
})

//Delete by ID Method
router.delete('/department/:id',auth, async (req, res) => {
    department.Delete(req,res)
})

module.exports = router;