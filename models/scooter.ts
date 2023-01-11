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
    getScooters: async function getScooters(city: object): Promise<object> {
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

    sortAvailableScooters: function sortAvailableScooters(scooters: string[]) {
        const availableScooters = [];
        
        for (let i = 0; i < scooters.length; i++) {
            if (scooters[i]['status'] === 'Available') {
                availableScooters.push(scooters[i])
            }
        }
        
        return availableScooters;
    },

    startScooter: async function startScooter(scooterId: string, position: object, scooterPosition: object) {
        const token = await storage.readToken();
        const user = await storage.readUser();
        const maxDistance2Scooter = 20;

        const userId = user['userData']['id'];        
        
        const distance2User = scooterModel.getProximity(position, scooterPosition);

        /**
         * Check if user is close enough to unlock the scooter
         * Change config.json distanceLimit to 0 to disable this
         */
        if (distance2User > maxDistance2Scooter && config.distanceLimit === 1) {
            const message = {
                errors: {
                    title: 'You are too far away from this scooter'
                }
            }

            return message;
        }


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

    getProximity: function getProximity(userPosition, scooterPosition) {
        
        function degrees2Radius(deg) {
            return deg * (Math.PI/180)
        };

        const lat1 = userPosition['latitude'];
        const lat2 = scooterPosition['latitude'];

        const lon1 = userPosition['longitude'];
        const lon2 = scooterPosition['longitude'];

        const R = 6371; //Radius of earth


        const dLat = degrees2Radius(lat2 - lat1);
        const dLon = degrees2Radius(lon2 - lon1);

        const a =
             Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(degrees2Radius(lat1)) * Math.cos(degrees2Radius(lat2)) *
             Math.sin(dLon/2) * Math.sin(dLon/2)
             ;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const proximity = R * c;

        // Return distance in meters
        return proximity * 1000
    },

    checkIfValidScooter: async function checkIfValidScooter(scooterId: string, currentCity:object) {
        const getScooters = await scooterModel.getScooters(currentCity);
        const scooters = getScooters['cityScooters'];
    
        
        
        for (let i = 0; i < scooters.length; i++) {
            
            if (scooters[i]['_id'] === scooterId) {                
                return scooters[i];
            }
        }
            // console.log(scooter);
        return false;
    }

}

export default scooterModel;