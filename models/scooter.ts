import config from '../config/config.json';

const scooterModel = {

    /**
     * Get all scooters from API
     * @param API_KEY 
     * @param city 
     * @returns 
     */
    getScooters: async function getScooters(API_KEY: string, city: object): Promise<object> {
        const cityName = city['name'];
        const response = await fetch(`${config.base_url}scooters/owner/${cityName}?api_key=${API_KEY}`);
        const result = await response.json();
        
        return result;
    },

}

export default scooterModel;