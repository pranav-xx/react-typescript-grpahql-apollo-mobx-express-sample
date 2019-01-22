import { refDataService } from './refdata.service';
import { getRouteAPIAdapter } from './helper';

export const routes = (server: any) => {
    server.get('/commodities', getRouteAPIAdapter.bind(this, refDataService.getAllCommodities));
    server.get('/commodities/:id', getRouteAPIAdapter.bind(this, refDataService.getCommodityById));

    server.get('/locations', getRouteAPIAdapter.bind(this, refDataService.getAllLocations));
    server.get('/locations/:id', getRouteAPIAdapter.bind(this, refDataService.getLocationById));

    server.get('/parties', getRouteAPIAdapter.bind(this, refDataService.getAllParties));
    server.get('/parties/:id', getRouteAPIAdapter.bind(this, refDataService.getPartyById));
    server.post('/login', (req: any, res: any) => {
        console.log(req.body);
        const user = refDataService.login(req.body);
        res.status = 200;
        res.json(user);
    });
};
