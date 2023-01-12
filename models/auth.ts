import { Float } from "react-native/Libraries/Types/CodegenTypes";
import config from "../config/config.json";
import * as EmailValidator from 'email-validator';
import { API_KEY } from "@env";
import storage from './storage';

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
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }

        return {
            title: "Login",
            message: result.data.message,
            type: "success",
        };    
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
        
        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger",
            };
        }
                
        //Store userdata
        const userData = result['data']['user'];        
        
        await storage.storeUser(userData);


        //Store token
        const token = result['data']['token'];
        console.log(token);
        
        await storage.storeToken(token);

        return {
            title: "Login",
            message: result.data.message,
            type: "success",
        };
    },

    checkEmail: function checkEmail(email: string): Boolean {
        return EmailValidator.validate(email);
    },

    test: function test() {
        console.log(
         'authmodel'
        );
    },

    logout: async function logout(): Promise<void> {
        await storage.deleteToken();
    },
};

export default authModel;
