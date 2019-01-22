import { observable } from "mobx";

type TradeSide = 'BUY' | 'SELL';
type TradeStatus = 'OPEN' | 'NOMINATED';

export class Trade {
    @observable id: string;
    @observable side: TradeSide;
    @observable status: TradeStatus;
    @observable price: number;
    @observable quantity: number;
    @observable counterPartyId: string;
    @observable counterPartyName: string
    @observable commodityId: string;
    @observable locationId: string;
    @observable date?: string;
    constructor(
        id: string = '',
        side: TradeSide = 'BUY',
        status: TradeStatus = 'OPEN',
        price: number = 0,
        quantity: number = 0,
        counterPartyId: string,
        counterPartyName: string,
        commodityId: string,
        locationId: string,
        date: string
    ) {
        this.id = id;
        this.side = side;
        this.status = status;
        this.price = price;
        this.quantity = quantity;
        this.counterPartyId = counterPartyId;
        this.counterPartyName = counterPartyName;
        this.commodityId = commodityId;
        this.locationId = locationId;
        this.date = date;
    }
}
