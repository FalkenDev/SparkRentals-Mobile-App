import { API_KEY } from '@env';
import config from '../config/config.json';
import storage from './storage';

const userModel = {
    getUsers: async function getUsers() {
        const token = await storage.readToken();        
        console.log(token);
        
        const response = await fetch(`${config.base_url}users/63ad0369a137b44bc75fd2d2?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'x-access-token': token['token']
            }
        });
        
        const result = await response.json();

        
        
        return result;
    },

    getBalance: async function getBalance(): Promise<Object> {
        const token = await storage.readToken();        
        const users = await userModel.getUsers();

        console.log(users);
        

        const response = await fetch(`${config.base_url}cities?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'x-access-token': token['token']
            }
        });
        
        const result = await response.json();

        
        
        return result;
    }
};

export default userModel;