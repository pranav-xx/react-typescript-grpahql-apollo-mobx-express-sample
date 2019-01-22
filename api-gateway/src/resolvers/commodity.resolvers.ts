const axios = require('axios');
const refDataServicePath = 'http://metallica_refdata-service_1:3001';

export default {
    Query: {
        async commodities() {
            try {
                const response = await axios.get(`${refDataServicePath}/commodities`, { withCredentials: true });
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        },
        async commodity(parent: any, args: any) {
            try {
                const response = await axios.get(`${refDataServicePath}/commodities/${args.id}`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        }
    }
};
