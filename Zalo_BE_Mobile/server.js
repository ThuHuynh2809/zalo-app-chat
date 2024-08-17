const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const jwt = require("jsonwebtoken");

const path = require("path");

const { Server } = require("socket.io");

const app = require("./app");
const http = require("http");
const User = require("./models/user");
const FriendRequest = require("./models/friendRequest");
const OneToOneMessage = require("./models/oneToOneMessage");
const GroupMessage = require('./models/groupMessages');
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://10.0.2.2:3000",
        methods: ["GET", "POST"],
    },
});

const DB = process.env.DBURI.replace("<PASSWORD>", process.env.DBPASSWORD);

mongoose
    .connect(DB, {
        // useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
        // useUnifiedTopology: true,
    })
    .then((con) => {
        console.log("DB connection successful");
    });

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

io.on("connection", async (socket) => {
    console.log(JSON.stringify(socket.handshake.query));
    const user_id = socket.handshake.query["user_id"];

    console.log('user_id:');
    console.log(user_id);
    console.log(`User connected ${socket.id}`);
    if (user_id) {
        try {
            await User.findByIdAndUpdate(user_id, {
                socket_id: socket.id,
                status: "online",
            });
        } catch (e) {
            console.log(e);
        }
    }
    //We can write our socket event listeners here

    socket.on("friend_request", async (data) => {
        const to = await User.findById(data.to).select("socket_id");
        const from = await User.findById(data.from).select("socket_id");

        //create a friend requuest
        await FriendRequest.create({
            sender: data.from,
            recipient: data.to,
        });

        //TODO => create a friend request
        //emit event => new_friend_request
        io.to(to?.socket_id).emit("new_friend_request", {
            message: "New Friend Request",
        });
        //emit event => request_sent
        io.to(from?.socket_id).emit("request_sent", {
            message: "Friend Request Sent",
        });
    });

    socket.on("accept_request", async (data) => {
        const request_doc = await FriendRequest.findById(data.request_id);

        const sender = await User.findById(request_doc.sender);
        const receiver = await User.findById(request_doc.recipient);

        sender.friends.push(request_doc.recipient);
        receiver.friends.push(request_doc.sender);

        await sender.save({ new: true, validateModifiedOnly: true });
        await receiver.save({ new: true, validateModifiedOnly: true });

        await FriendRequest.findByIdAndDelete(data.request_id);

        io.to(sender.socket_id).emit("request_accepted", {
            message: "Friend Request Accepted",
        });
        io.to(receiver.socket_id).emit("request_accepted", {
            message: "Friend Request Accepted",
        });
    });

    //  Handle text/link mesagge
    socket.on(
        "get_direct_conversations",
        async ({ user_id, partner_id }, callback) => {
            // console.log(user_id);
            const existing_conversations = await OneToOneMessage.find({
                participants: { $all: [user_id, partner_id] },
            }).populate("participants", "firstName lastName _id email status");
            console.log(existing_conversations);

            callback(existing_conversations);
        }
    );

    socket.on("start_conversation", async (data) => {
        //data: {to, from}
        const { to, from } = data;
        //check if there is any existing conversation between the two users
        const existing_conversation = await OneToOneMessage.find({
            participants: { $size: 2, $all: [to, from] },
        }).populate("participants", "firstName lastName _id email status");
        console.log(existing_conversation[0], "existing_conversation");
        // if no existing conversation
        if (existing_conversation.length === 0) {
            let new_chat = await OneToOneMessage.create({
                participants: [to, from],
            });
            new_chat = await OneToOneMessage.findById(new_chat).populate(
                "participants",
                "firstName lastName _id email status"
            );

            console.log(new_chat, "new_chat");
            socket.emit("start_chat", new_chat);
        }
        //if there is existing_conversation
        else {
            socket.emit("start_chat", existing_conversation[0]);
        }
    });

    socket.on("get_messages", async (data, callback) => {
        const { messages } = await OneToOneMessage.findById(
            data.conversation_id
        ).select("messages");
        callback(messages);
    });

    // Handle text/link mesagge

    socket.on("text-message", async (data) => {
        console.log("Received Message", data);

        //data: {to, from, message, conversation_id, type}
        const { to, from, message, conversation_id, type } = data;

        const to_user = await User.findById(to);
        console.log(to_user.email);
        const from_user = await User.findById(from);

        const new_message = {
            to,
            from,
            type,
            text: message,
            created_at: new Date(),
        };

        //create a new conversation if it dosen't exist yet or add new message to the messages list
        const chat = await OneToOneMessage.findById(conversation_id);
        chat.messages.push(new_message);
        await chat.save();
        //save to db

        //emit incoming_message -> to user
        io.to(to_user.socket_id).emit("new_message", {
            conversation_id,
            message: new_message,
        });

        //emit outgoing_message -> from user
        io.to(from_user.socket_id).emit("new_message", {
            conversation_id,
            message: new_message,
        });
    });

    socket.on("file_message", async (data) => {
        try {
            console.log('Received File Message', data);

            const { to, from, file, conversation_id, type } = data;

            // Find the users
            const to_user = await User.findById(to);
            const from_user = await User.findById(from);

            if (!to_user || !from_user) {
                throw new Error('User not found');
            }

            console.log(`To: ${to_user.email}, From: ${from_user.email}`);

            const new_message = {
                to,
                from,
                type,
                file: file,
                created_at: new Date(),
            };

            // Find or create the conversation
            const chat = await OneToOneMessage.findById(conversation_id);
            if (!chat) {
                chat = new OneToOneMessage({
                    participants: [to, from],
                    messages: [new_message],
                });
            } else {
                chat.messages.push(new_message);
            }

            // Save the conversation
            await chat.save();

            // Emit the new message to the recipients
            io.to(to_user.socket_id).emit('new_message', {
                conversation_id: chat._id,
                message: new_message,
            });

            io.to(from_user.socket_id).emit('new_message', {
                conversation_id: chat._id,
                message: new_message,
            });

            console.log('File message saved and emitted successfully');
        } catch (error) {
            console.error('Error handling file message:', error);
        }
    });

    socket.on("file_message_group", async (data) => {
        try {
            console.log('Received File Message', data);

            const { groupId, senderId, file, type } = data;

            // Find the group chat
            const groupChat = await GroupMessage.findById(groupId).populate(
                "members",
                "firstName lastName _id email status socket_id"
            );

            if (!groupChat) {
                throw new Error('Group chat not found');
            }

            console.log(`Group chat: ${groupChat.groupName}`);

            const new_message = {
                sender: senderId,
                type,
                file: file,
                created_at: new Date(),
            };

            // Push the new message to the group chat's messages array
            groupChat.messages.push(new_message);

            // Save the updated group chat
            await groupChat.save();

            // Emit the new message to the group chat members
            groupChat?.members?.forEach(async (member) => {
                io.to(member.socket_id).emit('new_group_chat_message', new_message);
            });

            console.log('File message saved and emitted successfully');
        } catch (error) {
            console.error('Error handling file message:', error);
        }
    }
    );

    socket.on("create_group_chat", async (data) => {
        // data: { groupName, participants }
        const { groupName, participants, admin } = data;
        participants.push(admin);
        console.log(data);
    
        try {
            // Kiểm tra danh sách participants không trống
            if (!participants || participants.length < 2) {
                console.log('Nhóm cần ít nhất 2 người tham gia.');
                return socket.emit("error", { message: "Nhóm cần ít nhất 2 người tham gia." });
            }
    
            // Tạo cuộc trò chuyện nhóm mới
            let newGroupChat = await GroupMessage.create({
                "members": participants,
                groupName,
                admin
            });
    
            // Truy xuất cuộc trò chuyện nhóm mới tạo để lấy thông tin chi tiết
            newGroupChat = await GroupMessage.findById(newGroupChat._id).populate(
                "members",
                "firstName lastName _id email status socket_id"
            );
    
            console.log(newGroupChat, "newGroupChat");
    
            // Gửi thông tin nhóm chat mới tạo tới tất cả các người tham gia
            newGroupChat?.members?.forEach(async (member) => {
                io.to(member.socket_id).emit("group_chat_created", newGroupChat);
            });
    
            // Phát sự kiện 'group_chat_created' cho người khởi tạo
//            socket.emit("group_chat_created", newGroupChat);
        } catch (error) {
            console.log("Error creating group chat:", error);
            socket.emit("error", { message: "Đã xảy ra lỗi khi tạo nhóm trò chuyện." });
        }
    });

    socket.on("chat_group_message", async (data) => {
        try {
            const { groupId, senderId, messageType, text} = data;
            // Find the group chat by its ID
            const groupChat = await GroupMessage.findById(groupId).populate(
                "members",
                "firstName lastName _id email status socket_id"
            );;
    
            // Check if the group chat exists
            if (!groupChat || !senderId || !messageType) {
                console.log("chat error.");
                return;
            }
    
            // Construct the message object
            const message = {
                sender: senderId,
                type: messageType,
                text: text
            };
    
            // Push the message to the group chat's messages array
            groupChat.messages.push(message);
    
            // Save the updated group chat
            await groupChat.save();

            // Gửi thông tin nhóm chat mới tạo tới tất cả các người tham gia
            groupChat?.members?.forEach(async (member) => {
                console.log(member.socket_id);
                io.to(member.socket_id).emit("new_group_chat_message", message);
            });

            socket.emit('new_group_chat_message', message)
            console.log("Message sent successfully.");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    })

    socket.on("get_user_group_chats", async (data) => {
        const { userId } = data;

        try {
            // Validate input data
            if (!userId) {
                return socket.emit("error", { message: "User ID is required." });
            }
    
            // Find all group chats that the user is a member of
            const userGroupChats = await GroupMessage.find({ members: userId }).populate(
                "members",
                "firstName lastName _id email status socket_id"
            );
    
            // Emit the group chats to the user
            socket.emit("user_group_chats", userGroupChats);
        } catch (error) {
            console.error("Error fetching user group chats:", error);
            socket.emit("error", { message: "Error fetching user group chats." });
        }
    })

    socket.on("get_message_group_chat", async (data) => {
        const { itemId } = data;

        try {
            // Validate input data
            if (!itemId) {
                return socket.emit("error", { message: "Group ID is required." });
            }

            // Find all group chats that the user is a member of
            const userGroupChats = await GroupMessage.find({ _id: itemId }).populate(
                "messages.sender",
                "firstName lastName _id email status socket_id"
            );

            // Emit the group chats to the user
            socket.emit("message_group_chat", userGroupChats);
        } catch (error) {
            console.error("Error fetching user group chats:", error);
            socket.emit("error", { message: "Error fetching user group chats." });
        }
    })


    socket.on("end", async (data) => {
        //Find user by_id and setthe status to Offline
        if (data.user_id) {
            await User.findByIdAndUpdate(data.user_id, { status: "offline" });
        }

        //TODO => broaddcast user_disconnected
        console.log("Closing connection");
        socket.disconnect(0);
    });
});
// process.on("unhandledRejection", (err) => {
//     console.log(err);
//     console.log("UNHANDLED REJECTION! Shutting down...");
//     server.close(() => {
//         process.exit(1);
//     });
// });
