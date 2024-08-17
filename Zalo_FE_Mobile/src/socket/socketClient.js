import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

class SocketClient {
    constructor() {
        this.socket = null;
        this.connect(); // Khởi tạo kết nối socket ngay từ constructor
    }

    async connect() {
        const user_id = await AsyncStorage.getItem('user_id');
        console.log('Connecting socket with user_id: ', user_id);
        this.socket = io('http://10.0.2.2:3000', {
            query: `user_id=${user_id}`
        });
        console.log(this.socket);
    }

    async getClientSocket() {
        if (!this.socket) {
            await this.connect();
        }
        return this.socket;
    }
}

const socketClient = new SocketClient();
export default socketClient;
