const router = require('express').Router();
const File = require('../models/file');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });

        // If no file found, show error
        if (!file) {
            return res.render('download', {
                error: 'File not found or link has expired.'
            });
        }

        // If file exists, render download page
        return res.render('download', {
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });

    } catch (err) {
        console.error('Error in GET /files/:uuid:', err);
        return res.render('download', { error: 'Something went wrong..' });
    }
});

module.exports = router;
