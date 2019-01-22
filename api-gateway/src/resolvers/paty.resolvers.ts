const axios = require('axios');
const refDataServicePath = 'http://metallica_refdata-service_1:3001';

export default {
    Query: {
        async parties() {
            try {
                const response = await axios.get(`${refDataServicePath}/parties`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        },
        async party(parent: any, args: any) {
            try {
                const response = await axios.get(`${refDataServicePath}/parties/${args.id}`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        }
    }
};