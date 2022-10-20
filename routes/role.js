const express = require('express');
const router = express.Router()
const role = require("../controllers/config/role");
const auth = require("../middleware/auth");

/**-------------------------------- Role Routes ------------------------**/

//Get all Method
router.post('/role',auth,async (req, res) => {
    role.add(req,res)
})
router.get('/roles',auth,async (req, res) => {
    role.getAll(req,res)
})

//Get by ID Method
router.get('/role/:id',auth, async (req, res) => {
    role.getById(req,res)
})

//Update by ID Method
router.patch('/role/:id',auth, async (req, res) => {
    role.Update(req,res)
})

//Delete by ID Method
router.delete('/role/:id',auth, async (req, res) => {
    role.Delete(req,res)
})

module.exports = router;
