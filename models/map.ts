import config from '../config/config.json';

const mapModel = {

    getCities: async function getCities(API_KEY): Promise<Object> {
        console.log(API_KEY);
        
        const response = await fetch(`${config.base_url}cities?api_key=234c561f80fb76cea4894ae4baebe5b0`);
        
        const result = await response.json();        

        return result;
    },
};

export default mapModel;