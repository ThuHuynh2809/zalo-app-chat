const mongoose = require('mongoose');
const io = require('socket.io-client');

class SocketClient {
    constructor() {
        this.socket = null;
        this.connect(); // Khởi tạo kết nối socket ngay từ constructor
    }

    async connect() {
        this.socket = io('http://10.0.2.2:3000', {
            query: `user_id='6644d15eda4f66994a4c20ed'`
        });
        // console.log(this.socket);
    }

    async getClientSocket() {
        if (!this.socket) {
            await this.connect();
        }
        return this.socket;
    }
}

async function emitData() {
    console.log('emitting..');
    const socketBucket = new SocketClient();
    const socketClient = await socketBucket.getClientSocket();

    const fakeUsers = [
        { _id: new mongoose.Types.ObjectId(), socket_id: 'socket1', firstName: 'User', lastName: 'One', email: 'userone@example.com', status: 'online' },
        { _id: new mongoose.Types.ObjectId(), socket_id: 'socket2', firstName: 'User', lastName: 'Two', email: 'usertwo@example.com', status: 'online' },
        { _id: new mongoose.Types.ObjectId(), socket_id: 'socket3', firstName: 'User', lastName: 'Three', email: 'userthree@example.com', status: 'online' },
    ];
    
    const data = {
        groupName: 'Test Group',
        admin: fakeUsers[0]._id,
        members: [fakeUsers[0]._id, fakeUsers[1]._id, fakeUsers[2]._id],
    };

    console.log('data:');
    console.log(data);
    
    socketClient.emit('create-group-chat', data);
    
    socketClient.on('group_chat_created', (groupChat) => {
        console.log(groupChat);
    });
}

emitData();