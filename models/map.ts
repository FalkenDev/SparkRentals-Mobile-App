import { API_KEY } from '@env';
import config from '../config/config.json';
import storage from './storage';

const mapModel = {

    /**
     * Get all cities from API
     * @param API_KEY 
     * @returns Promise<Object>
     */
    getCities: async function getCities(API_KEY: string, token: string): Promise<Object> {       
        const token2 = await storage.readToken();
        
        
        const response = await fetch(`${config.base_url}cities?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'x-access-token': token2['token']
            }
        });
        
        const result = await response.json();

        console.log(token);
        
        
        return result;
    },

    /**
     * Get closest city based on users location
     * @param API_KEY 
     * @param userData 
     * @returns Promise<object>
     */
    getClosestCity: async function getClosestCity(API_KEY: string, userData: object, token: string): Promise<Object> {
        const cities = await mapModel.getCities(API_KEY, token);
        // for (const city of Object.entries(cities['cities'])) {
        //     console.log(city[1]['zones'][0]);
        // };
        // const currentCity = {
        //     'name':
        // }
        
        return cities['cities'][1];
    },

    /**
     * Get zones for a given city
     * @param city 
     * @returns string
     */
    getZones: function getZones(city: object): string[] {
        
        // All zones in current city
        const zones = city['zones'];
        
        // Zone colors based on zoneType
        const zoneColors = {
            parkingZone: 'rgba(0, 194, 0, 0.3)',
            noParkingZone: 'rgba(255, 0, 0, 0.3)',
            bonusParkingZone: 'rgba(245, 40, 145, 0.3)',
            chargingZone: 'rgba(255, 255, 5, 0.3)'
        };

        // Array to be returned containing all zones and data
        const zoneMarkers = [];
        
        // Loop through all zones and append them to return object
        for (let i = 0; i < zones.length; i++) {
            const coordinates = city['zones'][i]['coordinates'];
            
            // console.log(city['zones'][i]['zoneType']);
            
            
            const zone = {
                _id: city['zones'][i]['_id'],
                zoneType: city['zones'][i]['zoneType'],
                zoneColor: zoneColors[city['zones'][i]['zoneType']],
                coordinates: []
            };
            for (const LatLng of coordinates) {
                zone['coordinates'].push({latitude: LatLng[1], longitude: LatLng[0]})
            };
            
            zoneMarkers.push(zone);
        }        
        
        return zoneMarkers;
    }
};

export default mapModel;