import { API_KEY } from '@env';
import config from '../config/config.json';

const mapModel = {

    getCities: async function getCities(API_KEY: string): Promise<Object> {        
        const response = await fetch(`${config.base_url}cities?api_key=${API_KEY}`);
        
        const result = await response.json();        

        return result;
    },

    getClosestCity: async function getClosestCity(API_KEY: string, userData: object): Promise<Object> {
        const cities = await mapModel.getCities(API_KEY);
        
        // for (const city of Object.entries(cities['cities'])) {
        //     console.log(city[1]['zones'][0]);
        // };
        // const currentCity = {
        //     'name':
        // }
        return cities['cities'][1];
    },

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
    },

    getScooters: async function getScooters(API_KEY: string, city: object): Promise<object> {
        const cityName = city['name'];
        const response = await fetch(`${config.base_url}scooters/owner/${cityName}?api_key=${API_KEY}`);
        const result = await response.json();
        
        return result;
    },

};

export default mapModel;