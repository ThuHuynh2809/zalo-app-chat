const { uploadImage } = require("../services/Firebase");


exports.uploadFile = async (req, res, next) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                status: "error",
                message: "No file uploaded",
            });
        }

        const url = await uploadImage(file);
        res.status(200).json({
            status: "success",
            data: {
                url,
            },
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};