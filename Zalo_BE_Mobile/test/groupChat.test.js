const mongoose = require('mongoose');
const { Server } = require('socket.io');
const { createServer } = require('http');
const Client = require('socket.io-client');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mockingoose = require('mockingoose');

const User = require('../models/user'); // Điều chỉnh đường dẫn tới tệp model của bạn
const app = require('../app'); // Điều chỉnh đường dẫn tới tệp app của bạn


describe('Socket IO create-group-chat', () => {
    let clientSocket, mongoServer;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = await mongoServer.getUri();

        // Initialize MongoDB Memory Server
        const mongod = new MongoMemoryServer();

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        clientSocket = new Client(`http://10.0.2.2:3000`, {
            query: `user_id='6644d15eda4f66994a4c20ed'`
        });
    });

    test('should create a new group chat and emit group_chat_created', (done) => {
        const fakeUsers = [
            { _id: new mongoose.Types.ObjectId(), socket_id: 'socket1', firstName: 'User', lastName: 'One', email: 'userone@example.com', status: 'online' },
            { _id: new mongoose.Types.ObjectId(), socket_id: 'socket2', firstName: 'User', lastName: 'Two', email: 'usertwo@example.com', status: 'online' },
            { _id: new mongoose.Types.ObjectId(), socket_id: 'socket3', firstName: 'User', lastName: 'Three', email: 'userthree@example.com', status: 'online' },
        ];

        mockingoose(User).toReturn(fakeUsers[0], 'findById'); // Mock tìm kiếm admin
        mockingoose(User).toReturn(fakeUsers[1], 'findById'); // Mock tìm kiếm thành viên
        mockingoose(User).toReturn(fakeUsers[2], 'findById'); // Mock tìm kiếm thành viên

        const data = {
            groupName: 'Test Group',
            admin: fakeUsers[0]._id,
            members: [fakeUsers[0]._id, fakeUsers[1]._id, fakeUsers[2]._id],
        };

        clientSocket.on('group_chat_created', (groupChat) => {
            console.log(groupChat);
        });

        clientSocket.emit('create-group-chat', data);
    });
});