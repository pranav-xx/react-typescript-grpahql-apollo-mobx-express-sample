const axios = require('axios');
import { pubsub } from '../pubsub';

const tradeServicePath = 'http://metallica_trade-service_1:3003';
const TRADE_MUTATED = 'tradeMutated';

export default {
    Query: {
        async trades(parent: any, args: any) {
            try {
                const response = await axios.get(`${tradeServicePath}/trades?side=${args.side}&status=${args.status}`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        },
        async trade(parent: any, args: any) {
            try {
                const response = await axios.get(`${tradeServicePath}/trades/${args.id}`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        }
    },
    Mutation: {
        createTrade(parent: any, { trade }: { trade: any}) {
            return axios.post(`${tradeServicePath}/trades`, { trade })
                .then((trade: any) => {
                    pubsub.publish(TRADE_MUTATED, {
                        tradeMutated: {
                            mutation: 'CREATED',
                            node: trade
                        }
                    });
                    return trade;
                });
        },
        updateTrade(parent: any, {id, trade}: {id: string, trade: any}) {
            return axios.put(`${tradeServicePath}/trades/${id}`, { trade })
                .then((trade: any) => {
                    pubsub.publish(TRADE_MUTATED, {
                        tradeMutated: {
                            mutation: 'UPDATED',
                            node: trade
                        }
                    })
                })
        },
        deleteTrade(parent: any, { id }: { id: string}) {
            return axios.delete(`${tradeServicePath}/trades/${id}`)
                .then(() => {
                    pubsub.publish(TRADE_MUTATED, {
                        tradeMutated: {
                            mutation: 'DELETED'
                        }
                    })
                })
        }
    },
    Subscription: {
        tradeMutated: {
            subscribe: () => pubsub.asyncIterator(TRADE_MUTATED)
        }
    },
    Trade: {
        async commodity(parent: any) {
            try {
                const response = await axios.get(`${tradeServicePath}/trades/${parent.id}/commodities`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        },
        async counterParty(parent: any) {
            try {
                const response = await axios.get(`${tradeServicePath}/trades/${parent.id}/parties`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        },
        async location(parent: any) {
            try {
                const response = await axios.get(`${tradeServicePath}/trades/${parent.id}/locations`);
                return Promise.resolve(response.data);
            }
            catch(err) {
                console.log('----------- error', err);
            }
        }
    }
};
