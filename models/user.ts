import { API_KEY } from '@env';
import config from '../config/config.json';
import storage from './storage';

const userModel = {
    getUserData: async function getUserData(userData) {
        const token = await storage.readToken();                
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
        /**
         * HARDCODED VALUES FOR TESTING, NOT FINAL FUNCTION!!
         */
        
        // const userData = await storage.readUser();
        const token = await storage.readToken();                
        const respone = await fetch(`${config.base_url}users/63b3f1f0ca9019ea96bded62?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'x-access-token': token['token']
            }
        }
        );

        const result = await respone.json();

        const userData = result['user'];
        

        // const user = await userModel.getUserData(userData);

        // const userHistory = user['user']['history'];
        
        const userHistory = userData['history'];
        // console.log(userHistory);
        
        return userHistory;
    },

    addFunds: async function addFunds(prepaid: string): Promise<any> {
        const token = await storage.readToken();
        const user = await storage.readUser();        
        const userData = await userModel.getUserData(user);

        const userId = userData['user']['_id'];
        // console.log(userId);
        
        const requestBody = {
            'user_id': userId,
            'prepaid_code': prepaid
        };    

        console.log(JSON.stringify(requestBody));
        
        
        const response = await fetch(`${config.base_url}users/addfund?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token['token']
            },
            body: JSON.stringify(requestBody)
        });

        const result = await response        
        
        return result;
    }
};

export default userModel;