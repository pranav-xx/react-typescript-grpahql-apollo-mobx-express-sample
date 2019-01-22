import { tradeService } from './trade.service';
import { getRouteAPIAdapter } from './helper';

export const routes = (server: any) => {
    server.get('/trades', getRouteAPIAdapter.bind(this, tradeService.getTrades));
    server.get('/trades/:id', getRouteAPIAdapter.bind(this, tradeService.getTradeById));
    server.post('/trades', (req: any, res: any) => {
        const trade = tradeService.createTrade(req.params.tadeInput);
        res.status = 200;
        res.json(trade);
    });
    server.put('/trades/:id', (req: any, res: any) => {
        const trade = tradeService.updateTrade(req.params.id, req.params.trade);
        res.status = 200;
        res.json(trade);
    });
    server.delete('/trades/:id', (req: any, res: any) => {
        tradeService.deleteTrade(req.params.id);
        res.status = 200;
        res.send();
    });
    server.get('/trades/:id/commodities', getRouteAPIAdapter.bind(this, tradeService.getTradeCommodity));
    server.get('/trades/:id/parties', getRouteAPIAdapter.bind(this, tradeService.getTradeCounterparty));
    server.get('/trades/:id/locations', getRouteAPIAdapter.bind(this, tradeService.getTradeLocation));
};
