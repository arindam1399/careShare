const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');

connectDB();

async function deleteData() {
    // Fetch files older than 24 hours
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
        const files = await File.find({ createdAt: { $lt: pastDate } });

        if (files.length) {
            for (const file of files) {
                try {
                    fs.unlinkSync(file.path);         // Delete file from disk
                    await file.remove();              // Remove from DB
                    console.log(`Successfully deleted ${file.filename}`);
                } catch (err) {
                    console.error(`Error deleting ${file.filename}: ${err}`);
                }
            }
            console.log('Job Done!');
        } else {
            console.log('No old files found to delete.');
        }
    } catch (err) {
        console.error('Failed to fetch old files:', err);
    } finally {
        process.exit();
    }
}

deleteData();
