const ville = require("../controllers/config/ville");
const express = require('express');
const router = express.Router()
const auth = require("../middleware/auth");

/**-------------------------------- VIlle Routes ------------------------**/

//Get all Method
router.post('/ville',auth,async (req, res) => {
    ville.add(req,res)
})
router.get('/villes',auth,async (req, res) => {
    ville.getAll(req,res)
})

//Get by ID Method
router.get('/ville/:id',auth, async (req, res) => {
    ville.getById(req,res)
})

//Update by ID Method
router.patch('/ville/:id',auth, async (req, res) => {
    ville.Update(req,res)
})

//Delete by ID Method
router.delete('/ville/:id',auth, async (req, res) => {
    ville.Delete(req,res)
})

module.exports = router;
