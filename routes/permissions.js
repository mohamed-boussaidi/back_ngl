const express = require('express');
const router = express.Router()
const permission = require("../controllers/config/permission");
const auth = require("../middleware/auth");

/**-------------------------------- Permission Routes ------------------------**/

//Get all Method
router.post('/permission',auth,async (req, res) => {
    permission.add(req,res)
})
router.get('/permissions',auth,async (req, res) => {
    permission.getAll(req,res)
})

//Get by ID Method
router.get('/permission/:id',auth, async (req, res) => {
    permission.getById(req,res)
})

//Update by ID Method
router.patch('/permission/:id',auth, async (req, res) => {
    permission.Update(req,res)
})

//Delete by ID Method
router.delete('/permission/:id',auth, async (req, res) => {
    permission.Delete(req,res)
})

module.exports = router;
