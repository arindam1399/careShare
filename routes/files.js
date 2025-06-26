const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const File = require('../models/file');
const { v4: uuid4 } = require('uuid');

// Ensure uploads/ directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage: storage,
    limits: { fileSize: 1000 * 1024 * 1024 * 2 }  // 2GB limit
}).single('myfile');

router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        // Save to database
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        return res.json({
            file: `${process.env.APP_BASE_URL}/files/${response.uuid}`
        });
    });
});


router.post('/send',async (req,res) => {
    const {uuid, emailTo, emailFrom } = req.body;

    //valided request
    if(!uuid || !emailTo ||!emailFrom){
        return res.status(422).send({error: "All feild are required."});


    }

    //get data from database

    const file = await File.findOne({uuid: uuid});
    if(file.sender){
        return res.status(422).send({error: "Email Already sent."});
 
    }

    file.sender=emailFrom;
    file.receiver = emailTo;
    const response= await file.save();

    //send mail

    const sendMail=require('../services/emailService')
    sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'careShare file sharing',
        text: `${emailFrom} shared a file with you.`,
        html: require('../services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${uuid}`,
size: Math.ceil(file.size / 1024) + ' KB',
            expires: '24 hours',
        })
    });

    return res.send({success: true});
});

module.exports = router;
