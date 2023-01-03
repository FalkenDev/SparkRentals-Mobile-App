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
    }

}

export default scooterModel;