const router = require('express').Router();
const File = require('../models/file');
const path = require('path');

router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });

        if (!file) {
            return res.render('download', { error: 'Link has expired or file not found.' });
        }

        const filePath = path.join(__dirname, '..', file.path);  // More reliable cross-platform
        return res.download(filePath);

    } catch (err) {
        console.error('Download error:', err);
        return res.status(500).render('download', { error: 'Something went wrong during download.' });
    }
});

module.exports = router;
