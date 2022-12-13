import { Float } from "react-native/Libraries/Types/CodegenTypes";
import config from "../config/config.json";
import * as EmailValidator from 'email-validator';
import { API_KEY } from "@env";

const authModel = {
    register: async function(user: object) {
        const userName = user['name'].split('');
        const firstName = userName[0];
        const lastName = userName[1];
        const email = user['email'];
        const phonenumber = user['phonenumber'];
        
    },
    test: function test() {
        console.log(
         'authmodel'
        );
    }
};

export default authModel;
