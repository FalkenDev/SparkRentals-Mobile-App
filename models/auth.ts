import { Float } from "react-native/Libraries/Types/CodegenTypes";
import config from "../config/config.json";
import * as EmailValidator from 'email-validator';
import { API_KEY } from "@env";

const authModel = {
    register: async function register(user: object): Promise<Object> {
        user['api_key'] = API_KEY;
        
        const response = await fetch(`${config.base_url}users`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();                
        return result;        
    },

    login: async function login(user: object): Promise<Object> {
        user['api_key'] = API_KEY;
        
        
        const response = await fetch(`${config.base_url}auth/login/server/user`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();
        
        return result;
    },

    checkEmail: function checkEmail(email: string): Boolean {
        return EmailValidator.validate(email);
    },

    test: function test() {
        console.log(
         'authmodel'
        );
    }
};

export default authModel;
