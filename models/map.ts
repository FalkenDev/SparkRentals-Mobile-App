import config from '../config/config.json';

const mapModel = {

    getCities: async function getCities(API_KEY: string): Promise<Object> {        
        const response = await fetch(`${config.base_url}cities?api_key=234c561f80fb76cea4894ae4baebe5b0`);
        
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

    getZones: function getZones(city: object) {
        
        // All zones in current city
        const zones = city['zones'];
        
        // Zone colors based on zoneType
        const zoneColors = {
            parkingZone: '#228B22',
            noParkingZone: '#8B0000',
            bonusParkingZone: '#8A2BE2'

        };

        // Object to be returned containing all zones and data
        const zoneMarkers = [];
        
        // Loop through all zones and append them to return object
        for (let i = 0; i < zones.length; i++) {
            const coordinates = city['zones'][i]['coordinates'];
            
            console.log(city['zones'][i]['_id']);
            
            
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