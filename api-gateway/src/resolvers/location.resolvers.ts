const axios = require('axios');
const refDataServicePath = 'http://metallica_refdata-service_1:3001';

export default {
    Query: {
        async locations() {
            try {
                const response = await axios.get(`${refDataServicePath}/locations`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        },
        async location(parent: any, args: any) {
            try {
                const response = await axios.get(`${refDataServicePath}/locations/${args.id}`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        }
    }
}