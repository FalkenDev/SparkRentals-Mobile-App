import { API_KEY } from '@env';
import config from '../config/config.json';
import storage from './storage';

const mapModel = {

    /**
     * Get all cities from API
     * @param API_KEY 
     * @returns Promise<Object>
     */
    getCities: async function getCities(API_KEY: string): Promise<Object> {       
        const token = await storage.readToken();        
        
        const response = await fetch(`${config.base_url}cities?api_key=${API_KEY}`, {
            method: 'GET',
            headers: {
                'x-access-token': token['token']
            }
        });
        
        const result = await response.json();

        
        
        return result;
    },

    /**
     * Get closest city based on users location
     * @param API_KEY 
     * @param userData 
     * @returns Promise<object>
     */
    getClosestCity: async function getClosestCity(userData: object): Promise<Object> {
        const cities = await mapModel.getCities(API_KEY);
        
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
            parkingZone: '#96FF7166',
            noParkingZone: '#FF606066',
            bonusParkingZone: '#C64EFF66',
            chargingZone: '#638FFF66'
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

    calcDistance: function calcDistance(lat1, lon1, lat2, lon2) {
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }

        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return Math.round(d);
    }
};

export default mapModel;