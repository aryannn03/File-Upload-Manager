const express=require('express');

const router = express.Router();

const {localFileUpload,imageUpload,videoUpload,imageSizeReduer} = require('../controllers/fileUpload');

router.post('/localFileUpload',localFileUpload);
router.post('/imageUpload',imageUpload);
router.post('/videoUpload',videoUpload);
router.post('/imageSizeReduer',imageSizeReduer);

module.exports=router;