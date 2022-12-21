var express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController.js');

router.get('/stored/courses', meController.storedCourse)
router.get('/trash/courses', meController.trashCourse)


module.exports = router;


