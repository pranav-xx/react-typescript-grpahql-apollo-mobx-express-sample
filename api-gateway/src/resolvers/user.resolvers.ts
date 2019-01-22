const axios = require('axios');
const refDataServicePath = 'http://metallica_refdata-service_1:3001';

export default {
    Query: {
        async login(parent: any, {username, password}: {username: string, password: string}) {
            try {
                const response = await axios.post(`${refDataServicePath}/login`, {
                    username,
                    password
                });
                console.log(response);
                return response.data || null;
            }
            catch(err) {
                console.log('----- error' + err);
            }
        }
    }
}