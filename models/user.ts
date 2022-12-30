import { API_KEY } from '@env';
import config from '../config/config.json';
import storage from './storage';

const userModel = {
    getUserData: async function getUserData(userData) {
        const token = await storage.readToken();        
        console.log(userData['userData']);
        
        const user = userData['userData']
        
        const response = await fetch(`${config.base_url}users/${user['id']}?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'x-access-token': token['token']
            }
        });
        
        const result = await response.json();

        return result;
    },

    getBalance: async function getBalance(): Promise<any> {
        const userData = await storage.readUser();        
        const user = await userModel.getUserData(userData);

        const userBalance = user['user']['balance'];
        
        return userBalance;
    },

    getHistory: async function getHistory(): Promise<any> {
        const userData = await storage.readUser();        
        const user = await userModel.getUserData(userData);

        const userHistory = user['user']['history'];
        
        return userHistory;
    }
};

export default userModel;