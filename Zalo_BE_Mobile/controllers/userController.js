const FriendRequest = require("../models/friendRequest");
const User = require("../models/user");
const filterObj = require("../utils/filterObj");

// exports.updateMe = async (req, res, next) => {
//     const filteredBody = filterObj(
//         req.body,
//         "firstName",
//         "lastName",
//         "about",
//         "avatar"
//     );
//     const userDoc = await User.findByIdAndUpdate(req.user._id, filteredBody);

//     res.status(200).json({
//         status: "success",
//         data: userDoc,
//         message: "Profile updated successfully",
//     });
// };

exports.updateMe = async (req, res, next) => {
    try {
        const userId = req.params.userId; // Lấy userId từ URL

        const filteredBody = filterObj(
            req.body,
            "firstName",
            "lastName",
            "dateOfBirth",
            "gender",
            "phone"
        );

        const userDoc = await User.findByIdAndUpdate(userId, filteredBody, {
            new: true,
            runValidators: true
        });

        if (!userDoc) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: userDoc,
            message: "Profile updated successfully",
        });
        console.log("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

// get user profile
exports.getUser = async (req, res, next) => {
    try {
        const userId = req.params._id;
        if (!userId) {
            return res.status(400).json({
                status: "error",
                message: "User ID is required",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found",
            });
        }

        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '_id firstName lastName');
        res.status(200).json({
            status: "success",
            data: users,
            message: "Users found successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const all_users = await User.find({
            verified: true,
        }).select("firstName lastName _id status");

        const this_user = req.user;

        let remaining_users = all_users.filter(
            (user) =>
                !this_user.friends.includes(user._id) &&
                user._id.toString() !== req.user._id.toString()
        );
        remaining_users = await Promise.all(
            remaining_users.map(async (user) => {
                const hasRequest = await FriendRequest.findOne({ sender: this_user._id, recipient: user._id });
        
                return {
                    ...user.toObject(),
                    requested: hasRequest ? 1 : 0
                };
            })
        );
        res.status(200).json({
            status: "success",
            data: remaining_users,
            message: "Users found successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

exports.getRequests = async (req, res, next) => {
    try {
        const requests = await FriendRequest.find({
            recipient: req.user._id,
        }).populate("sender", "_id firstName lastName");

        res.status(200).json({
            status: "success",
            data: requests,
            message: "Requests found successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

exports.getFriends = async (req, res, next) => {
    try {
        const this_user = await User.findById(req.user._id).populate(
            "friends",
            "_id firstName lastName status"
        );

        res.status(200).json({
            status: "success",
            data: this_user.friends,
            message: "Friends found successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const uid = req.query.uid;
        console.log(uid);
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({
            message: "Internal server error"
        });

    }
};


