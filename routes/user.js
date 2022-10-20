const express = require('express');
const router = express.Router()
const user = require("../controllers/user");
const auth = require("../middleware/auth");

/**-------------------------------- User Routes ------------------------**/

router.post('/register', async (req, res) => {
    user.register(req,res)
})
router.post('/login', async (req, res) => {
    user.login(req,res)
})

//Get all Method
router.get('/users',async (req, res) => {
    user.getAll(req,res)
})

//Get by ID Method
router.get('/user/:id',auth, async (req, res) => {
    user.getById(req,res)
})

//Update by ID Method
router.patch('/user/:id',auth, async (req, res) => {
    user.Update(req,res)
})

//Delete by ID Method
router.delete('/user/:id',auth, async (req, res) => {
    user.Delete(req,res)
})
module.exports = router;
