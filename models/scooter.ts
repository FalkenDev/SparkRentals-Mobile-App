import { API_KEY } from '@env';
import config from '../config/config.json';
import storage from './storage';

const scooterModel = {

    /**
     * Get all scooters from API
     * @param API_KEY 
     * @param city 
     * @returns 
     */
    getScooters: async function getScooters(API_KEY: string, city: object): Promise<object> {
        const token = await storage.readToken();

        const cityName = city['name'];
        const response = await fetch(`${config.base_url}scooters/owner/${cityName}?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'x-access-token': token['token']
            }
        });
        const result = await response.json();
        // console.log(result);
        
        return result;
    },

    sortAvailableScooters: function sortAvailableScooters(scooters: object) {
        const availableScooters = [];
        
        for (let i = 0; i < scooters.length; i++) {
            if (scooters[i]['status'] === 'Available') {
                availableScooters.push(scooters[i])
            }
        }
        
        return availableScooters;
    },

    startScooter: async function startScooter(scooterId: string) {
        const token = await storage.readToken();
        const user = await storage.readUser();

        const userId = user['userData']['id'];

        const body = {
            'scooter_id': `${scooterId}`,
            'user_id': `${userId}`,
            'api_key': `${API_KEY}`
        };
        
        // Prepare body to be urlencoded
        const formBody = [];

        for (const property in body) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
        };
        
        const requestBody = formBody.join("&");

        // Send POST request
        const response = await fetch(`${config.base_url}scooters/rent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'x-access-token': token['token']
            },
            body: requestBody
        });

        if (response.status === 204) {
            const message = {
                message: 'Journey started',
            };

            return message;
        };

        const result = await response.json();
        
        return result;
    },

    stopScooter: async function stopScooter(scooterId: string) {
        const token = await storage.readToken();
        const user = await storage.readUser();

        const userId = user['userData']['id'];

        const body = {
            'scooter_id': `${scooterId}`,
            'user_id': `${userId}`,
            'api_key': `${API_KEY}`
        };
        
        // Prepare body to be urlencoded
        const formBody = [];

        for (const property in body) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
        };
        
        const requestBody = formBody.join("&");

        // Send POST request
        const response = await fetch(`${config.base_url}scooters/stop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'x-access-token': token['token']
            },
            body: requestBody
        });

        if (response.status === 200) {
            const message = {
                message: 'Journey ended'
            };

            return message;
        };

        const result = await response.json();
        
        return result;
    },

}

export default scooterModel;