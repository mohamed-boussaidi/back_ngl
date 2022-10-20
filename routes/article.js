const express = require('express');
const router = express.Router()
const article = require("../controllers/article");
const auth = require("../middleware/auth");
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
/**-------------------------------- Article Routes ------------------------**/

//Get all Method
router.post('/article',auth,async (req, res) => {
    article.add(req,res)
})
router.get('/articles',auth,async (req, res) => {
    article.getAll(req,res)
})

//Get by ID Method
router.get('/article/:id',auth, async (req, res) => {
    article.getById(req,res)
})

//Update by ID Method
router.patch('/article/:id',auth, async (req, res) => {
    article.Update(req,res)
})
router.delete('/article/:id',auth, async (req, res) => {
    article.Delete(req,res)
})
router.post('/articleWithFile',auth,upload.single('file'),async (req, res) => {
    article.addWithFile(req,res)
})

module.exports = router;