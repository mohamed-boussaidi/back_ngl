const express = require('express');
const router = express.Router()
const  classe = require("../controllers/config/classe");
const auth = require("../middleware/auth");

/**-------------------------------- Classe Routes ------------------------**/

//Get all Method
router.post('/classe',auth,async (req, res) => {
    classe.add(req,res)
})
router.get('/classes',auth,async (req, res) => {
    classe.getAll(req,res)
})

//Get by ID Method
router.get('/classe/:id',auth, async (req, res) => {
    classe.getById(req,res)
})

//Update by ID Method
router.patch('/classe/:id',auth, async (req, res) => {
    classe.Update(req,res)
})
router.delete('/classe/:id',auth, async (req, res) => {
    classe.Delete(req,res)
})

module.exports = router;