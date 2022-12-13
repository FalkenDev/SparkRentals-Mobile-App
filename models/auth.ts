import { Float } from "react-native/Libraries/Types/CodegenTypes";
import config from "../config/config.json";

const authModel = {
    register: async function(firstName: string, lastName: string, phoneNumber: string, email: string, password: string, balance: Float, api_key: string) {

    },
    test: function test() {
        console.log(
         'authmodel'
        );
    }
};

export default authModel;
