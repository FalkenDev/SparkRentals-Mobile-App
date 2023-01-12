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
        const user = await storage.readUser();
        const userId = user['userData']['id']
        

        const token = await storage.readToken();                
        const respone = await fetch(`${config.base_url}users/${userId}?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'x-access-token': token['token']
            }
        }
        );

        const result = await respone.json();

        const userData = result['user'];
                
        const userHistory = userData['history'];
        
        return userHistory;
    },

    addFunds: async function addFunds(prepaid: string): Promise<any> {
        const token = await storage.readToken();
        const user = await storage.readUser();        
        const userData = await userModel.getUserData(user);

        const userId = userData['user']['_id'];
        
        const requestBody = {
            'user_id': userId,
            'prepaid_code': prepaid
        };            
        
        const response = await fetch(`${config.base_url}users/addfund?api_key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token['token']
            },
            body: JSON.stringify(requestBody)
        });

        const result = await response;        
        
        return result;
    },

    getProfile: async function getProfile() {
        const userData = await storage.readUser();        
        const user = await userModel.getUserData(userData);

        return user;
    },

    updateUser: async function updateUser(userData: object): Promise<any> {
        const token = await storage.readToken();
        const userId = await storage.readUser();
        const user = await userModel.getUserData(userId);
        
        const body = {
            'user_id': user['user']['_id'],
            'firstName': userData['firstname'],
            'lastName': userData['lastname'],
            'phoneNumber': userData['phonenumber'],
            'email': userData['email'],
            'api_key': API_KEY
        };

        

        // Prepare body to be urlencoded
        const formBody = [];

        for (const property in body) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
        };
        
        const requestBody = formBody.join("&");

        const response = await fetch(`${config.base_url}users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'x-access-token': token['token']
            },
            body: requestBody
        });

        if (response.status === 204) {
            const message = {
                message: 'Profile Changed',
            };

            return message;
        };

        const result = await response.json();

        return result;
        
    },

    deleteAccount: async function deleteAccount(): Promise<any> {
        const token = await storage.readToken();
        const user = await storage.readUser();
        
        const userId = user['userData']['id'];

        const body = {
            'user_id': userId,
            'api_key': API_KEY
        };

        const formBody = [];

        for (const property in body) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
        };
        
        const requestBody = formBody.join("&");

        const response = await fetch(`${config.base_url}users`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'x-access-token': token['token']
            },
            body: requestBody
        });

        if (response.status === 204) {
            const message = {
                message: 'Account deleted',
            };

            return message;
        };

        const result = await response.json();

        return result;
    }
};

export default userModel;