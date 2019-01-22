import { newId } from './helper';
const axios = require('axios');
const refDataServicePath = 'http://metallica_refdata-service_1:3001';
let trades = [
    {
        id: '1',
        side: 'BUY',
        status: 'OPEN',
        price: 1000,
        quantity: 20,
        counterPartyId: 'PK',
        commodityId: 'AL',
        locationId: 'DEL',
        date: '01/01/2019'
    },
];

class TradeService {
    getTrades( {side, status}: { side?: string, status?: string }){
        return trades.filter(trade => trade.side === side || trade.side  && trade.status === status || trade.status);
    }
    getTradeById({ id }: { id: string }){
        return trades.find(trade => trade.id === id);
    }
    createTrade(tradeInput: any){
        const trade = Object.assign({}, tradeInput, {id: newId()});
        trades.push(trade);
        return trade;
    }
    updateTrade(id: any, tradeInput: any){
        let tradeToUpdate = trades.find(trade => trade.id === id);
        tradeToUpdate = Object.assign({}, tradeToUpdate);
        return tradeToUpdate;
    }
    deleteTrade(id: any){
        console.log(`deleteing trade with id ${id}`);
        trades.splice(trades.findIndex(trade => trade.id ===id), 1);
        console.log(trades);
        return true;
    }
    async getTradeCommodity({ id }: { id: string}) {
        try {
            const tradeInQuestion = trades.find(trade => trade.id === id);
            const response = await axios.get(`${refDataServicePath}/commodities/${tradeInQuestion.commodityId}`);
            return Promise.resolve(response.data);
        }
        catch(err) {
            console.log('----------- error', err);
        }
    }
    async getTradeCounterparty({ id }: { id: string}) {
        try {
            const tradeInQuestion = trades.find(trade => trade.id === id);
            const response = await axios.get(`${refDataServicePath}/parties/${tradeInQuestion.counterPartyId}`);
            return Promise.resolve(response.data);
        }
        catch(err) {
            console.log('----------- error', err);
        }
    }
    async getTradeLocation({ id }: { id: string}) {
        try {
            const tradeInQuestion = trades.find(trade => trade.id === id);
            const response = await axios.get(`${refDataServicePath}/locations/${tradeInQuestion.locationId}`);
            return Promise.resolve(response.data);
        }
        catch(err) {
            console.log('----------- error', err);
        }
    }
}

export const tradeService = new TradeService();
