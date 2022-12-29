import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function storeToken(token: string): Promise<void> {        
        try {
            const tokenAndDate = {
                token: token,
                date: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            // save error
        }
    },

    readToken: async function readToken(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            //reading error value
        }
    },

    deleteToken: async function deleteToken(): Promise<void> {
        await AsyncStorage.removeItem('@token');
    },

    storeUser: async function storeUser(userData: object): Promise<void> {        
        try {
            const user = {
                userData: userData
            };
            const jsonValue = JSON.stringify(user);

            await AsyncStorage.setItem('@user', jsonValue);
        } catch (e) {
            // save error
        }
    },

    readUser: async function readUser(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@user');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            //reading error value
        }
    },

    deleteUser: async function deleteUser(): Promise<void> {
        await AsyncStorage.removeItem('@user');
    },
}

export default storage;